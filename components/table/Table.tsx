import React, { forwardRef } from "react";
import clsx from "clsx";
export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
};

export const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  (
    { striped, hover, bordered, compact, className, children, ...rest },
    ref,
  ) => {
    return (
      <table
        ref={ref}
        className={clsx(
          "w-full border-collapse text-sm",
          bordered && "border",
          striped && "[&>tbody>tr:nth-child(even)]:bg-gray-100",
          hover && "[&>tbody>tr:hover]:bg-accent/5",
          compact && "[&>thead>tr>th]:py-2 [&>tbody>tr>td]:py-2",
          className,
        )}
        {...rest}
      >
        {children}
      </table>
    );
  },
);

TableRoot.displayName = "Table";
