/**
 * Tailwind CSS 커스텀 컬러 팔레트
 *
 * 이 파일은 프로젝트 전체에서 사용하는 색상을 중앙에서 관리합니다.
 * Tailwind config와 TypeScript 코드 모두에서 import하여 사용할 수 있습니다.
 */

import { ColorShade, ColorPalette } from "./interface";
import * as colorsData from "./data";

/**
 * TypeScript 타입이 적용된 개별 색상 export
 */
export const red: ColorShade = colorsData.red;
export const orange: ColorShade = colorsData.orange;
export const yellow: ColorShade = colorsData.yellow;
export const lime: ColorShade = colorsData.lime;
export const green: ColorShade = colorsData.green;
export const teal: ColorShade = colorsData.teal;
export const turquo: ColorShade = colorsData.turquo;
export const aqua: ColorShade = colorsData.aqua;
export const blue: ColorShade = colorsData.blue;
export const pink: ColorShade = colorsData.pink;
export const purple: ColorShade = colorsData.purple;
export const gray: ColorShade = colorsData.gray;

/**
 * 전체 컬러 팔레트 객체
 * Tailwind config에서 직접 사용할 수 있습니다.
 */
export const colors: ColorPalette = colorsData.colors as ColorPalette;

export default colors;
