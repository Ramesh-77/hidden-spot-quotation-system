"use client";
import clsx from "clsx";
type ButtonVariants = "primary" | "secondary" | "tertiary";
interface ButtonProps {
  size: "small" | "medium" | "large";
  variant: ButtonVariants;
  text: string;
  onClick: () => void;
}
const ButtonSizes = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};
const ButtonVariantsStyles = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  tertiary:
    "bg-transparent text-blue-500 hover:bg-blue-600 border border-blue-500",
};

export default function Button(props: ButtonProps) {
  const baseStyles = clsx(
    "rounded",
    ButtonSizes[props.size],
    ButtonVariantsStyles[props.variant]
  );
  return (
    <button className={baseStyles} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
