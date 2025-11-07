export function isMobile() {
  if (typeof window === "undefined") return false;
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isUserAgentMobile = regex.test(window.navigator.userAgent);

  const isSmallScreen =
    typeof window !== "undefined" && window.innerWidth <= 768;

  return isUserAgentMobile || isSmallScreen;
}

export function isTablet() {
  if (typeof window === "undefined") return false;
  const regex = /Tablet|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(window.navigator.userAgent);
}

// window navigator 객체의 userAgent
export const isiOS = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!(
    window.navigator.userAgent.match("iPad") ||
    window.navigator.userAgent.match("iPhone") ||
    window.navigator.userAgent.match("iPod")
  );
};

export const isAndroid = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!window.navigator.userAgent.match("Android");
};

// 리액트 네이티브 웹뷰 객체의 inject
export const isWebView = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!(window as any).ReactNativeWebView;
};

export const isApp = (): boolean => {
  return typeof window !== "undefined" && (window as any).ReactNativeWebView;
};
