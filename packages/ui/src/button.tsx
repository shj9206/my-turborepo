import React from "react";

import "./button.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button text when no children provided */
  label?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional children to render inside button */
  children?: React.ReactNode;
  /** Optional app name (for downstream consumers) */
  appName?: string;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  children,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {children ?? label}
    </button>
  );
};
