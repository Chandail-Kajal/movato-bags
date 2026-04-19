import { Data } from "./Data";
import { Head } from "./Head";
import { Pagination } from "./Pagination";
import { Row } from "./Row";
import { TableRoot, type TableProps } from "./Table";
type TableComponent = React.ForwardRefExoticComponent<
  TableProps & React.RefAttributes<HTMLTableElement>
> & {
  Row: typeof Row;
  Head: typeof Head;
  Data: typeof Data;
  Pagination: typeof Pagination;
};

export const Table= Object.assign(TableRoot, {
  Row,
  Head,
  Data,
  Pagination,
}) as TableComponent;
