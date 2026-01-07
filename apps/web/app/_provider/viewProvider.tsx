"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { isMobile, isTablet } from "@repo/ui";

const enum ViewType {
  MO = "mobile",
  PC = "pc",
  TABLET = "tablet",
}

// Context 생성
export const ViewContext = createContext<{
  viewType: ViewType;
  IS_MOBILE: boolean;
  IS_TABLET: boolean;
}>({
  viewType: ViewType.PC,
  IS_MOBILE: false,
  IS_TABLET: false,
});

// Provider 구현
export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [IS_MOBILE, setIsMobile] = useState(false);
  const [IS_TABLET, setIsTablet] = useState(false);

  useEffect(() => {
    // 초기 값 설정
    const updateView = () => {
      setIsMobile(isMobile());
      setIsTablet(isTablet());
    };

    // 초기 실행
    updateView();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", updateView);

    // cleanup
    return () => {
      window.removeEventListener("resize", updateView);
    };
  }, []);

  const viewType = IS_MOBILE ? ViewType.MO : ViewType.PC;

  return (
    <ViewContext.Provider value={{ viewType, IS_MOBILE, IS_TABLET }}>
      {children}
    </ViewContext.Provider>
  );
}

// viewType을 쉽게 사용할 수 있는 hook
export function useView() {
  return useContext(ViewContext);
}
