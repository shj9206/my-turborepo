"use client";

import { useView } from "@/app/_provider/viewProvider";
import Link from "next/link";
import { cn } from "@repo/util";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 에러 발생 시 표시되는 에러 페이지
 * @param error - 발생한 에러 객체
 * @param reset - 에러 상태를 리셋하는 함수
 * @description API 호출 실패나 404 에러를 처리합니다.
 */
export default function Error({ error, reset }: ErrorProps) {
  const { IS_MOBILE } = useView();

  return (
    <section
      className={cn(
        "w-full mx-auto flex flex-col items-center justify-center",
        IS_MOBILE ? "px-4 py-12 min-h-[60vh]" : "px-6 py-16 min-h-[70vh]"
      )}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <h1
          className={cn(
            "font-bold text-gray-900",
            IS_MOBILE ? "text-2xl" : "text-4xl"
          )}
        >
          오류가 발생했습니다
        </h1>
        <p className={cn("text-gray-600", IS_MOBILE ? "text-sm" : "text-base")}>
          {error.message || "알 수 없는 오류가 발생했습니다."}
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className={cn(
              "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              IS_MOBILE ? "text-sm" : "text-base"
            )}
          >
            다시 시도
          </button>
          <Link
            href="/main"
            className={cn(
              "px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors",
              IS_MOBILE ? "text-sm" : "text-base"
            )}
          >
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </section>
  );
}
