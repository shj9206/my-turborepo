# RESTful API 문서

## 기본 정보

- **Base URL**: `http://localhost:3000/api`
- **인증 방식**: JWT Bearer Token
- **Content-Type**: `application/json`

## 환경 변수 설정

`.env` 파일에 다음 변수들을 추가하세요:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# JWT Secret (SECRET과 동일하게 사용)
SECRET=your-secret-key-here-change-this-in-production

# Server Port
PORT=3000

# Client URL (CORS 설정용)
CLIENT_URL=http://localhost:3000

# Cloudinary (이미지 업로드)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Default Profile Picture
DEFAULT_PROFILE_PIC=https://via.placeholder.com/150
```

---

## 인증 API

### 1. 회원가입

```http
POST /api/users/register
Content-Type: multipart/form-data
```

**Request Body:**

```
username: string (required)
firstname: string (required)
lastname: string (required)
password: string (required)
image: file (optional)
```

**Response:**

```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "profile": "https://cloudinary.com/image.jpg"
  }
}
```

### 2. 로그인

```http
POST /api/users/login
Content-Type: application/json
```

**Request Body:**

```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "로그인 성공",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "profile": "https://cloudinary.com/image.jpg"
  }
}
```

### 3. 내 정보 조회

```http
GET /api/users/me
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "profile": "https://cloudinary.com/image.jpg",
    "friends": [...],
    "friendRequests": [...],
    "posts": [...]
  }
}
```

---

## 사용자 API

### 4. 모든 사용자 조회

```http
GET /api/users
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "users": [
    {
      "_id": "user_id",
      "username": "john_doe",
      "firstName": "John",
      "lastName": "Doe",
      "profile": "https://cloudinary.com/image.jpg"
    }
  ]
}
```

### 5. 특정 사용자 프로필 조회

```http
GET /api/users/:id/profile
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "profile": "https://cloudinary.com/image.jpg",
    "friends": [...],
    "posts": [...]
  }
}
```

---

## 친구 API

### 6. 친구 요청 보내기

```http
POST /api/users/:id/friend-request
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "John님에게 친구 요청을 보냈습니다"
}
```

### 7. 친구 요청 수락

```http
PUT /api/users/:id/accept-friend
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "John님과 친구가 되었습니다!"
}
```

### 8. 친구 요청 거절

```http
DELETE /api/users/:id/decline-friend
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "친구 요청을 거절했습니다"
}
```

---

## 게시물 API

### 9. 피드 조회 (본인 + 친구들의 게시물)

```http
GET /api/posts
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "posts": [
    {
      "_id": "post_id",
      "content": "게시물 내용",
      "image": "https://cloudinary.com/image.jpg",
      "creator": {
        "username": "john_doe",
        "firstName": "John",
        "lastName": "Doe",
        "profile": "https://cloudinary.com/profile.jpg"
      },
      "likes": 10,
      "time": "2025-10-09T12:00:00.000Z",
      "comments": [...]
    }
  ]
}
```

### 10. 특정 게시물 조회

```http
GET /api/posts/:id
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "post": {
    "_id": "post_id",
    "content": "게시물 내용",
    "image": "https://cloudinary.com/image.jpg",
    "creator": {...},
    "likes": 10,
    "time": "2025-10-09T12:00:00.000Z",
    "comments": [...]
  }
}
```

### 11. 게시물 작성

```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**

```
content: string (required)
image: file (optional)
```

**Response:**

```json
{
  "success": true,
  "message": "게시물이 작성되었습니다",
  "post": {
    "_id": "post_id",
    "content": "게시물 내용",
    "image": "https://cloudinary.com/image.jpg",
    "creator": {...},
    "likes": 0,
    "time": "2025-10-09T12:00:00.000Z"
  }
}
```

### 12. 게시물 삭제

```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "게시물이 삭제되었습니다"
}
```

---

## 좋아요 API

### 13. 게시물 좋아요

```http
POST /api/posts/:id/like
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "좋아요를 눌렀습니다",
  "likes": 11
}
```

### 14. 게시물 좋아요 취소

```http
DELETE /api/posts/:id/like
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "좋아요를 취소했습니다",
  "likes": 10
}
```

---

## 댓글 API

### 15. 댓글 작성

```http
POST /api/posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "content": "댓글 내용"
}
```

**Response:**

```json
{
  "success": true,
  "message": "댓글이 작성되었습니다",
  "comment": {
    "_id": "comment_id",
    "content": "댓글 내용",
    "creator": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe"
    },
    "likes": 0
  }
}
```

### 16. 댓글 좋아요

```http
POST /api/posts/:postid/comments/:commentid/like
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "댓글에 좋아요를 눌렀습니다",
  "likes": 5
}
```

### 17. 댓글 좋아요 취소

```http
DELETE /api/posts/:postid/comments/:commentid/like
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "댓글 좋아요를 취소했습니다",
  "likes": 4
}
```

---

## React에서 사용 예시 (Axios)

### 1. Axios 인스턴스 설정

```javascript
// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 인터셉터 - 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그인 페이지로 이동
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. API 호출 예시

```javascript
// src/api/auth.js
import api from "./axios";

export const login = async (username, password) => {
  const response = await api.post("/users/login", { username, password });
  const { token, user } = response.data;
  localStorage.setItem("token", token);
  return { token, user };
};

export const register = async (formData) => {
  const response = await api.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const { token, user } = response.data;
  localStorage.setItem("token", token);
  return { token, user };
};

export const logout = () => {
  localStorage.removeItem("token");
};
```

```javascript
// src/api/posts.js
import api from "./axios";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data.posts;
};

export const createPost = async (content, image) => {
  const formData = new FormData();
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.post;
};

export const likePost = async (postId) => {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data;
};
```

### 3. React 컴포넌트에서 사용

```javascript
import { useState, useEffect } from "react";
import { getPosts, createPost, likePost } from "../api/posts";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      // 게시물 목록 다시 불러오기
      loadPosts();
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          <button onClick={() => handleLike(post._id)}>❤️ {post.likes}</button>
        </div>
      ))}
    </div>
  );
}
```

---

## 에러 응답 형식

모든 에러는 다음 형식으로 반환됩니다:

```json
{
  "success": false,
  "error": "에러 메시지"
}
```

**HTTP 상태 코드:**

- `200`: 성공
- `201`: 생성 성공
- `400`: 잘못된 요청
- `401`: 인증 필요 / 인증 실패
- `403`: 권한 없음
- `404`: 리소스를 찾을 수 없음
- `500`: 서버 에러

---

## WebSocket (채팅)

WebSocket은 기존 구현이 유지됩니다:

```javascript
import io from "socket.io-client";

const socket = io("http://localhost:3000/chat");

socket.on("connect", () => {
  socket.emit("newUser", {
    name: username,
    socketID: socket.id,
  });
});

socket.on("chat", (data) => {
  console.log("New message:", data);
});

socket.emit("chat", {
  name: username,
  to: "Global Chat",
  message: "Hello!",
});
```

---

## 시작하기

1. 패키지 설치 확인:

```bash
cd apps/server
pnpm install
```

2. `.env` 파일 설정 (위 환경 변수 참고)

3. 서버 실행:

```bash
pnpm start
```

4. API 테스트:

```bash
curl http://localhost:3000/api/health
# {"status":"ok","message":"Server is running"}
```

5. React 앱에서 API 호출 시작!
