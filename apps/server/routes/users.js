const express = require("express");
const User = require("../models/User");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { generateToken, verifyToken } = require("../middleware/auth");
const router = express.Router();

/* Multer setup */
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

/* Cloudinary setup */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ===================
   인증 관련 API
   =================== */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 사용자를 등록합니다
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstname
 *               - lastname
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 사용자명
 *               firstname:
 *                 type: string
 *                 description: 이름
 *               lastname:
 *                 type: string
 *                 description: 성
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 비밀번호
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 프로필 이미지 (선택)
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 회원가입이 완료되었습니다
 *                 token:
 *                   type: string
 *                   description: JWT 토큰
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { username, firstname, lastname, password } = req.body;

    if (!username || !firstname || !lastname || !password) {
      return res.status(400).json({
        success: false,
        error: "모든 필드를 입력해주세요",
      });
    }

    // 사용자명 중복 체크
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "이미 존재하는 사용자명입니다",
      });
    }

    let newUser = new User({
      username,
      firstName: firstname,
      lastName: lastname,
    });

    // 프로필 이미지 처리
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      newUser.profile = result.secure_url;
    } else {
      newUser.profile =
        process.env.DEFAULT_PROFILE_PIC || "https://via.placeholder.com/150";
    }

    // passport-local-mongoose의 register 메서드 사용
    const registeredUser = await User.register(newUser, password);

    // JWT 토큰 생성
    const token = generateToken(registeredUser._id);

    res.status(201).json({
      success: true,
      message: "회원가입이 완료되었습니다",
      token,
      user: {
        id: registeredUser._id,
        username: registeredUser.username,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        profile: registeredUser.profile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || "회원가입 중 오류가 발생했습니다",
    });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 로그인
 *     description: 사용자 인증 및 토큰 발급
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *                 token:
 *                   type: string
 *                   description: JWT 토큰
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "사용자명과 비밀번호를 입력해주세요",
      });
    }

    // 사용자 찾기
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "사용자명 또는 비밀번호가 잘못되었습니다",
      });
    }

    // passport-local-mongoose의 authenticate 메서드 사용
    user.authenticate(password, (err, authenticatedUser, passwordErr) => {
      if (err || passwordErr || !authenticatedUser) {
        return res.status(401).json({
          success: false,
          error: "사용자명 또는 비밀번호가 잘못되었습니다",
        });
      }

      // JWT 토큰 생성
      const token = generateToken(authenticatedUser._id);

      res.json({
        success: true,
        message: "로그인 성공",
        token,
        user: {
          id: authenticatedUser._id,
          username: authenticatedUser.username,
          firstName: authenticatedUser.firstName,
          lastName: authenticatedUser.lastName,
          profile: authenticatedUser.profile,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "로그인 중 오류가 발생했습니다",
    });
  }
});

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: 내 정보 조회
 *     description: 현재 로그인한 사용자의 정보를 조회합니다
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("friends", "username firstName lastName profile")
      .populate("friendRequests", "username firstName lastName profile")
      .populate("posts");

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profile: user.profile,
        friends: user.friends,
        friendRequests: user.friendRequests,
        posts: user.posts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "사용자 정보를 불러오는 중 오류가 발생했습니다",
    });
  }
});

/* ===================
   사용자 관련 API
   =================== */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 모든 사용자 조회
 *     description: 등록된 모든 사용자 목록을 조회합니다
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}).select(
      "username firstName lastName profile"
    );

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "사용자 목록을 불러오는 중 오류가 발생했습니다",
    });
  }
});

// GET /api/users/:id/profile - 특정 사용자 프로필 조회
router.get("/:id/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("friends", "username firstName lastName profile")
      .populate("friendRequests", "username firstName lastName profile")
      .populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profile: user.profile,
        friends: user.friends,
        friendRequests: user.friendRequests,
        posts: user.posts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "사용자 정보를 불러오는 중 오류가 발생했습니다",
    });
  }
});

/* ===================
   친구 관련 API
   =================== */

/**
 * @swagger
 * /users/{id}/friend-request:
 *   post:
 *     summary: 친구 요청 보내기
 *     description: 특정 사용자에게 친구 요청을 보냅니다
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 친구 요청을 보낼 사용자 ID
 *     responses:
 *       200:
 *         description: 친구 요청 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/:id/friend-request", verifyToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다",
      });
    }

    // 이미 친구 요청을 보냈는지 확인
    if (targetUser.friendRequests.find((o) => o._id.equals(currentUser._id))) {
      return res.status(400).json({
        success: false,
        error: "이미 친구 요청을 보냈습니다",
      });
    }

    // 이미 친구인지 확인
    if (targetUser.friends.find((o) => o._id.equals(currentUser._id))) {
      return res.status(400).json({
        success: false,
        error: "이미 친구입니다",
      });
    }

    // 친구 요청 추가
    const currUser = {
      _id: currentUser._id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    };
    targetUser.friendRequests.push(currUser);
    await targetUser.save();

    res.json({
      success: true,
      message: `${targetUser.firstName}님에게 친구 요청을 보냈습니다`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "친구 요청 중 오류가 발생했습니다",
    });
  }
});

/**
 * @swagger
 * /users/{id}/accept-friend:
 *   put:
 *     summary: 친구 요청 수락
 *     description: 받은 친구 요청을 수락합니다
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 친구 요청을 보낸 사용자 ID
 *     responses:
 *       200:
 *         description: 친구 요청 수락 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id/accept-friend", verifyToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const requestUser = await User.findById(req.params.id);

    if (!requestUser) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다",
      });
    }

    // 친구 요청이 있는지 확인
    const friendRequest = currentUser.friendRequests.find((o) =>
      o._id.equals(req.params.id)
    );

    if (!friendRequest) {
      return res.status(400).json({
        success: false,
        error: "친구 요청이 존재하지 않습니다",
      });
    }

    // 친구 요청 제거
    const index = currentUser.friendRequests.indexOf(friendRequest);
    currentUser.friendRequests.splice(index, 1);

    // 서로 친구로 추가
    const friend = {
      _id: requestUser._id,
      firstName: requestUser.firstName,
      lastName: requestUser.lastName,
    };
    currentUser.friends.push(friend);
    await currentUser.save();

    const currUser = {
      _id: currentUser._id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    };
    requestUser.friends.push(currUser);
    await requestUser.save();

    res.json({
      success: true,
      message: `${requestUser.firstName}님과 친구가 되었습니다!`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "친구 수락 중 오류가 발생했습니다",
    });
  }
});

// DELETE /api/users/:id/decline-friend - 친구 요청 거절
router.delete("/:id/decline-friend", verifyToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const requestUser = await User.findById(req.params.id);

    if (!requestUser) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다",
      });
    }

    // 친구 요청 찾기
    const friendRequest = currentUser.friendRequests.find((o) =>
      o._id.equals(requestUser._id)
    );

    if (friendRequest) {
      const index = currentUser.friendRequests.indexOf(friendRequest);
      currentUser.friendRequests.splice(index, 1);
      await currentUser.save();

      res.json({
        success: true,
        message: "친구 요청을 거절했습니다",
      });
    } else {
      res.status(400).json({
        success: false,
        error: "친구 요청이 존재하지 않습니다",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "친구 요청 거절 중 오류가 발생했습니다",
    });
  }
});

module.exports = router;
