const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Multer setup
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
   게시물 CRUD API
   =================== */

// GET /api/posts - 피드 조회 (본인 + 친구들의 게시물)
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "friends",
        populate: {
          path: "posts",
          model: "Post",
          populate: {
            path: "creator",
            select: "username firstName lastName profile",
          },
        },
      })
      .populate({
        path: "posts",
        populate: {
          path: "creator",
          select: "username firstName lastName profile",
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다",
      });
    }

    // 친구들의 게시물 수집
    let posts = [];
    for (let i = 0; i < user.friends.length; i++) {
      if (user.friends[i].posts) {
        for (let j = 0; j < user.friends[i].posts.length; j++) {
          posts.push(user.friends[i].posts[j]);
        }
      }
    }

    // 본인의 게시물 추가
    for (let i = 0; i < user.posts.length; i++) {
      posts.push(user.posts[i]);
    }

    // 최신순 정렬
    posts.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "게시물을 불러오는 중 오류가 발생했습니다",
    });
  }
});

// GET /api/posts/:id - 특정 게시물 조회
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "username firstName lastName profile")
      .populate({
        path: "comments",
        populate: {
          path: "creator._id",
          select: "username firstName lastName profile",
        },
      });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "게시물을 찾을 수 없습니다",
      });
    }

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "게시물을 불러오는 중 오류가 발생했습니다",
    });
  }
});

// POST /api/posts - 게시물 생성
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: "게시물 내용을 입력해주세요",
      });
    }

    let newPost = {
      creator: req.user._id,
      time: new Date(),
      likes: 0,
      content,
    };

    // 이미지가 있으면 클라우디너리에 업로드
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      newPost.image = result.secure_url;
    } else {
      newPost.image = null;
    }

    // 게시물 생성
    const post = await Post.create(newPost);

    // 사용자의 posts 배열에 추가
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    // 생성된 게시물을 populate하여 반환
    const populatedPost = await Post.findById(post._id).populate(
      "creator",
      "username firstName lastName profile"
    );

    res.status(201).json({
      success: true,
      message: "게시물이 작성되었습니다",
      post: populatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "게시물 작성 중 오류가 발생했습니다",
    });
  }
});

// DELETE /api/posts/:id - 게시물 삭제
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "게시물을 찾을 수 없습니다",
      });
    }

    // 본인의 게시물인지 확인
    if (!post.creator.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        error: "본인의 게시물만 삭제할 수 있습니다",
      });
    }

    // 게시물 삭제
    await Post.findByIdAndDelete(req.params.id);

    // 사용자의 posts 배열에서 제거
    const user = await User.findById(req.user._id);
    user.posts = user.posts.filter((p) => !p.equals(req.params.id));
    await user.save();

    res.json({
      success: true,
      message: "게시물이 삭제되었습니다",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "게시물 삭제 중 오류가 발생했습니다",
    });
  }
});

/* ===================
   좋아요 API
   =================== */

// POST /api/posts/:id/like - 게시물 좋아요
router.post("/:id/like", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "게시물을 찾을 수 없습니다",
      });
    }

    // 이미 좋아요 했는지 확인
    const alreadyLiked = user.liked_posts.some((p) => p.equals(post._id));
    if (alreadyLiked) {
      return res.status(400).json({
        success: false,
        error: "이미 좋아요한 게시물입니다",
      });
    }

    // 좋아요 추가
    post.likes = post.likes + 1;
    await post.save();

    user.liked_posts.push(post._id);
    await user.save();

    res.json({
      success: true,
      message: "좋아요를 눌렀습니다",
      likes: post.likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "좋아요 중 오류가 발생했습니다",
    });
  }
});

// DELETE /api/posts/:id/like - 게시물 좋아요 취소
router.delete("/:id/like", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "게시물을 찾을 수 없습니다",
      });
    }

    // 좋아요 했는지 확인
    const likedIndex = user.liked_posts.findIndex((p) => p.equals(post._id));
    if (likedIndex === -1) {
      return res.status(400).json({
        success: false,
        error: "좋아요하지 않은 게시물입니다",
      });
    }

    // 좋아요 취소
    post.likes = Math.max(0, post.likes - 1);
    await post.save();

    user.liked_posts.splice(likedIndex, 1);
    await user.save();

    res.json({
      success: true,
      message: "좋아요를 취소했습니다",
      likes: post.likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "좋아요 취소 중 오류가 발생했습니다",
    });
  }
});

/* ===================
   댓글 API
   =================== */

// POST /api/posts/:id/comments - 댓글 작성
router.post("/:id/comments", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: "댓글 내용을 입력해주세요",
      });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "게시물을 찾을 수 없습니다",
      });
    }

    // 댓글 생성
    const comment = await Comment.create({ content });
    comment.creator._id = req.user._id;
    comment.creator.firstName = req.user.firstName;
    comment.creator.lastName = req.user.lastName;
    comment.likes = 0;
    await comment.save();

    // 게시물에 댓글 추가
    post.comments.push(comment);
    await post.save();

    res.status(201).json({
      success: true,
      message: "댓글이 작성되었습니다",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "댓글 작성 중 오류가 발생했습니다",
    });
  }
});

// POST /api/posts/:postid/comments/:commentid/like - 댓글 좋아요
router.post(
  "/:postid/comments/:commentid/like",
  verifyToken,
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const comment = await Comment.findById(req.params.commentid);

      if (!comment) {
        return res.status(404).json({
          success: false,
          error: "댓글을 찾을 수 없습니다",
        });
      }

      // 이미 좋아요 했는지 확인
      const alreadyLiked = user.liked_comments.some((c) =>
        c.equals(comment._id)
      );
      if (alreadyLiked) {
        return res.status(400).json({
          success: false,
          error: "이미 좋아요한 댓글입니다",
        });
      }

      // 좋아요 추가
      comment.likes = comment.likes + 1;
      await comment.save();

      user.liked_comments.push(comment._id);
      await user.save();

      res.json({
        success: true,
        message: "댓글에 좋아요를 눌렀습니다",
        likes: comment.likes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "댓글 좋아요 중 오류가 발생했습니다",
      });
    }
  }
);

// DELETE /api/posts/:postid/comments/:commentid/like - 댓글 좋아요 취소
router.delete(
  "/:postid/comments/:commentid/like",
  verifyToken,
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const comment = await Comment.findById(req.params.commentid);

      if (!comment) {
        return res.status(404).json({
          success: false,
          error: "댓글을 찾을 수 없습니다",
        });
      }

      // 좋아요 했는지 확인
      const likedIndex = user.liked_comments.findIndex((c) =>
        c.equals(comment._id)
      );
      if (likedIndex === -1) {
        return res.status(400).json({
          success: false,
          error: "좋아요하지 않은 댓글입니다",
        });
      }

      // 좋아요 취소
      comment.likes = Math.max(0, comment.likes - 1);
      await comment.save();

      user.liked_comments.splice(likedIndex, 1);
      await user.save();

      res.json({
        success: true,
        message: "댓글 좋아요를 취소했습니다",
        likes: comment.likes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "댓글 좋아요 취소 중 오류가 발생했습니다",
      });
    }
  }
);

module.exports = router;
