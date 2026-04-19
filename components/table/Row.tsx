import clsx from "clsx";
import { forwardRef } from "react";

export const Row = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...rest }, ref) => (
  <tr
    ref={ref}
    className={clsx("border-b border-border last:border-0", className)}
    {...rest}
  />
));

Row.displayName = "Table.Row";