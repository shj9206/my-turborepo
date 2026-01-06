export interface ColorShade  {
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
  
  export interface ColorPalette {
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
    [key: string]: ColorShade;
  }