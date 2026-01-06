import { cn } from "@repo/util";
import { IIconProps } from "./interface";

const iconComponents = {
  check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      className={cn(props.className)}
    >
      <mask
        id="check_mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="2"
        width="16"
        height="13"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.6719 3.0679C16.1142 3.51888 16.1076 4.24353 15.6573 4.68646L6.12963 14.0582L0.342035 8.36536C-0.108264 7.92243 -0.114782 7.19778 0.327475 6.7468C0.769733 6.29581 1.49329 6.28928 1.94359 6.73221L6.12963 10.8497L14.0558 3.05331C14.5061 2.61039 15.2296 2.61691 15.6719 3.0679Z"
          fill="white"
        />
      </mask>
      <g mask="url(#check_mask)">
        <rect width="16" height="16" fill="currentColor" />
      </g>
    </svg>
  ),
  fill: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" />
    </svg>
  ),
  star: (props: React.SVGProps<SVGSVGElement>) => {
    const pathData =
      "M19.3537 6.72533L13.358 5.85397L10.6778 0.420341C10.6046 0.271572 10.4842 0.15114 10.3354 0.0779356C9.96232 -0.106255 9.50893 0.0472372 9.32237 0.420341L6.64216 5.85397L0.64652 6.72533C0.48122 6.74895 0.33009 6.82687 0.21438 6.94494C0.0744935 7.08872 -0.00259026 7.28216 6.64643e-05 7.48274C0.00272319 7.68332 0.0849031 7.87464 0.228548 8.01467L4.56648 12.244L3.54162 18.216C3.51759 18.3549 3.53296 18.4978 3.586 18.6284C3.63903 18.7591 3.72761 18.8722 3.84168 18.9551C3.95576 19.0379 4.09076 19.0871 4.23139 19.0972C4.37202 19.1072 4.51264 19.0776 4.63732 19.0118L10.0001 16.1923L15.3629 19.0118C15.5093 19.0897 15.6793 19.1157 15.8423 19.0874C16.2531 19.0165 16.5294 18.6269 16.4586 18.216L15.4337 12.244L19.7717 8.01467C19.8897 7.89896 19.9677 7.74783 19.9913 7.58253C20.055 7.16928 19.7669 6.78673 19.3537 6.72533Z";

    const className = props.className || "";
    let strokeWidth = 2;
    if (className.includes("stroke-0")) {
      strokeWidth = 0;
    } else {
      const match = className.match(/stroke-\[(\d+(?:\.\d+)?)px?\]/);
      if (match && match[1]) {
        strokeWidth = parseFloat(match[1]);
      }
    }

    // stroke가 0이 아니면 두 개의 path 사용 (fill용과 stroke용)
    const hasStroke = strokeWidth > 0;

    // stroke 색상 결정 (stroke-blue-600 같은 클래스 확인)
    const strokeStyle: React.CSSProperties = {};
    if (className.includes("stroke-blue-600")) {
      strokeStyle.stroke = "rgb(37, 99, 235)"; // blue-600
    } else if (className.includes("stroke-blue-500")) {
      strokeStyle.stroke = "rgb(59, 130, 246)"; // blue-500
    }

    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className={props.className}
      >
        {/* Fill layer */}
        <path d={pathData} fill="currentColor" stroke="none" />
        {/* Stroke layer - 별 모양을 따라 테두리 */}
        {hasStroke && (
          <path
            d={pathData}
            fill="none"
            stroke={strokeStyle.stroke || "currentColor"}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={strokeStyle}
          />
        )}
      </svg>
    );
  },
  heart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path
        d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z"
        fill="currentColor"
      />
    </svg>
  ),
  search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <mask
        id="mask0_136_9995"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.42701 0.333313C3.06418 0.333313 0.333344 3.03771 0.333344 6.37954C0.333344 9.72137 3.06418 12.4258 6.42701 12.4258C7.68076 12.4258 8.847 12.0497 9.81629 11.405L13.7917 15.3476C14.2206 15.773 14.9149 15.773 15.3438 15.3476C15.7743 14.9207 15.7743 14.2274 15.3438 13.8005L11.3939 9.8831C12.1032 8.89485 12.5207 7.68529 12.5207 6.37954C12.5207 3.03771 9.78985 0.333313 6.42701 0.333313ZM2.53118 6.37954C2.53118 4.24976 4.2728 2.51853 6.42701 2.51853C8.58123 2.51853 10.3228 4.24976 10.3228 6.37954C10.3228 8.50932 8.58123 10.2405 6.42701 10.2405C4.2728 10.2405 2.53118 8.50932 2.53118 6.37954Z"
          fill="#006FFD"
        />
      </mask>
      <g mask="url(#mask0_136_9995)">
        <rect width="16" height="16" fill="currentColor" />
      </g>
    </svg>
  ),
  close: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevronDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
} as const;

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
} as const;

const Icon = ({ name, className, size = "md" }: IIconProps) => {
  const IconComponent = iconComponents[name] as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  return (
    <IconComponent
      className={cn(sizeClasses[size], className)}
      aria-hidden="true"
    />
  );
};

export { Icon };
