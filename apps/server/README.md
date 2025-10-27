# Server - RESTful API

소셜 미디어 플랫폼을 위한 RESTful API 서버입니다.

## 🚀 변경 사항

### Before (EJS 템플릿 서버)

- ❌ 서버 사이드 렌더링 (EJS)
- ❌ 세션 기반 인증 (Passport Session)
- ❌ `res.render()`, `res.redirect()`
- ❌ `req.flash()` 메시지

### After (RESTful API 서버)

- ✅ JSON API
- ✅ JWT 기반 인증
- ✅ `res.json()` 응답
- ✅ HTTP 상태 코드 + 에러 메시지
- ✅ CORS 설정
- ✅ RESTful한 HTTP 메서드 (GET, POST, PUT, DELETE)

## 📁 프로젝트 구조

```
apps/server/
├── app.js                 # Express 앱 진입점
├── middleware/
│   └── auth.js           # JWT 인증 미들웨어
├── routes/
│   ├── users.js          # 사용자 & 친구 API
│   └── posts.js          # 게시물 & 댓글 API
├── models/
│   ├── User.js           # 사용자 모델
│   ├── Post.js           # 게시물 모델
│   └── Comment.js        # 댓글 모델
├── views/                # ⚠️ 더 이상 사용하지 않음 (삭제 가능)
├── .env                  # 환경 변수
├── API.md               # 📚 API 문서
└── README.md            # 이 파일
```

## ⚙️ 환경 설정

### 1. 패키지 설치

```bash
cd apps/server
pnpm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# JWT Secret
SECRET=your-secret-key-change-this

# Server Port
PORT=3000

# Client URL (React 앱 주소)
CLIENT_URL=http://localhost:3000

# Cloudinary (이미지 업로드)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Default Profile Picture
DEFAULT_PROFILE_PIC=https://via.placeholder.com/150
```

### 3. 서버 실행

```bash
pnpm start
```

서버가 `http://localhost:3000`에서 실행됩니다.

### 4. API 테스트

#### 방법 1: Swagger UI (추천)

브라우저에서 http://localhost:3000/api-docs 열기

#### 방법 2: curl

```bash
curl http://localhost:3000/api/health
# {"status":"ok","message":"Server is running"}
```

## 📖 API 문서

### Swagger UI (대화형 API 문서)

서버를 실행한 후 브라우저에서 Swagger UI를 통해 API를 테스트할 수 있습니다:

**🔗 http://localhost:3000/api-docs**

Swagger UI에서 다음을 할 수 있습니다:

- 📝 모든 API 엔드포인트 확인
- 🧪 브라우저에서 직접 API 테스트
- 🔐 JWT 토큰으로 인증된 요청 테스트
- 📋 요청/응답 스키마 확인

### Markdown API 문서

전체 API 문서는 [API.md](./API.md)를 참고하세요.

### API 엔드포인트 요약

#### 인증

- `POST /api/users/register` - 회원가입
- `POST /api/users/login` - 로그인
- `GET /api/users/me` - 내 정보 조회

#### 사용자

- `GET /api/users` - 모든 사용자 조회
- `GET /api/users/:id/profile` - 특정 사용자 프로필 조회

#### 친구

- `POST /api/users/:id/friend-request` - 친구 요청
- `PUT /api/users/:id/accept-friend` - 친구 수락
- `DELETE /api/users/:id/decline-friend` - 친구 거절

#### 게시물

- `GET /api/posts` - 피드 조회
- `GET /api/posts/:id` - 게시물 상세 조회
- `POST /api/posts` - 게시물 작성
- `DELETE /api/posts/:id` - 게시물 삭제
- `POST /api/posts/:id/like` - 좋아요
- `DELETE /api/posts/:id/like` - 좋아요 취소

#### 댓글

- `POST /api/posts/:id/comments` - 댓글 작성
- `POST /api/posts/:postid/comments/:commentid/like` - 댓글 좋아요
- `DELETE /api/posts/:postid/comments/:commentid/like` - 댓글 좋아요 취소

#### 채팅

- WebSocket: `ws://localhost:3000/chat`

## 🔐 인증 방식

JWT (JSON Web Token) 기반 인증을 사용합니다.

### 1. 로그인/회원가입으로 토큰 받기

```javascript
const response = await fetch("http://localhost:3000/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "john", password: "pass123" }),
});

const { token } = await response.json();
// token을 localStorage에 저장
localStorage.setItem("token", token);
```

### 2. API 요청 시 토큰 포함

```javascript
const response = await fetch("http://localhost:3000/api/posts", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

## 🔧 React 앱과 연동

### Axios 설정 예시

```javascript
// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 사용 예시

```javascript
import api from "./api/axios";

// 로그인
const { data } = await api.post("/users/login", { username, password });
localStorage.setItem("token", data.token);

// 게시물 조회
const { data } = await api.get("/posts");
console.log(data.posts);

// 게시물 작성
const formData = new FormData();
formData.append("content", "Hello World!");
formData.append("image", imageFile);
const { data } = await api.post("/posts", formData);
```

## 🧪 테스트 도구

### 1. Swagger UI (가장 쉬운 방법) ⭐

1. **브라우저에서 열기**

   ```
   http://localhost:3000/api-docs
   ```

2. **로그인하여 토큰 받기**

   - `POST /api/users/login` 섹션 열기
   - "Try it out" 클릭
   - username과 password 입력
   - "Execute" 클릭
   - 응답에서 `token` 복사

3. **인증 설정**

   - 페이지 상단의 🔒 "Authorize" 버튼 클릭
   - `Bearer {token}` 입력 (Bearer 다음에 공백 후 토큰)
   - "Authorize" 클릭

4. **API 테스트**
   - 이제 모든 API를 브라우저에서 직접 테스트 가능!

### 2. Postman 또는 Thunder Client

1. **로그인 요청**

   ```
   POST http://localhost:3000/api/users/login
   Body (JSON):
   {
     "username": "testuser",
     "password": "testpass"
   }
   ```

2. **토큰 복사**

   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **인증이 필요한 요청**
   ```
   GET http://localhost:3000/api/posts
   Headers:
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 📝 주요 변경 사항 상세

### 1. app.js

- ❌ 제거: EJS 뷰 엔진, 세션, 쿠키, Passport 세션, flash 메시지
- ✅ 추가: CORS, JSON 응답, API 라우터 (`/api/*`)

### 2. 인증 시스템

- ❌ Passport 세션 → ✅ JWT 토큰
- 토큰 유효기간: 7일
- 미들웨어: `verifyToken` (인증 확인)

### 3. 라우터 변경

- 모든 `res.render()` → `res.json()`
- 모든 `res.redirect()` → JSON 응답 + HTTP 상태 코드
- 모든 `req.flash()` → JSON 메시지
- GET으로 데이터 변경하던 것 → POST/PUT/DELETE로 변경

### 4. HTTP 메서드

- ✅ RESTful하게 변경
  - 조회: `GET`
  - 생성: `POST`
  - 수정: `PUT`
  - 삭제: `DELETE`

## 🚧 마이그레이션 노트

### 더 이상 필요 없는 파일들

다음 파일/폴더는 삭제해도 됩니다:

- `views/` (모든 EJS 템플릿)
- `public/users/` (CSS 파일)
- `public/posts/` (CSS 파일)

단, `public/images/`는 유지 (정적 파일 서빙용)

### 필요한 패키지

새로 추가된 패키지:

- `jsonwebtoken` - JWT 생성/검증
- `cors` - CORS 처리

더 이상 필요 없는 패키지 (선택적 제거 가능):

- `express-session`
- `cookie-parser`
- `connect-flash`

## 🐛 트러블슈팅

### 1. CORS 에러

```
Access to fetch at 'http://localhost:3000/api/posts' from origin 'http://localhost:3000' has been blocked by CORS
```

**해결:** `.env`에 `CLIENT_URL=http://localhost:3000` 설정 확인

### 2. 401 Unauthorized

```json
{ "success": false, "error": "인증 토큰이 필요합니다" }
```

**해결:** Authorization 헤더에 토큰 포함 확인

```javascript
headers: { 'Authorization': `Bearer ${token}` }
```

### 3. 토큰 만료

```json
{ "success": false, "error": "토큰이 만료되었습니다" }
```

**해결:** 다시 로그인하여 새 토큰 받기

### 4. MongoDB 연결 에러

```
TypeError: Cannot read properties of null (reading 'split')
```

**해결:** `.env`의 `MONGODB_URI` 확인, 특수문자 URL 인코딩

## 📚 추가 리소스

- [API 전체 문서](./API.md)
- [Express 공식 문서](https://expressjs.com/)
- [JWT 공식 사이트](https://jwt.io/)
- [MongoDB 공식 문서](https://www.mongodb.com/docs/)

## 🎯 다음 단계

1. React 앱 생성 또는 기존 앱 수정
2. Axios 설정
3. 로그인/회원가입 페이지 구현
4. 피드 페이지 구현
5. 게시물 작성/수정/삭제 구현
6. 친구 관리 기능 구현

---

**Happy Coding! 🚀**
