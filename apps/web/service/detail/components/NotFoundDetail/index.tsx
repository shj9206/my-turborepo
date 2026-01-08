import { useView } from "@/app/_provider/viewProvider";
import { cn } from "@repo/util";
import Link from "next/link";

export const NotFoundDetail = () => {
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
          상품을 찾을 수 없습니다
        </h1>
        <p className={cn("text-gray-600", IS_MOBILE ? "text-sm" : "text-base")}>
          요청하신 상품이 존재하지 않습니다.
        </p>
        <Link
          href="/main"
          className={cn(
            "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
            IS_MOBILE ? "text-sm" : "text-base"
          )}
        >
          메인으로 돌아가기
        </Link>
      </div>
    </section>
  );
};
