"use client";

import { NotFoundDetail } from "@/service/detail";
/**
 * 상품을 찾을 수 없을 때 표시되는 404 페이지
 * @description ISBN13으로 상품을 찾을 수 없을 때 표시되는 페이지
 */
export default function NotFound() {
  return <NotFoundDetail />;
}
