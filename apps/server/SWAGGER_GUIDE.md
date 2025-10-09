# Swagger UI 사용 가이드

## 📖 개요

Swagger UI를 통해 브라우저에서 직접 API를 테스트하고 문서를 확인할 수 있습니다.

## 🚀 시작하기

### 1. 서버 실행

```bash
cd apps/server
pnpm start
```

### 2. Swagger UI 열기

브라우저에서 다음 주소로 접속:

**🔗 http://localhost:3000/api-docs**

## 🔐 인증 설정

대부분의 API는 JWT 인증이 필요합니다. 다음 단계를 따라하세요:

### Step 1: 회원가입 또는 로그인

#### 회원가입 (처음 사용하는 경우)

1. **POST /api/users/register** 섹션 찾기
2. **"Try it out"** 클릭
3. 정보 입력:
   ```json
   {
     "username": "myusername",
     "firstname": "홍",
     "lastname": "길동",
     "password": "mypassword123"
   }
   ```
4. **"Execute"** 클릭
5. 응답에서 `token` 복사

#### 로그인 (이미 계정이 있는 경우)

1. **POST /api/users/login** 섹션 찾기
2. **"Try it out"** 클릭
3. 로그인 정보 입력:
   ```json
   {
     "username": "myusername",
     "password": "mypassword123"
   }
   ```
4. **"Execute"** 클릭
5. 응답에서 `token` 복사:
   ```json
   {
     "success": true,
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {...}
   }
   ```

### Step 2: 토큰으로 인증 설정

1. 페이지 **상단**의 🔒 **"Authorize"** 버튼 클릭
2. Value 필드에 토큰 입력 (Bearer 키워드 **제외**):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. **"Authorize"** 버튼 클릭
4. **"Close"** 버튼 클릭

✅ 이제 모든 인증이 필요한 API를 사용할 수 있습니다!

## 📝 API 사용 예시

### 1. 게시물 작성

1. **POST /api/posts** 섹션 찾기
2. **"Try it out"** 클릭
3. 게시물 내용 입력:
   - `content`: "안녕하세요, 첫 게시물입니다!"
   - `image`: 이미지 파일 선택 (선택사항)
4. **"Execute"** 클릭
5. 응답 확인

### 2. 피드 조회

1. **GET /api/posts** 섹션 찾기
2. **"Try it out"** 클릭
3. **"Execute"** 클릭
4. 본인과 친구들의 게시물 목록 확인

### 3. 친구 요청 보내기

1. 먼저 **GET /api/users**로 사용자 목록 조회
2. 친구 요청을 보낼 사용자의 `_id` 복사
3. **POST /api/users/{id}/friend-request** 섹션 찾기
4. **"Try it out"** 클릭
5. `id` 필드에 복사한 사용자 ID 입력
6. **"Execute"** 클릭

### 4. 게시물 좋아요

1. **GET /api/posts**로 게시물 목록 조회
2. 좋아요 누를 게시물의 `_id` 복사
3. **POST /api/posts/{id}/like** 섹션 찾기
4. **"Try it out"** 클릭
5. `id` 필드에 게시물 ID 입력
6. **"Execute"** 클릭

## 📚 API 카테고리

Swagger UI에서 제공되는 API 카테고리:

### 🔐 Authentication (인증)

- `POST /api/users/register` - 회원가입
- `POST /api/users/login` - 로그인

### 👥 Users (사용자)

- `GET /api/users/me` - 내 정보 조회
- `GET /api/users` - 모든 사용자 조회
- `GET /api/users/{id}/profile` - 특정 사용자 프로필

### 👫 Friends (친구)

- `POST /api/users/{id}/friend-request` - 친구 요청
- `PUT /api/users/{id}/accept-friend` - 친구 수락
- `DELETE /api/users/{id}/decline-friend` - 친구 거절

### 📝 Posts (게시물)

- `GET /api/posts` - 피드 조회
- `GET /api/posts/{id}` - 게시물 상세
- `POST /api/posts` - 게시물 작성
- `DELETE /api/posts/{id}` - 게시물 삭제

### ❤️ Likes (좋아요)

- `POST /api/posts/{id}/like` - 게시물 좋아요
- `DELETE /api/posts/{id}/like` - 게시물 좋아요 취소

### 💬 Comments (댓글)

- `POST /api/posts/{id}/comments` - 댓글 작성
- `POST /api/posts/{postid}/comments/{commentid}/like` - 댓글 좋아요
- `DELETE /api/posts/{postid}/comments/{commentid}/like` - 댓글 좋아요 취소

### 🏥 Health (헬스체크)

- `GET /api/health` - 서버 상태 확인

## 🎯 팁과 트릭

### 1. 응답 확인

- **"Execute"** 클릭 후 아래로 스크롤
- **Response body**에서 JSON 응답 확인
- **Response headers**에서 헤더 정보 확인

### 2. 에러 처리

- 401 에러: 토큰이 만료되었거나 유효하지 않음 → 다시 로그인
- 400 에러: 요청 데이터가 잘못됨 → 입력 값 확인
- 404 에러: 리소스를 찾을 수 없음 → ID 확인

### 3. 이미지 업로드

- **POST /api/posts** 또는 **POST /api/users/register**
- `content-type`을 `multipart/form-data`로 자동 설정됨
- "Choose File" 버튼으로 이미지 선택

### 4. 스키마 확인

- 각 API 섹션의 **"Schemas"** 탭 클릭
- 요청/응답 데이터 구조 확인

## 🔧 문제 해결

### 인증이 안 될 때

1. 🔒 "Authorize" 버튼이 초록색인지 확인
2. 토큰 앞에 "Bearer " 붙이지 않았는지 확인
3. 토큰 전체를 복사했는지 확인

### CORS 에러

- `.env` 파일에 `CLIENT_URL` 설정 확인
- 서버 재시작

### 404 Not Found

- 서버가 실행 중인지 확인
- URL이 `http://localhost:3000/api-docs`인지 확인

## 📖 추가 리소스

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [API.md](./API.md) - 상세 API 문서

---

**Happy Testing! 🚀**
