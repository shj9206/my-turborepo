export const Footer = () => {
  return (
    <footer className="w-full flex flex-col p-6 bg-gray-100  gap-4 justify-center items-center">
      <span className="text-sm text-black font-bold">준스코프</span>
      <div className="flex flex-col gap-1 items-center">
        <span className="text-xs text-gray-500">대표자 : 송화준</span>
        <span className="text-xs text-gray-500">사업자등록 : 175-22-01436</span>
        <span className="text-xs text-gray-500">전호번호 : 010-3800-5898</span>
        <span className="text-xs text-gray-500">
          이메일 : shj9206@gmail.com
        </span>
        <span className="text-xs text-gray-500">
          주소 : 서울특별시 강서구 등촌동 660-5
        </span>
        <span className="text-xs text-gray-500">
          Copyright 2025. 준스코프. All rights reserved.
        </span>
      </div>
    </footer>
  );
};
