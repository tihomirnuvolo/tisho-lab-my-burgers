import { NuvoMessageProvider } from "@nuvolo/nuux/types/services";
import { IColumnProps } from "devextreme-react/data-grid";

export interface ColumnParams {
  translate_key?: string;
  columnName: string;
  columnLabel: string;
  columnType?: string;
  visible: boolean;
  cssClass?: string;
  format?: any;
  alignment?: string;
  encodeHtml?: boolean;
  groupIndex?: number;
  calculateCellValue?: Function;
  editorOptions?: any;
  showInColumnChooser?: boolean;
  allowHiding?: boolean;
  filterOperations?: string[];
  lookup?: any;
  editCellComponent?: any;
  cellRender?: any;
  width?: string;
}

export interface ColumnsRendererParams {
  msg: NuvoMessageProvider;
  columnMap: ColumnParams[];
  handleDelete: Function;
  hasDeleteColumn?: boolean;
  options?: (c: ColumnParams) => IColumnProps;
}
