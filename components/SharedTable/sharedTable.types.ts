import { IRecruitersList, ITechStackList } from "@/common/types";
import { ChangeEvent } from "react";

export interface ISharedTableProps {
  searchValue: string;
  emptyStateImage: string;
  emptyStateMessage: string;
  handleSearch: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  clearSearch: () => void;
  isLoading: boolean;
  tableData: ITechStackList[] | IRecruitersList[];
  hasNextPage: boolean;
  handlePageChange: () => void;
  isRecruiter?: boolean;
  handleStatusChange?: (data: IRecruitersList) => void;
  tableHeader: any[];
  onDataChange: (data: any[]) => void;
}
