"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block rounded-full border border-white/20 px-4 py-1 text-xs text-white/70">
              Frontend Engineer Portfolio
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-tight">
              사용자 경험과 성능을
              <br />
              함께 설계하는 프론트엔드 개발자
            </h1>
            <p className="mt-6 text-lg text-white/70">
              React · Next.js · TypeScript
            </p>
            <p className="mt-6 max-w-xl text-white/60">
              교보문고, LG에너지솔루션, 더한섬닷컴 등
              <br />
              실제 서비스 환경에서 검증된 프론트엔드 경험
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                href="/projects"
                className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/30 px-6 py-3 text-sm font-medium hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xl leading-relaxed text-neutral-700"
        >
          6년 10개월 동안 이커머스, 금융, 에너지, 글로벌 서비스 등 다양한
          도메인의 웹 서비스를 개발해왔습니다.
          <br />
          구조와 성능, 그리고 유지보수성을 함께 고려하는 개발을 지향합니다.
        </motion.p>
      </section>

      {/* Strengths */}
      <section className="bg-neutral-50 py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold mb-16">
            What I Focus On
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {["실서비스 중심 경험", "구조와 성능 최적화", "컴포넌트 설계"].map(
              (title, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl bg-white p-8 shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-4">{title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {title === "실서비스 중심 경험" &&
                      "교보문고, LG에너지솔루션 등 실제 운영 중인 서비스에서 프론트엔드를 개발했습니다."}
                    {title === "구조와 성능 최적화" &&
                      "Next.js SSR, Lazy Loading, 데이터 캐싱으로 사용자 경험을 개선했습니다."}
                    {title === "컴포넌트 설계" &&
                      "Storybook 기반 디자인 시스템과 재사용 컴포넌트를 설계했습니다."}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <h2 className="text-center text-3xl font-semibold mb-6">
          Selected Projects
        </h2>
        <p className="text-center text-neutral-600 mb-16">
          문제 해결과 기술 선택의 이유를 중심으로 소개합니다.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <Link
            href="/projects/kyobo"
            className="group rounded-2xl border p-8 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:underline">
              교보문고 B2B 리딩트리
            </h3>
            <p className="text-sm text-neutral-600">
              SSR 기반 이커머스 서비스 고도화
            </p>
          </Link>

          <div className="rounded-2xl border p-8">
            <h3 className="text-lg font-semibold mb-2">LG 에너지솔루션</h3>
            <p className="text-sm text-neutral-600">
              글로벌 배터리 관리 Admin 대시보드
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="text-lg font-semibold mb-2">더한섬닷컴</h3>
            <p className="text-sm text-neutral-600">
              모바일 쇼핑몰 상품 상세 및 이벤트 페이지
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-neutral-950 py-24 text-center text-white">
        <p className="text-xl font-medium">
          기능 구현을 넘어, 오래 유지되는 프론트엔드를 만듭니다.
        </p>
      </section>
    </main>
  );
}
