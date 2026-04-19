/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ElementType, forwardRef, type Ref } from "react";
import clsx from "clsx";
import { type PolymorphicProps } from "@/types/polymorphic";

type Variant = "contained" | "outlined" | "text";
type Size = "small" | "medium" | "large";
type Color = "primary" | "secondary" | "error" | "success" | "inherit";

const baseClasses =
  "relative overflow-hidden inline-flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed";

const sizeClasses: Record<Size, string> = {
  small: "text-sm px-3 py-1.5",
  medium: "text-sm px-4 py-2",
  large: "text-base px-6 py-3",
};

const containedColors: Record<Color, string> = {
  primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary",
  error: "bg-error text-white hover:bg-error/90 focus:ring-error",
  success: "bg-success text-white hover:bg-success/90 focus:ring-success",
  inherit: "bg-inherit text-inherit hover:bg-black/10 focus:ring-gray-500",
};

const outlinedColors: Record<Color, string> = {
  primary:
    "border border-primary text-primary hover:bg-primary/10 focus:ring-primary",
  secondary:
    "border border-secondary text-secondary hover:bg-secondary/10 focus:ring-secondary",
  error: "border border-error text-error hover:bg-error/10 focus:ring-error",
  success:
    "border border-success text-success hover:bg-success/10 focus:ring-success",
  inherit:
    "border border-current text-inherit hover:bg-black/5 focus:ring-gray-500",
};

const textColors: Record<Color, string> = {
  primary: "text-primary hover:bg-primary/10 focus:ring-primary",
  secondary: "text-secondary hover:bg-secondary/10 focus:ring-secondary",
  error: "text-error hover:bg-error/10 focus:ring-error",
  success: "text-success hover:bg-success/10 focus:ring-success",
  inherit: "text-inherit hover:bg-black/5 focus:ring-gray-500",
};

const radiusMap: Record<string, string> = {
  xs: "rounded-xs",
  md: "rounded-md",
  sm: "rounded-sm",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  color?: Color;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: keyof typeof radiusMap;
  disableRipple?: boolean;
  disableRing?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

type ButtonComponent = <C extends ElementType = "button">(
  props: PolymorphicProps<C, ButtonOwnProps> & {
    ref?: React.Ref<Element>;
  },
) => React.ReactElement | null;

export const Button = forwardRef(
  <C extends ElementType = "button">(
    {
      component,
      variant = "contained",
      size = "medium",
      color = "primary",
      rounded = "md",
      loading = false,
      disabled = false,
      fullWidth = false,
      startIcon,
      endIcon,
      className,
      children,
      disableRipple = false,
      disableRing = false,
      ...rest
    }: PolymorphicProps<C, ButtonOwnProps>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const Component = component || "button";

    const isDisabled = disabled || loading;

    const variantClass =
      variant === "contained"
        ? containedColors[color]
        : variant === "outlined"
          ? outlinedColors[color]
          : textColors[color];

    const radiusClass = radiusMap[rounded];

    return (
      <Component
        ref={ref as unknown as Ref<HTMLButtonElement>}
        disabled={Component === "button" ? isDisabled : undefined}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          rest.onClick?.(e);
        }}
        className={clsx(
          baseClasses,
          sizeClasses[size],
          variantClass,
          radiusClass,
          !disableRing && "focus:outline-none focus:ring-2 focus:ring-offset-2",
          fullWidth && "w-full",
          !disableRipple &&
            "before:absolute before:inset-0 before:opacity-0 before:bg-white/20 active:before:opacity-100",
          className,
        )}
        {...rest}
      >
        {loading && (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        )}

        {!loading && startIcon && (
          <span className="flex items-center">{startIcon}</span>
        )}

        {children && <span>{children}</span>}

        {!loading && endIcon && (
          <span className="flex items-center">{endIcon}</span>
        )}
      </Component>
    );
  },
) as ButtonComponent;

(Button as any).displayName = "Button";
