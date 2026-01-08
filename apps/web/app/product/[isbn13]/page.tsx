import { ProductDetail, ProductDetailSkeleton } from "@/service/detail";
import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IProductDetailResponse } from "@/service/detail/interface";
import { PRODUCT_API_URL } from "@/service/detail/constants/productApiKey";

interface IProductPageProps {
  params: {
    isbn13: string;
  };
}

/**
 * 상품 데이터 가져오기 (공통 함수)
 * @param isbn13 - 상품 ISBN13
 * @returns 상품 상세 응답 데이터
 * @description generateMetadata와 페이지 컴포넌트에서 공통으로 사용하는 데이터 fetching 함수
 */
async function getProductData(
  isbn13: string
): Promise<IProductDetailResponse | null> {
  try {
    const res = await fetch(`${PRODUCT_API_URL.PRODUCT}/${isbn13}`, {
      next: { revalidate: 3600 }, // 1시간 캐시
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("상품 데이터 가져오기 오류:", error);
    return null;
  }
}

/**
 * 상품 상세 페이지 SEO 메타데이터 생성
 * @param params - 라우트 파라미터 (isbn13)
 * @returns 메타데이터 객체
 * @description 서버에서 상품 데이터를 가져와 동적으로 메타데이터를 생성합니다.
 * 초기 HTML에 메타데이터가 포함되어 SEO와 소셜 미디어 공유에 최적화됩니다.
 */
export async function generateMetadata({
  params,
}: IProductPageProps): Promise<Metadata> {
  const { isbn13 } = params;

  const data = await getProductData(isbn13);
  const item = data?.item?.[0];

  if (!item) {
    return {
      title: "상품 상세 | 도서 정보",
      description: "도서 상세 정보를 확인하세요.",
    };
  }

  const title = item.title || "상품 상세";
  const description = item.description || "도서 상세 정보를 확인하세요.";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: item.cover ? [item.cover] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: item.cover ? [item.cover] : [],
    },
  };
}

/**
 * 상품 데이터를 가져와서 ProductDetail에 전달하는 컴포넌트
 * @param isbn13 - 상품 ISBN13
 * @description Suspense와 함께 사용하여 로딩 상태를 처리합니다.
 */
async function ProductDetailWrapper({ isbn13 }: { isbn13: string }) {
  const data = await getProductData(isbn13);
  const item = data?.item?.[0];

  if (!item || !data) {
    notFound();
  }

  return <ProductDetail initialData={data} />;
}

/**
 * 상품 상세 페이지
 * @param params - 라우트 파라미터 (isbn13)
 * @returns 상품 상세 페이지 컴포넌트
 * @description ISBN을 기반으로 상품 상세 정보를 표시하는 페이지
 * Suspense를 사용하여 로딩 중에는 skeleton을 표시합니다.
 */
export default function ProductPage({ params }: IProductPageProps) {
  const { isbn13 } = params;

  return (
    <section className="w-full mx-auto flex flex-col">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailWrapper isbn13={isbn13} />
      </Suspense>
    </section>
  );
}
