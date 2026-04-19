import React from "react";
import { clsx } from "clsx";
import { Typography } from "../Typography";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { Select } from "../forms/Select";
import { Button } from "../Button";

type PaginationProps = {
  page: number;
  totalPages: number;

  rowsPerPage: number;
  rowsPerPageOptions?: number[];

  onChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;

  className?: string;
  children?: React.ReactNode;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 20, 50],
  onChange,
  onRowsPerPageChange,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "flex gap-3 items-center justify-between p-4 border-t border-border",
        className,
      )}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Select
            width={120}
            onChange={(value: string) => {
              onRowsPerPageChange?.(Number(value));
            }}
            value={String(rowsPerPage)}
            options={rowsPerPageOptions.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (v) => ({ label: `${v} Rows`, value: `${v}` }) as any,
            )}
          />
        </div>

        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <Button
          rounded="full"
          size="small"
          disableRing
          disableRipple
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          <CgChevronLeft size={20} />
        </Button>
        <Typography>
          {page} / {totalPages}
        </Typography>
        <Button
          rounded="full"
          size="small"
          disableRipple
          disableRing
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          <CgChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};
