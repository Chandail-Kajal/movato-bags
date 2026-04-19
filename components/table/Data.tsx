import clsx from "clsx";
import { forwardRef } from "react";

type DataProps = React.ThHTMLAttributes<HTMLTableCellElement> &
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    header?: boolean;
  };

export const Data = forwardRef<HTMLTableCellElement, DataProps>(
  ({ header, className, ...rest }, ref) => {
    const Component = header ? "th" : "td";

    return (
      <Component
        ref={ref}
        className={clsx("px-4 py-3", header && "font-semibold", className)}
        {...rest}
      />
    );
  }
);

Data.displayName = "Table.Data";