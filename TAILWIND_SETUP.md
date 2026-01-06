# Tailwind CSS 프리셋 설정 가이드

이 모노레포는 `packages/ui`에서 Tailwind CSS 프리셋을 관리하고, 모든 앱에서 이를 재사용합니다.

## 📂 파일 구조

```
my-turborepo/
├── packages/
│   └── ui/
│       ├── tailwind.config.ts       # 🎨 메인 프리셋 (여기서 커스텀 컬러 정의)
│       ├── postcss.config.mjs
│       ├── src/
│       │   ├── index.css            # Tailwind 디렉티브
│       │   └── color-demo.tsx       # 컬러 데모 컴포넌트
│       └── package.json
├── apps/
│   ├── web/
│   │   ├── tailwind.config.mjs      # UI 프리셋을 import
│   │   └── postcss.config.mjs
│   └── docs/
│       ├── tailwind.config.mjs      # UI 프리셋을 import
│       └── postcss.config.mjs
└── tailwind.config.js                # Storybook용 (레거시)
```

## 🎨 커스텀 컬러 추가/수정 방법

### 1. 프리셋에 컬러 추가

`packages/ui/tailwind.config.ts` 파일을 수정하세요:

```typescript
const uiPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // 새로운 컬러 팔레트 추가
        custom: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          // ... 나머지 shade
          900: "#7c2d12",
          950: "#431407",
        },
        // 또는 간단한 컬러
        myColor: "#FF5733",
      },
    },
  },
};
```

### 2. 앱에서 자동으로 사용 가능

프리셋을 수정하면 모든 앱에서 자동으로 새 컬러를 사용할 수 있습니다:

```tsx
// apps/web 또는 apps/docs 어디서나
<div className="bg-custom-500 text-myColor">새로운 커스텀 컬러!</div>
```

### 3. 앱별 추가 커스터마이징

특정 앱에서만 추가 컬러가 필요한 경우:

```js
// apps/web/tailwind.config.mjs
export default {
  presets: [uiPreset],
  theme: {
    extend: {
      colors: {
        webOnly: "#123456", // web 앱에서만 사용 가능
      },
    },
  },
};
```

## 🚀 새 앱에 Tailwind 설정하기

### 1. Tailwind 의존성 설치

```bash
cd apps/your-new-app
pnpm add -D tailwindcss@^3.4.17 postcss autoprefixer
```

### 2. Tailwind 설정 파일 생성

```js
// apps/your-new-app/tailwind.config.mjs
import { uiPreset } from "@repo/ui/tailwind.config";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [uiPreset],
  theme: {
    extend: {
      // 이 앱 전용 커스터마이징
    },
  },
  plugins: [],
};
```

### 3. PostCSS 설정 파일 생성

```js
// apps/your-new-app/postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4. 앱에서 스타일 import

```tsx
// apps/your-new-app/app/layout.tsx
import "@repo/ui/styles"; // UI 패키지의 Tailwind 스타일
import "./globals.css"; // 앱 전용 스타일
```

또는 앱 자체 CSS 파일에서:

```css
/* apps/your-new-app/app/globals.css */
@import "@repo/ui/styles";

/* 앱 전용 스타일 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎯 현재 사용 가능한 커스텀 컬러

### Primary (파란색)

```tsx
<div className="bg-primary-500">Primary</div>
<div className="text-primary-700">Primary Text</div>
```

### Secondary (보라색)

```tsx
<div className="bg-secondary-500">Secondary</div>
<div className="border-secondary-300">Secondary Border</div>
```

### Brand (브랜드 컬러)

```tsx
<div className="bg-brand">Brand</div>
<div className="bg-brand-light">Brand Light</div>
<div className="bg-brand-dark">Brand Dark</div>
```

### Accent (포인트 컬러)

```tsx
<div className="bg-accent">Accent</div>
<div className="text-accent-dark">Accent Text</div>
```

### Semantic (의미론적 컬러)

```tsx
<div className="bg-success">Success</div>
<div className="bg-warning">Warning</div>
<div className="bg-danger">Danger</div>
```

## 🧪 컬러 테스트

컬러가 제대로 적용되는지 확인하려면 `ColorDemo` 컴포넌트를 사용하세요:

```tsx
import { ColorDemo } from "@repo/ui/color-demo";

export default function TestPage() {
  return <ColorDemo />;
}
```

## 💡 프리셋의 장점

1. **중앙 관리**: 한 곳에서 모든 앱의 디자인 토큰 관리
2. **일관성**: 모든 앱에서 동일한 컬러 팔레트 사용
3. **유지보수**: 컬러 변경 시 한 번만 수정
4. **확장성**: 앱별로 추가 커스터마이징 가능
5. **재사용성**: 새 앱 추가 시 즉시 프리셋 사용 가능

## 📚 더 알아보기

- [Tailwind CSS - Presets](https://tailwindcss.com/docs/presets)
- [Tailwind CSS - Customizing Colors](https://tailwindcss.com/docs/customizing-colors)
- [Turborepo - Sharing Code](https://turbo.build/repo/docs/handbook/sharing-code)

## 🔧 문제 해결

### "Cannot find module '@repo/ui/tailwind.config'" 오류

`packages/ui/package.json`의 exports에 설정이 있는지 확인:

```json
{
  "exports": {
    "./tailwind.config": "./tailwind.config.ts"
  }
}
```

### 커스텀 컬러가 적용되지 않음

1. 개발 서버 재시작
2. `node_modules/.cache` 삭제 후 재빌드
3. Tailwind의 content 경로에 UI 패키지 포함 확인

### 타입스크립트 에러

`tailwind.config.ts`에서 타입을 올바르게 import했는지 확인:

```typescript
import type { Config } from "tailwindcss";
```
