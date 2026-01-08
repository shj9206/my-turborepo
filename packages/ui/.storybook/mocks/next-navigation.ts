// Next.js navigation 모킹
export function useSearchParams() {
  return {
    get: (key: string) => {
      // URL에서 쿼리 파라미터를 읽어오거나 기본값 반환
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
      }
      return null;
    },
    has: (key: string) => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        return params.has(key);
      }
      return false;
    },
    getAll: (key: string) => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        return params.getAll(key);
      }
      return [];
    },
    keys: () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        return params.keys();
      }
      return [][Symbol.iterator]();
    },
    values: () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        return params.values();
      }
      return [][Symbol.iterator]();
    },
    entries: () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        return params.entries();
      }
      return [][Symbol.iterator]();
    },
    forEach: (callback: (value: string, key: string) => void) => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        params.forEach(callback);
      }
    },
    toString: () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        return params.toString();
      }
      return "";
    },
  };
}

export function useRouter() {
  return {
    push: (href: string) => {
      console.log("Router push:", href);
    },
    replace: (href: string) => {
      console.log("Router replace:", href);
    },
    refresh: () => {
      console.log("Router refresh");
    },
    back: () => {
      console.log("Router back");
    },
    forward: () => {
      console.log("Router forward");
    },
    prefetch: (href: string) => {
      console.log("Router prefetch:", href);
    },
  };
}

export function usePathname() {
  if (typeof window !== "undefined") {
    return window.location.pathname;
  }
  return "/";
}
