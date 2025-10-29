# @repo/ui

공유 UI 컴포넌트 패키지

## 📦 포함된 내용

- 재사용 가능한 React 컴포넌트
- Tailwind CSS 프리셋 (커스텀 컬러 포함)
- 공통 스타일

## 🎨 Tailwind CSS 프리셋 사용하기

이 패키지는 모든 앱에서 사용할 수 있는 Tailwind CSS 프리셋을 제공합니다.

### 앱에서 프리셋 사용하기

```js
// tailwind.config.mjs
import { uiPreset } from "@repo/ui/tailwind.config";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [uiPreset],
  theme: {
    extend: {
      // 앱별 추가 커스터마이징
    },
  },
};
```

### 커스텀 컬러 사용 예시

```tsx
// Primary 컬러 (50-950 스케일)
<button className="bg-primary-500 hover:bg-primary-600">
  Primary Button
</button>

// Secondary 컬러 (50-950 스케일)
<div className="text-secondary-700 bg-secondary-100">
  Secondary Content
</div>

// Brand 컬러 (light, DEFAULT, dark)
<span className="text-brand">Brand Color</span>
<span className="text-brand-dark">Brand Dark</span>

// Accent 컬러
<div className="border-accent bg-accent-light">
  Accent Box
</div>

// 시맨틱 컬러
<div className="text-success">성공 메시지</div>
<div className="text-warning">경고 메시지</div>
<div className="text-danger">오류 메시지</div>
```

## 🎯 사용 가능한 커스텀 컬러

### Primary (파란색 계열)

- `primary-50` ~ `primary-950` (11단계)
- 기본값: `primary-500` (#0ea5e9)

### Secondary (보라색 계열)

- `secondary-50` ~ `secondary-950` (11단계)
- 기본값: `secondary-500` (#d946ef)

### Brand (빨간색 계열)

- `brand-light`, `brand`, `brand-dark`
- 기본값: `brand` (#FF6B6B)

### Accent (청록색 계열)

- `accent-light`, `accent`, `accent-dark`
- 기본값: `accent` (#4ECDC4)

### Success (녹색 계열)

- `success-light`, `success`, `success-dark`
- 기본값: `success` (#37B24D)

### Warning (노란색 계열)

- `warning-light`, `warning`, `warning-dark`
- 기본값: `warning` (#FCC419)

### Danger (빨간색 계열)

- `danger-light`, `danger`, `danger-dark`
- 기본값: `danger` (#FF6B6B)

## 📝 컬러 커스터마이징

프리셋의 컬러를 수정하려면 `packages/ui/tailwind.config.ts` 파일을 편집하세요:

```ts
const uiPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#YOUR_COLOR",
          // ...
        },
      },
    },
  },
};
```

## 🛠️ 개발

```bash
# Storybook 실행
pnpm dev

# 타입 체크
pnpm check-types

# 린트
pnpm lint

# 컴포넌트 생성
pnpm generate:component
```

## 📦 Export

- 컴포넌트: `@repo/ui/*`
- Tailwind 설정: `@repo/ui/tailwind.config`
- 스타일: `@repo/ui/styles`
