import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스명을 결합하는 유틸리티 함수 (Tailwind CSS 클래스 병합 지원)
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * URL 파라미터를 쿼리 스트링으로 변환
 * @param {Object} params - URL 파라미터 객체
 * @returns {string} 쿼리 스트링
 */
export const buildQueryString = (
  params: Record<string, string | number | boolean>
) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
};
