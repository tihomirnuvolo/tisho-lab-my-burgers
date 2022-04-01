import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBurgers } from "src/services/BurgerService";
import { burgersState } from "src/store/burgersSlice";
import { PreLoader } from "src/nuvolo/nuux/components/NuvoLoader";
import { DataGrid } from "@components/common/DataGrid/DataGrid";
import { BURGERS_COLUMN_CONFIG } from "@utils/constants";
import { Pager, Paging, Sorting } from "@nuvolo/nuux/components/NuvoDataGrid";
import { renderColumnsCollection } from "@components/ColumnsRenderer";
import { ColumnParams } from "src/types/columnParams";
import { useNuvoMessages } from "@nuvolo/nuux/hooks";
import { Burger } from "src/types/Burger";
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";
import { Col, Container, Row } from "react-bootstrap";
import { CreateBurger } from "./CreateBurger";

export const AllBurgers = (): JSX.Element => {
  const msg = useNuvoMessages();
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
      // translate_key: "",
      columnType: "string",
      visible: false,
      allowHiding: false,
    },
    {
      columnName: "name",
      columnLabel: "Name",
      // translate_key: "",
      columnType: "string",
      visible: true,
      allowHiding: false,
    },
    {
      columnName: "list_price",
      columnLabel: "Price",
      // translate_key: "",
      columnType: "number",
      visible: true,
      allowHiding: false,
    },
    {
      columnName: "currency",
      columnLabel: "Currency",
      // translate_key: "",
      columnType: "string",
      visible: true,
      allowHiding: false,
    },
    {
      columnName: "quantity",
      columnLabel: "Quantity",
      // translate_key: "",
      columnType: "number",
      visible: true,
      allowHiding: false,
    },
  ];

  const onAddNewClick = () => {
    setCreateBurger(true);
  };

  return (
    <>
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
        <PreLoader mode="page" isLoading={!burgers}>
          <DataGrid
            keyExpr="sys_id"
            dataSource={burgers}
            showColumnLines
            showRowLines
            columnAutoWidth
            allowColumnReordering
            // onRowClick={onRowClick}
            selection={{
              mode: "none",
              deferred: true,
              showCheckBoxesMode: "none",
            }}
            configName={BURGERS_COLUMN_CONFIG}
            height="100%"
          >
            {/* <Grouping /> */}
            {/* <GroupPanel visible /> */}
            <Sorting
              mode={
                defaultDataGridOptions.sorting.sortingMode
                  ? defaultDataGridOptions.sorting.sortingMode
                  : "none"
              }
            />
            {renderColumnsCollection({
              msg,
              columnMap,
              handleDelete: () => {
                // do nothing
              },
              hasDeleteColumn: false,
              options: (c: ColumnParams) => ({
                // groupIndex: c.groupIndex,
                // alignment: c.alignment,
                allowGrouping: false,
                setCellValue: () => {
                  // do nothing
                },
                showInColumnChooser: c.showInColumnChooser ?? true,
                allowHiding: c.allowHiding ?? true,
              }),
            })}
            {/* <Template name="payementsTab" render={createPaymentIcon} />
          <Template name="download" render={downloadRender} /> */}
            <Paging defaultPageSize={10} />
            <Pager showPageSizeSelector allowedPageSizes={[10, 20, 50, 100]} />
          </DataGrid>
          <CreateBurger open={createBurger} setOpen={setCreateBurger} />
          {/* <UpdatePayment
          refreshList={refreshList}
          open={editPayment}
          setOpen={setEditPayment}
          payload={editPayload}
        /> */}
        </PreLoader>
      </div>
    </>
  );
};
