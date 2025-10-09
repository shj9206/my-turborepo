const jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT 토큰 생성 함수
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || process.env.SECRET,
    {
      expiresIn: "7d", // 7일 유효
    }
  );
};

// JWT 토큰 검증 미들웨어
const verifyToken = async (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "인증 토큰이 필요합니다",
      });
    }

    const token = authHeader.split(" ")[1];

    // 토큰 검증
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || process.env.SECRET
    );

    // 사용자 정보 조회
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "유효하지 않은 토큰입니다",
      });
    }

    // req.user에 사용자 정보 저장
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "토큰이 만료되었습니다",
      });
    }
    return res.status(401).json({
      success: false,
      error: "유효하지 않은 토큰입니다",
    });
  }
};

// 선택적 인증 미들웨어 (토큰이 없어도 진행)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || process.env.SECRET
      );
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    // 토큰이 유효하지 않아도 계속 진행
    next();
  }
};

module.exports = {
  generateToken,
  verifyToken,
  optionalAuth,
};
