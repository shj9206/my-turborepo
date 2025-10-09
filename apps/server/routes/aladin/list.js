const express = require("express");
const router = express.Router();
const { buildQueryString } = require("@repo/util");

const aladinListUrl = "http://www.aladin.co.kr/ttb/api/ItemList.aspx";
const aladinListUrlWithKey = `${aladinListUrl}?ttbkey=${process.env.ALADIN_TTB_KEY}`;
/**
 * @swagger
 * /list:
 *   get:
 *     summary: 알라딘 도서 상품 리스트
 *     description: 알라딘 API를 통해 도서 상품 리스트를 조회합니다
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: QueryType
 *         schema:
 *           type: string
 *           default: ItemNewAll
 *         description: |
 *           리스트 조회 타입
 *           - ItemNewAll: 신간 전체 리스트
 *           - ItemNewSpecial: 주목할 만한 신간 리스트
 *           - ItemEditorChoice: 편집자 추천 리스트
 *           - Bestseller: 베스트셀러
 *           - BlogBest: 블로거 베스트셀러
 *     responses:
 *       200:
 *         description: 도서 상품 리스트 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 *                 title:
 *                   type: string
 *                 link:
 *                   type: string
 *                 pubDate:
 *                   type: string
 *                 totalResults:
 *                   type: number
 *                 startIndex:
 *                   type: number
 *                 itemsPerPage:
 *                   type: number
 *                 query:
 *                   type: string
 *                 searchCategoryId:
 *                   type: string
 *                 searchCategoryName:
 *                   type: string
 *                 item:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string


 
 */

router.get("/", async (req, res) => {
  try {
    const {
      QueryType = "ItemNewAll",
      MaxResults = 10,
      start = 1,
      SearchTarget = "Book",
      output = "JS",
      Version = "20131101",
    } = req.query;

    // 파라미터 유효성 검증
    const maxResultsNum = parseInt(MaxResults, 10);
    const startNum = parseInt(start, 10);

    if (isNaN(maxResultsNum) || maxResultsNum < 1 || maxResultsNum > 100) {
      return res.status(400).json({
        error: "잘못된 요청",
        message: "MaxResults는 1-100 사이의 숫자여야 합니다.",
      });
    }

    if (isNaN(startNum) || startNum < 1) {
      return res.status(400).json({
        error: "잘못된 요청",
        message: "start는 1 이상의 숫자여야 합니다.",
      });
    }

    // API 호출 (타임아웃 설정)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

    const response = await fetch(
      `${aladinListUrlWithKey}&${buildQueryString({
        QueryType,
        MaxResults: maxResultsNum,
        start: startNum,
        SearchTarget,
        output,
        Version,
      })}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

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
    console.error("알라딘 리스트 API 호출 중 오류 발생:", error);

    // 타임아웃 에러
    if (error.name === "AbortError") {
      return res.status(504).json({
        error: "타임아웃",
        message: "알라딘 API 응답 시간이 초과되었습니다.",
      });
    }

    // JSON 파싱 에러
    if (error instanceof SyntaxError) {
      return res.status(502).json({
        error: "잘못된 응답",
        message: "알라딘 API 응답 형식이 올바르지 않습니다.",
      });
    }

    // 기타 에러
    res.status(500).json({
      error: "서버 오류",
      message: "도서 리스트 조회 중 오류가 발생했습니다.",
    });
  }
});

module.exports = router;
