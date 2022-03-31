import React from "react";
import { Column, Button } from "@nuvolo/nuux/components/NuvoDataGrid";
import { ColumnParams, ColumnsRendererParams } from "src/types/columnParams";
import { getMessage } from "@utils/messages";

export const renderColumnsCollection = (props: ColumnsRendererParams) => {
  const { msg, columnMap, handleDelete, hasDeleteColumn, options } = props;

  return columnMap.map((c: ColumnParams) => {
    if (c.columnName === "delete" && !hasDeleteColumn) {
      return null;
    }

    if (c.columnName === "delete") {
      return (
        <Column
          allowHiding={false}
          key={c.columnName}
          groupIndex={c.groupIndex}
          caption=""
          dataField={c.columnName}
          type="buttons"
          visible
          alignment={c.alignment}
          allowGrouping={false}
          showInColumnChooser={c.showInColumnChooser ?? true}
        >
          <Button name="delete" onClick={handleDelete} />
        </Column>
      );
    }

    const params = options ? options(c) : {};
    return (
      <Column
        key={c.columnName}
        dataField={c.columnName}
        dataType={c.columnType}
        visible={c.visible}
        format={c.format}
        cssClass={c.cssClass}
        caption={getMessage(msg, c.translate_key || "")}
        {...params}
      />
    );
  });
};
