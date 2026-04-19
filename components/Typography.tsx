/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ElementType, forwardRef } from "react";
import clsx from "clsx";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

type Align = "inherit" | "left" | "center" | "right" | "justify";

type Color =
  | "initial"
  | "inherit"
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "text.primary"
  | "text.secondary"
  | "text.disabled";

type FontWeight = "light" | "regular" | "medium" | "semibold" | "bold";

type TypographyOwnProps = {
  variant?: Variant;
  component?: ElementType;
  align?: Align;
  color?: Color;
  gutterBottom?: boolean;
  noWrap?: boolean;
  fontWeight?: FontWeight;
  className?: string;
  children?: React.ReactNode;
};

type TypographyProps<C extends ElementType> = TypographyOwnProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof TypographyOwnProps> & {
    component?: C;
  };

type TypographyComponent = <C extends ElementType = "p">(
  props: TypographyProps<C> & {
    ref?: React.Ref<Element>;
  },
) => React.ReactElement | null;

const variantClasses: Record<Variant, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  h5: "text-lg font-semibold",
  h6: "text-base font-semibold",
  subtitle1: "text-base font-medium",
  subtitle2: "text-sm font-medium",
  body1: "text-base",
  body2: "text-sm",
  caption: "text-xs",
  overline: "text-xs uppercase tracking-wider",
};

const alignClasses: Record<Align, string> = {
  inherit: "",
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const colorClasses: Record<Color, string> = {
  // No color applied — inherits from parent or browser default
  initial: "",
  // Inherit color from parent element
  inherit: "text-inherit",
  // Theme semantic colors — map to CSS var tokens from themes.css
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  muted: "text-muted",
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  // Content hierarchy — relative to current background (--color-foreground)
  "text.primary": "text-foreground",
  "text.secondary": "text-foreground/70",
  "text.disabled": "text-foreground/40",
};

const fontWeightClasses: Record<FontWeight, string> = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const defaultComponentByVariant: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "p",
  subtitle2: "p",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
};

export const Typography = forwardRef(
  <C extends ElementType = "p">(
    {
      variant = "body1",
      component,
      align = "inherit",
      color = "initial",
      gutterBottom = false,
      noWrap = false,
      fontWeight,
      className,
      children,
      ...rest
    }: TypographyProps<C>,
    ref: React.Ref<Element>,
  ) => {
    const Component = component || defaultComponentByVariant[variant] || "p";
    return (
      <Component
        ref={ref}
        className={clsx(
          variantClasses[variant],
          alignClasses[align],
          colorClasses[color],
          fontWeight && fontWeightClasses[fontWeight],
          gutterBottom && "mb-2",
          noWrap && "whitespace-nowrap overflow-hidden text-ellipsis",
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";