# Turborepo 모노레포 프로젝트

이 프로젝트는 Turborepo를 사용한 모노레포 구조로, 여러 Next.js 애플리케이션과 공유 패키지를 관리합니다.

## 📋 프로젝트 구조

이 Turborepo 모노레포는 다음 패키지와 앱으로 구성되어 있습니다:

### Apps

- **`docs`**: 프론트엔드 엔지니어 포트폴리오 웹사이트 (포트: 8081)
- **`web`**: 알라딘 API 기반 도서 검색 및 상세 정보 웹 애플리케이션 (포트: 8080)
- **`server`**: 백엔드 API 서버

### Packages

- **`@repo/ui`**: React 컴포넌트 라이브러리 (Tailwind CSS 프리셋 포함)
- **`@repo/eslint-config`**: ESLint 설정 (eslint-config-next, eslint-config-prettier 포함)
- **`@repo/typescript-config`**: 모노레포 전체에서 사용하는 tsconfig.json 설정
- **`@repo/util`**: 공유 유틸리티 함수

모든 패키지와 앱은 100% [TypeScript](https://www.typescriptlang.org/)로 작성되었습니다.

## 🚀 시작하기

### 사전 요구사항

- **Node.js**: 18 이상
- **pnpm**: 9.0.0 (프로젝트에서 지정된 패키지 매니저)

### 설치

1. 저장소 클론:

```bash
git clone <repository-url>
cd my-turborepo
```

2. 의존성 설치:

```bash
pnpm install
```

### 개발 서버 실행

모든 앱과 패키지를 동시에 개발 모드로 실행:

```bash
pnpm dev
```

이 명령어는 다음을 실행합니다:

- **web 앱**: http://localhost:8080
- **docs 앱**: http://localhost:8081

개별 앱만 실행하려면:

```bash
# web 앱만 실행
pnpm --filter web dev

# docs 앱만 실행
pnpm --filter docs dev
```

### 빌드

모든 앱과 패키지를 빌드:

```bash
pnpm build
```

개별 앱만 빌드:

```bash
# web 앱만 빌드
pnpm --filter web build

# docs 앱만 빌드
pnpm --filter docs build
```

### 프로덕션 실행

빌드 후 프로덕션 모드로 실행:

```bash
# 먼저 빌드
pnpm build

# web 앱 프로덕션 실행
pnpm --filter web start

# docs 앱 프로덕션 실행
pnpm --filter docs start
```

### 린트 및 타입 체크

```bash
# 모든 패키지 린트
pnpm lint

# 모든 패키지 타입 체크
pnpm check-types

# 코드 포맷팅
pnpm format
```

## 📱 Apps 상세 설명

### `docs` - 포트폴리오 웹사이트

**포트**: 8081  
**접속 URL**: http://localhost:8081

프론트엔드 엔지니어의 포트폴리오 웹사이트입니다. 프로젝트 경험, 기술 스택, 케이스 스터디를 소개하는 정적 웹사이트입니다.

#### 주요 기능

- **홈 페이지**: Hero 섹션, 기술 스택 소개, 프로젝트 미리보기
- **프로젝트 페이지**: 주요 프로젝트 목록 및 상세 케이스 스터디
  - 교보문고 B2B 리딩트리 프로젝트 상세 페이지 포함
- **About 페이지**: 개발자 소개

#### 기술 스택

- **Next.js 15**: App Router 사용
- **React 19**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 스타일링 (공유 프리셋 사용)
- **Framer Motion**: 애니메이션 효과
- **@repo/ui**: 공유 UI 컴포넌트 라이브러리

#### 실행 방법

```bash
# 개발 모드 실행
pnpm --filter docs dev

# 빌드
pnpm --filter docs build

# 프로덕션 실행
pnpm --filter docs start
```

### `web` - 도서 검색 애플리케이션

**포트**: 8080  
**접속 URL**: http://localhost:8080

알라딘 API를 활용한 도서 검색 및 상세 정보 조회 웹 애플리케이션입니다. 베스트셀러, 신간 도서, 블로그 베스트 등 다양한 도서 목록을 제공하며, 도서 검색 및 상세 정보 조회 기능을 제공합니다.

#### 주요 기능

- **메인 페이지** (`/main`):

  - 배너 슬라이더
  - 베스트셀러 목록
  - 신간 도서 목록 (전체/특가)
  - 블로그 베스트 도서 목록

- **검색 페이지** (`/search`):

  - 도서 검색 기능
  - 검색 결과 필터링 (제목, 저자, 출판사 등)
  - 탭 기반 검색 결과 분류

- **도서 상세 페이지** (`/product/[isbn13]`):
  - 도서 상세 정보 표시
  - 도서 커버 이미지
  - 도서 설명 및 메타데이터

#### 기술 스택

- **Next.js 15**: App Router, Turbopack 사용
- **React 19**: 최신 React 기능
- **TypeScript**: 타입 안정성
- **TanStack Query (React Query)**: 서버 상태 관리 및 데이터 페칭
- **Tailwind CSS**: 스타일링 (공유 프리셋 사용)
- **Swiper**: 배너 슬라이더 컴포넌트
- **@repo/ui**: 공유 UI 컴포넌트 (BookCover, Footer, PageNation 등)
- **@repo/util**: 공유 유틸리티 함수

#### 반응형 디자인

- 모바일/PC 반응형 레이아웃 지원
- `ViewProvider`를 통한 뷰포트 감지 및 적응형 UI

#### 실행 방법

```bash
# 개발 모드 실행
pnpm --filter web dev

# 빌드
pnpm --filter web build

# 프로덕션 실행
pnpm --filter web start
```

#### 환경 변수

알라딘 API를 사용하기 위해 필요한 환경 변수가 있을 수 있습니다. `.env.local` 파일을 생성하여 필요한 API 키를 설정하세요.

## 🎨 Tailwind CSS 프리셋

이 모노레포는 `@repo/ui` 패키지에서 Tailwind CSS 프리셋을 제공합니다:

- ✅ 커스텀 컬러 팔레트 (Primary, Secondary, Brand, Accent, Semantic colors)
- ✅ 모든 앱에서 일관된 디자인 토큰 사용
- ✅ 중앙 집중식 관리로 쉬운 유지보수
- ✅ 앱별 추가 커스터마이징 가능

**자세한 내용은 [TAILWIND_SETUP.md](./TAILWIND_SETUP.md)를 참조하세요.**

**데모 보기**: `pnpm dev` 실행 후 http://localhost:8080/colors 방문

## 🛠️ 개발 도구

이 Turborepo에는 다음 도구들이 설정되어 있습니다:

- **[TypeScript](https://www.typescriptlang.org/)**: 정적 타입 체크
- **[ESLint](https://eslint.org/)**: 코드 린팅
- **[Prettier](https://prettier.io)**: 코드 포맷팅
- **[Tailwind CSS](https://tailwindcss.com/)**: 공유 프리셋을 사용한 스타일링
- **[Turborepo](https://turborepo.com/)**: 모노레포 빌드 시스템

## 🔄 Remote Caching

> [!TIP]
> Vercel Remote Cache는 모든 플랜에서 무료입니다. [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache)에서 지금 시작하세요.

Turborepo는 [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) 기술을 사용하여 머신 간 캐시 아티팩트를 공유할 수 있습니다. 이를 통해 팀과 CI/CD 파이프라인 간 빌드 캐시를 공유할 수 있습니다.

기본적으로 Turborepo는 로컬에 캐시합니다. Remote Caching을 활성화하려면 Vercel 계정이 필요합니다. 계정이 없다면 [계정을 생성](https://vercel.com/signup?utm_source=turborepo-examples)한 후 다음 명령어를 실행하세요:

```bash
cd my-turborepo
npx turbo login
```

이 명령어는 Turborepo CLI를 [Vercel 계정](https://vercel.com/docs/concepts/personal-accounts/overview)으로 인증합니다.

다음으로, Turborepo 루트에서 다음 명령어를 실행하여 Remote Cache에 연결할 수 있습니다:

```bash
npx turbo link
```

## 📚 유용한 링크

Turborepo의 강력한 기능에 대해 더 알아보기:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
