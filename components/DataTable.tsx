"use client"

import { Table } from "./table";
import React from "react";
import clsx from "clsx";

export type Column<T, K extends keyof T = keyof T> = {
  label: string;
  dataIndex?: K;
  render?: (value: T[K], row: T, index: number) => React.ReactNode;
  sort?: boolean;
  className?: string;
  width?: string | number;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  title?: string;

  pagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalRows?: number;
  rowsPerPage?: number;

  onNext?: () => void;
  onPrev?: () => void;
  onSort?: (column: keyof T) => void;
  onRowsPerPageChange?: (value: number) => void;

  className?: string;
};

export function DataTable<T extends object>({
  columns,
  data,
  title,
  pagination,
  currentPage = 1,
  totalPages = 1,
  onNext,
  onPrev,
  onSort,
  rowsPerPage,
  onRowsPerPageChange,
  className,
}: DataTableProps<T>) {
  return (
    <div
      className={clsx(
        "flex flex-col w-full h-full max-h-screen overflow-hidden rounded-lg shadow-md border border-border",
        className,
      )}
    >
      {title && (
        <div className="shrink-0 p-4 border-b font-semibold text-lg">
          {title}
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Table hover className="w-full border-separate border-spacing-0">
          <Table.Head className="sticky top-0 py-1 z-10 shadow-sm bg-primary/15">
            <Table.Row>
              {columns.map((col, index) => (
                <Table.Data
                  key={index}
                  header
                  className={clsx(
                    "cursor-pointer select-none border-b border-border py-3 px-4",
                    col.sort && "hover:bg-primary/30",
                    col.className,
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() =>
                    col.sort && col.dataIndex && onSort?.(col.dataIndex)
                  }
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sort && <span className="text-xs opacity-60">↕</span>}
                  </div>
                </Table.Data>
              ))}
            </Table.Row>
          </Table.Head>

          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <Table.Row>
                <Table.Data
                  colSpan={columns.length}
                  className="text-center flex-1 py-10 opacity-60"
                >
                  No data available
                </Table.Data>
              </Table.Row>
            ) : (
              data.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <Table.Data
                      key={colIndex}
                      className={clsx("px-4 py-3", col.className)}
                    >
                      {col.render
                        ? col.render(row[col.dataIndex!], row, rowIndex)
                        : col.dataIndex
                          ? (row[col.dataIndex] as React.ReactNode)
                          : null}
                    </Table.Data>
                  ))}
                </Table.Row>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {pagination && (
        <div className="">
          <Table.Pagination
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            page={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage as number}
            onRowsPerPageChange={(val) => onRowsPerPageChange?.(val)}
            onChange={(page) => {
              if (page > currentPage) onNext?.();
              else onPrev?.();
            }}
          />
        </div>
      )}
    </div>
  );
}
