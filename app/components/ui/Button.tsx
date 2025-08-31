"use client";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
type ButtonVariants = "primary" | "secondary" | "tertiary";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "small" | "medium" | "large";
  variant: ButtonVariants;
  text: string;
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

export default function Button({
  size,
  variant,
  text,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = clsx(
    "rounded transition-colors duration-200",
    ButtonSizes[size],
    ButtonVariantsStyles[variant],
    className
  );
  return (
    <button className={baseStyles} {...props}>
      {text}
    </button>
  );
}
