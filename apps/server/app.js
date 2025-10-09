const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socket = require("socket.io");
const dotenv = require("dotenv");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");

// Load environment variables from the .env file next to this script
dotenv.config({ path: path.join(__dirname, ".env") });

const port = process.env.PORT || 3000;
const onlineChatUsers = {};

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const app = express();

/* Middleware */
// CORS 설정 - React 앱에서 API 호출 가능하도록
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
  })
);

// JSON 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 (이미지 등)
app.use(express.static("public"));

/* MongoDB Connection */
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error(
    "MONGODB_URI is not set. Add MONGODB_URI to apps/server/.env (Atlas or local)."
  );
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

/* Swagger UI */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Social Media API Docs",
  })
);

/* API 라우터 */
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: 서버 상태 확인
 *     tags: [Health]
 *     security: []
 *     responses:
 *       200:
 *         description: 서버 정상 작동
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Server is running
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

const server = app.listen(port, () => {
  console.log("App is running on port " + port);
});

/* WebSocket setup */
const io = socket(server);

const room = io.of("/chat");
room.on("connection", (socket) => {
  console.log("new user : ", socket.id);

  room.emit("newUser", { socketID: socket.id });

  socket.on("newUser", (data) => {
    if (!(data.name in onlineChatUsers)) {
      onlineChatUsers[data.name] = data.socketID;
      socket.name = data.name;
      room.emit("updateUserList", Object.keys(onlineChatUsers));
      console.log("Online users: " + Object.keys(onlineChatUsers));
    }
  });

  socket.on("disconnect", () => {
    delete onlineChatUsers[socket.name];
    room.emit("updateUserList", Object.keys(onlineChatUsers));
    console.log(`user ${socket.name} disconnected`);
  });

  socket.on("chat", (data) => {
    console.log(data);
    if (data.to === "Global Chat") {
      room.emit("chat", data);
    } else if (data.to) {
      room.to(onlineChatUsers[data.name]).emit("chat", data);
      room.to(onlineChatUsers[data.to]).emit("chat", data);
    }
  });
});
