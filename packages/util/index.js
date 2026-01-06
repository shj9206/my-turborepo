"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQueryString = exports.cn = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
/**
 * 클래스명을 결합하는 유틸리티 함수 (Tailwind CSS 클래스 병합 지원)
 */
const cn = (...inputs) => {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
};
exports.cn = cn;
/**
 * URL 파라미터를 쿼리 스트링으로 변환
 * @param {Object} params - URL 파라미터 객체
 * @returns {string} 쿼리 스트링
 */
const buildQueryString = (params) => {
    return Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
};
exports.buildQueryString = buildQueryString;
