const mongoose = require("mongoose");

// 관심상품 스키마
const FavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: String, // 알라딘 상품 ID isbn13 형식
      required: true,
    },
    title: {
      type: String, // 상품 제목 (조회 편의성)
    },
    cover: {
      type: String, // 상품 이미지 URL
    },
    author: {
      type: String, // 저자
    },
    priceStandard: {
      type: Number, // 가격
    },
    priceSales: {
      type: Number, // 판매가격
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

// 같은 사용자가 같은 상품을 중복으로 등록하지 못하도록 복합 인덱스 설정
FavoriteSchema.index({ userId: 1, itemId: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
