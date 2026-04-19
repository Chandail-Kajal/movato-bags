import clsx from "clsx";
import { forwardRef } from "react";

export const Head = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...rest }, ref) => (
  <thead
    ref={ref}
    className={clsx("bg-background text-left font-medium", className)}
    {...rest}
  />
));

Head.displayName = "Table.Head";
