import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBurgers } from "src/services/BurgerService";
import { burgersState } from "src/store/burgersSlice";
import { PreLoader } from "src/nuvolo/nuux/components/NuvoLoader";
import { DataGrid } from "@components/common/DataGrid/DataGrid";
import { BURGERS_COLUMN_CONFIG } from "@utils/constants";
import {
  Column,
  Pager,
  Paging,
  Sorting,
} from "@nuvolo/nuux/components/NuvoDataGrid";
import { ColumnParams } from "src/types/columnParams";
import { Burger } from "src/types/Burger";
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";
import { Col, Container, Row } from "react-bootstrap";
import { CreateBurger } from "./CreateBurger";
import { UpdateBurger } from "./UpdateBurger";

function renderTitleHeader(data: any) {
  return <div style={{ whiteSpace: "pre-wrap" }}>{data.column.caption}</div>;
}

export const AllBurgers = (): JSX.Element => {
  const { burgers } = useSelector(burgersState);
  const dispatch = useDispatch();

  const [createBurger, setCreateBurger] = useState(false);
  const [editBurger, setEditBurger] = useState(false);
  const editPayload = useRef({} as Burger);

  useEffect(() => {
    dispatch(getBurgers());
  }, []);

  const defaultDataGridOptions = {
    column: {
      allowResizing: false,
      allowReordering: false,
    },
    sorting: {
      sortingMode: "multiple",
    },
  };

  const columnMap: Array<ColumnParams> = [
    // {
    //   columnName: "sorting_date",
    //   columnLabel: "Payment Date",
    //   translate_key: "RE_PAYMENT_LIST_COLUMN_PAYMENT_DATE",
    //   columnType: "date",
    //   groupIndex: 0,
    //   visible: false,
    //   showInColumnChooser: false,
    // },
    {
      columnName: "sys_id",
      columnLabel: "Id",
      columnType: "string",
      visible: false,
    },
    {
      columnName: "name",
      columnLabel: "Name",
      columnType: "string",
      visible: true,
    },
    {
      columnName: "list_price",
      columnLabel: "Price",
      columnType: "number",
      visible: true,
    },
    {
      columnName: "currency",
      columnLabel: "Currency",
      columnType: "string",
      visible: true,
    },
    {
      columnName: "quantity",
      columnLabel: "Quantity",
      columnType: "number",
      visible: true,
    },
  ];

  const onAddNewClick = () => {
    setCreateBurger(true);
  };

  const onRowClick = (e: any) => {
    editPayload.current = {
      ...e.data,
    };
    setEditBurger(true);
  };

  const refreshList = useCallback(() => {
    dispatch(getBurgers());
  }, []);

  return (
    <>
      <PreLoader mode="page" isLoading={!burgers}>
        <div style={{ margin: "1rem" }}>
          <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            <Container
              style={{
                width: "100%",
                maxWidth: "100%",
                margin: "0",
                padding: "0",
              }}
            >
              <Row style={{ margin: "0" }}>
                <Col style={{ textAlign: "left" }}>
                  <h1>All Burgers</h1>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <NuvoButton label="Add New" onClick={onAddNewClick} />
                </Col>
              </Row>
            </Container>
          </div>
          <DataGrid
            keyExpr="sys_id"
            dataSource={burgers}
            showColumnLines
            showRowLines
            columnAutoWidth
            allowColumnReordering
            onRowClick={onRowClick}
            // selection={{
            //   mode: "none",
            //   deferred: true,
            //   showCheckBoxesMode: "none",
            // }}
            configName={BURGERS_COLUMN_CONFIG}
            height="100%"
          >
            <Sorting
              mode={
                defaultDataGridOptions.sorting.sortingMode
                  ? defaultDataGridOptions.sorting.sortingMode
                  : "none"
              }
            />
            {columnMap.map((c, index) => (
              <Column
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                caption={c.columnLabel}
                dataField={c.columnName}
                dataType={c.columnType}
                visible={c.visible}
                // format={c.format}
                // cssClass={c.cssClass}
                // alignment={c.alignment}
                // width={c.width}
                headerCellRender={renderTitleHeader}
              />
            ))}
            <Paging defaultPageSize={10} />
            <Pager showPageSizeSelector allowedPageSizes={[10, 20, 50, 100]} />
          </DataGrid>
          <CreateBurger open={createBurger} setOpen={setCreateBurger} />
          <UpdateBurger
            refreshList={refreshList}
            open={editBurger}
            setOpen={setEditBurger}
            payload={editPayload}
          />
        </div>
      </PreLoader>
    </>
  );
};
