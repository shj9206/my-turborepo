/**
 * Tailwind CSS 커스텀 컬러 팔레트
 *
 * 이 파일은 프로젝트 전체에서 사용하는 색상을 중앙에서 관리합니다.
 * Tailwind config와 TypeScript 코드 모두에서 import하여 사용할 수 있습니다.
 */

export type ColorShade = {
  10?: string;
  20?: string;
  30?: string;
  40?: string;
  50?: string;
  60?: string;
  70?: string;
  80?: string;
  90?: string;
  100?: string;
};

export interface ColorPalette extends Record<string, ColorShade> {
  red: ColorShade;
  orange: ColorShade;
  yellow: ColorShade;
  lime: ColorShade;
  green: ColorShade;
  teal: ColorShade;
  turquo: ColorShade;
  aqua: ColorShade;
  blue: ColorShade;
  pink: ColorShade;
  purple: ColorShade;
  gray: ColorShade;
}

/**
 * 커스텀 Red 컬러 (Red)
 */
export const red: ColorShade = {
  10: "#FCF3F2",
  20: "#FADCD9",
  30: "#FABBB4",
  40: "#FC9086",
  50: "#FA5343",
  60: "#D91F11",
  70: "#A1160A",
  80: "#75160C",
  90: "#4F150F",
  100: "#24120C",
};

/**
 * 커스텀 Orange 컬러 (Orange)
 */
export const orange: ColorShade = {
  10: "#FCF2EB",
  20: "#FCDDC7",
  30: "#FCBC97",
  40: "#FC9162",
  50: "#EF743C",
  60: "#CF5B16",
  70: "#9E3917",
  80: "#72321B",
  90: "#4B271B",
  100: "#281914",
};

/**
 * 커스텀 Yellow 컬러 (Yellow)
 */
export const yellow: ColorShade = {
  10: "#FAF6CF",
  20: "#F7E379",
  30: "#F5C518",
  40: "#D9A514",
  50: "#B3870E",
  60: "#946613",
  70: "#70491C",
  80: "#54341F",
  90: "#38251B",
  100: "#1C1613",
};

/**
 * 커스텀 Lime 컬러 (Lime)
 */
export const lime: ColorShade = {
  10: "#EBF7DA",
  20: "#D5F0B1",
  30: "#AAD971",
  40: "#78BF39",
  50: "#52A31D",
  60: "#3C7D0E",
  70: "#2E5C0E",
  80: "#254211",
  90: "#1C2E10",
  100: "#12190D",
};

/**
 * 커스텀 Green 컬러 (Green)
 */
export const green: ColorShade = {
  10: "#EBF7ED",
  20: "#C7EBD1",
  30: "#88DB18",
  40: "#43C478",
  50: "#16A163",
  60: "#077D55",
  70: "#075E45",
  80: "#094536",
  90: "#092E25",
  100: "#081A15",
};

/**
 * 커스텀 Teal 컬러 (Teal)
 */
export const teal: ColorShade = {
  10: "#EBF5F4",
  20: "#BEEB37",
  30: "#86D9D4",
  40: "#4EBFB9",
  50: "#279C9C",
  60: "#167B7D",
  70: "#155CSE",
  80: "#124241",
  90: "#102E2D",
  100: "#0C1A19",
};

/**
 * 커스텀 Turquoise 컬러 (Turquoise)
 */
export const turquo: ColorShade = {
  10: "#EBF5F4",
  20: "#C738ED",
  30: "#80D8E5",
  40: "#45BCD1",
  50: "#159AB2",
  60: "#067A91",
  70: "#09596B",
  80: "#0C424C",
  90: "#102D33",
  100: "#0F181A",
};

/**
 * 커스텀 Aqua 컬러 (Aqua)
 */
export const aqua: ColorShade = {
  10: "#EBF3F7",
  20: "#C9E6F5",
  30: "#8AD3F7",
  40: "#48B8F0",
  50: "#1194D6",
  60: "#0073BA",
  70: "#08548A",
  80: "#0E3D66",
  90: "#0C2B45",
  100: "#0B1724",
};

/**
 * 커스텀 Blue 컬러 (Blue)
 */
export const blue: ColorShade = {
  10: "#F0F4FA",
  20: "#D4E4FA",
  30: "#ADCCF7",
  40: "#75B1FF",
  50: "#3D8DF5",
  60: "#186ADE",
  70: "#0D4EA6",
  80: "#103A75",
  90: "#11294D",
  100: "#0D1826",
};

/**
 * 커스텀 Pink 컬러 (Pink)
 */
export const pink: ColorShade = {
  10: "#FCF0F8",
  20: "#F7DAED",
  30: "#F7B7E2",
  40: "#FA87D4",
  50: "#ED4CB7",
  60: "#CC1D92",
  70: "#961574",
  80: "#6B155A",
  90: "#47153F",
  100: "#241020",
};

/**
 * 커스텀 Purple 컬러 (Purple)
 */
export const purple: ColorShade = {
  10: "#F7F2FC",
  20: "#EADCFC",
  30: "#DABEFA",
  40: "#C89AFC",
  50: "#AC71F0",
  60: "#8F49DE",
  70: "#6B30AB",
  80: "#4C277D",
  90: "#331F4D",
  100: "#1C1229",
};

/**
 * 커스텀 Gray 컬러 (Gray)
 */
export const gray: ColorShade = {
  10: "#F5F5F5",
  20: "#E0E0E0",
  30: "#C6C6C6",
  40: "#A8A8A8",
  50: "#8D8D8D",
  60: "#6B6B6B",
  70: "#515152",
  80: "#393939",
  90: "#252525",
  100: "#161616",
};

/**
 * 전체 컬러 팔레트 객체
 * Tailwind config에서 직접 사용할 수 있습니다.
 */
export const colors: ColorPalette = {
  red,
  orange,
  yellow,
  lime,
  green,
  teal,
  turquo,
  aqua,
  blue,
  pink,
  purple,
  gray,
};

export default colors;
