const express = require("express");
const router = express.Router();
const Favorite = require("../../models/Favorite");
const { verifyToken } = require("../../middleware/auth");
/**
 * @swagger
 * /favorit:
 *   post:
 *     summary: 관심상품 등록/삭제 (토글)
 *     description: 알라딘 도서 상품을 관심상품 리스트에 추가하거나, 이미 등록된 경우 삭제합니다
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - itemId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 ID (MongoDB ObjectId)
 *               itemId:
 *                 type: string
 *                 description: 알라딘 상품 ID (ISBN13 등)
 *               title:
 *                 type: string
 *                 description: 상품 제목
 *               cover:
 *                 type: string
 *                 description: 상품 이미지 URL
 *               author:
 *                 type: string
 *                 description: 저자
 *               priceStandard:
 *                 type: number
 *                 description: 가격
 *               priceSales:
 *                 type: number
 *                 description: 판매가격
 *     responses:
 *       200:
 *         description: 관심상품 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 관심상품이 삭제되었습니다.
 *                 action:
 *                   type: string
 *                   example: deleted
 *       201:
 *         description: 관심상품 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 관심상품이 등록되었습니다.
 *                 action:
 *                   type: string
 *                   example: added
 *                 favorite:
 *                   type: object
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { userId, itemId, title, cover, author, priceStandard, priceSales } =
      req.body;

    // 필수 필드 검증
    if (!userId || !itemId) {
      return res.status(400).json({
        error: "잘못된 요청",
        message: "userId와 itemId는 필수 입력 값입니다.",
      });
    }

    // 이미 등록된 관심상품인지 확인
    const existingFavorite = await Favorite.findOne({ userId, itemId });

    // 이미 등록되어 있으면 삭제
    if (existingFavorite) {
      await Favorite.deleteOne({ userId, itemId });

      return res.status(200).json({
        message: "관심상품이 삭제되었습니다.",
        action: "deleted",
        itemId: itemId,
      });
    }

    // 등록되어 있지 않으면 새로 등록
    const newFavorite = new Favorite({
      userId,
      itemId,
      title,
      cover,
      author,
      priceStandard,
      priceSales,
    });

    // 데이터베이스에 저장
    const savedFavorite = await newFavorite.save();

    res.status(201).json({
      message: "관심상품이 등록되었습니다.",
      action: "added",
      favorite: savedFavorite,
    });
  } catch (error) {
    console.error("관심상품 처리 중 오류 발생:", error);

    res.status(500).json({
      error: "서버 오류",
      message: "관심상품 처리 중 오류가 발생했습니다.",
    });
  }
});

/**
 * @swagger
 * /favorit/{userId}:
 *   get:
 *     summary: 사용자 관심상품 목록 조회
 *     description: 특정 사용자의 관심상품 목록을 조회합니다 (페이지네이션 지원)
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID (MongoDB ObjectId)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *           default: newest
 *         description: 정렬 순서 (newest=최신순, oldest=오래된순)
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 관심상품 목록을 조회했습니다.
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.get("/:userId",verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, sort = "newest" } = req.query;

    // 필수 필드 검증
    if (!userId) {
      return res.status(400).json({
        error: "잘못된 요청",
        message: "userId는 필수 입력 값입니다.",
      });
    }

    // 페이지네이션 계산
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // 정렬 옵션
    const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    // 전체 개수 조회
    const total = await Favorite.countDocuments({ userId });

    // 관심상품 조회
    const favorites = await Favorite.find({ userId })
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean(); // 성능 최적화를 위해 lean() 사용

    // 총 페이지 수 계산
    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      message: "관심상품 목록을 조회했습니다.",
      favorites,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
      },
    });
  } catch (error) {
    console.error("관심상품 목록 조회 중 오류 발생:", error);

    res.status(500).json({
      error: "서버 오류",
      message: "관심상품 목록 조회 중 오류가 발생했습니다.",
    });
  }
});

/**
 * @swagger
 * /favorit/{userId}/{itemId}:
 *   get:
 *     summary: 특정 상품 관심상품 등록 여부 확인
 *     description: 특정 상품이 사용자의 관심상품에 등록되어 있는지 확인합니다
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID (MongoDB ObjectId)
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: 알라딘 상품 ID (ISBN13 등)
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isFavorite:
 *                   type: boolean
 *                   example: true
 *                 favorite:
 *                   type: object
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.get("/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    // 필수 필드 검증
    if (!userId || !itemId) {
      return res.status(400).json({
        error: "잘못된 요청",
        message: "userId와 itemId는 필수 입력 값입니다.",
      });
    }

    // 관심상품 조회
    const favorite = await Favorite.findOne({ userId, itemId }).lean();

    res.status(200).json({
      isFavorite: !!favorite,
      favorite: favorite || null,
    });
  } catch (error) {
    console.error("관심상품 확인 중 오류 발생:", error);

    res.status(500).json({
      error: "서버 오류",
      message: "관심상품 확인 중 오류가 발생했습니다.",
    });
  }
});

module.exports = router;
