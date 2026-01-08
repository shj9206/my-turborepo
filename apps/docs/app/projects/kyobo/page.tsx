"use client";

import { motion } from "framer-motion";

export default function KyoboProjectPage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block rounded-full border border-white/20 px-4 py-1 text-xs text-white/70">
              Case Study
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
              교보문고 B2B 리딩트리
              <br />
              서비스 고도화 프로젝트
            </h1>
            <p className="mt-6 text-white/70">
              SSR 기반 이커머스 플랫폼 성능 개선 및 유지보수성을 고려한
              프론트엔드 구조 설계
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-4xl px-6 py-32">
        <h2 className="text-3xl font-semibold mb-8">Overview</h2>
        <p className="text-neutral-700 leading-relaxed">
          교보문고 리딩트리는 기업 대상 도서 구독 및 관리 서비스로, 대규모
          콘텐츠와 사용자를 동시에 처리해야 하는 B2B 플랫폼입니다. 본
          프로젝트에서는 Next.js 기반 SSR 환경에서 성능, SEO, 유지보수성을
          중심으로 프론트엔드 구조를 고도화했습니다.
        </p>
      </section>

      {/* Context */}
      <section className="bg-neutral-50 py-32">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-semibold mb-8">Project Context</h2>
          <ul className="space-y-4 text-neutral-700 list-disc list-inside">
            <li>도서 검색 및 목록 페이지의 초기 로딩 속도 문제</li>
            <li>중복된 UI 컴포넌트로 인한 유지보수 비용 증가</li>
            <li>검색 엔진 노출을 고려한 SEO 요구사항</li>
          </ul>
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <h2 className="text-3xl font-semibold mb-16">Problems & Solutions</h2>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="rounded-2xl border p-8">
            <h3 className="font-semibold mb-4">초기 로딩 및 SEO 한계</h3>
            <p className="text-neutral-700">
              CSR 구조에서 발생하던 초기 로딩 지연 문제를 해결하기 위해 Next.js
              기반 SSR을 도입하여 검색 엔진 친화적인 페이지 구조를 설계했습니다.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="font-semibold mb-4">컴포넌트 중복</h3>
            <p className="text-neutral-700">
              Storybook을 활용한 디자인 시스템을 구축하여 공통 컴포넌트의
              재사용성을 높이고 UI 일관성을 확보했습니다.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="font-semibold mb-4">데이터 요청 과다</h3>
            <p className="text-neutral-700">
              TanStack Query의 캐싱 전략을 적용하여 불필요한 API 호출을 줄이고
              사용자 경험을 개선했습니다.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="font-semibold mb-4">리스트 렌더링 성능</h3>
            <p className="text-neutral-700">
              Lazy Loading과 컴포넌트 분리를 통해 대용량 리스트에서도 안정적인
              렌더링 성능을 확보했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-neutral-50 py-32">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-semibold mb-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Storybook",
              "TanStack Query",
              "Vitest",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white border px-4 py-2 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="mx-auto max-w-4xl px-6 py-32">
        <h2 className="text-3xl font-semibold mb-8">Impact</h2>
        <ul className="space-y-4 text-neutral-700 list-disc list-inside">
          <li>초기 페이지 로딩 속도 개선</li>
          <li>컴포넌트 재사용률 증가로 개발 생산성 향상</li>
          <li>SEO 대응 구조 확립</li>
        </ul>
      </section>

      {/* Screenshots */}
      <section className="bg-neutral-950 py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold text-white mb-12">
            Screenshots
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-500"
              >
                Sample Image
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
