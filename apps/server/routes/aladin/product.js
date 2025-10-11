//todo 알라딘 도서 상품 상세 조회
const express = require("express");
const router = express.Router();
const { buildQueryString } = require("@repo/util");

const aladinProductUrl = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx";

const aladinProductUrlWithKey = `${aladinProductUrl}?ttbkey=${process.env.ALADIN_TTB_KEY}`;

/**
     * @swagger
     * /search:
 *   get:
 *     summary: 알라딘 도서 상품 검색
 *     description: 알라딘 API를 통해 도서 상품 검색을 조회합니다
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: ItemId
 *         schema:
 *           type: string
 *           default: ""
 *         description: |
 *           도서 상품 ID
 *       - in: query
 *         name: ItemIdType
 *         schema:
 *           type: string
 *           default: "ISBN13"
 *         description: |
 *           도서 상품 ID 타입
 *           - ISBN13: ISBN13
 *           - ISBN: ISBN

 *     responses:
 *       200:
 *         description: 도서 상품 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object

 */
router.get("/:ItemId", async (req, res) => {
  try {
    const {
      itemIdType = "ISBN13",
      Cover = "Mid",
      Version = "20131101",
      output = "JS",
    } = req.query;

    const ItemId = req.params.ItemId;

    // 파라미터 유효성 검증
    if (!ItemId) {
      return res.status(400).json({
        error: "잘못된 요청",
        message: "ItemId는 필수 입력 값입니다.",
      });
    }
    const response = await fetch(
      `${aladinProductUrlWithKey}&${buildQueryString({
        ItemId,
        itemIdType,
        Cover,
        Version,
        output,
      })}`
    );
    // HTTP 응답 상태 체크
    if (!response.ok) {
      console.error(
        `알라딘 API 에러: ${response.status} ${response.statusText}`
      );
      return res.status(response.status).json({
        error: "외부 API 에러",
        message: "알라딘 API 호출에 실패했습니다.",
      });
    }
    const data = await response.json();
    // 응답 데이터 검증
    if (!data) {
      return res.status(500).json({
        error: "데이터 없음",
        message: "알라딘 API로부터 데이터를 받지 못했습니다.",
      });
    }
    res.json(data);
  } catch (error) {
    console.error("알라딘 도서 상품 상세 조회 API 호출 중 오류 발생:", error);

    res.status(500).json({
      error: "서버 오류",
      message: "도서 상품 상세 조회 중 오류가 발생했습니다.",
    });
  }
});

module.exports = router;
