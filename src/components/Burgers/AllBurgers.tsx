import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBurgers } from "src/services/BurgerService";
import { burgersState } from "src/store/burgersSlice";
import { PreLoader } from "src/nuvolo/nuux/components/NuvoLoader";
import {
  Column,
  NuvoDataGrid,
  Pager,
  Paging,
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

  const [isLoading, setIsLoading] = useState(false);
  const [createBurger, setCreateBurger] = useState(false);
  const [editBurger, setEditBurger] = useState(false);
  const editPayload = useRef({} as Burger);

  useEffect(() => {
    dispatch(getBurgers());
  }, []);

  const columnMap: Array<ColumnParams> = [
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

  return (
    <>
      <PreLoader mode="page" isLoading={!burgers || isLoading}>
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
          <NuvoDataGrid
            keyExpr="sys_id"
            dataSource={burgers}
            showBorders
            showColumnLines
            showRowLines
            columnAutoWidth
            onRowClick={onRowClick}
          >
            {columnMap.map((c, index) => (
              <Column
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                caption={c.columnLabel}
                dataField={c.columnName}
                dataType={c.columnType}
                visible={c.visible}
                headerCellRender={renderTitleHeader}
              />
            ))}
            <Paging defaultPageSize={10} />
            <Pager showPageSizeSelector allowedPageSizes={[10, 20, 50, 100]} />
          </NuvoDataGrid>
          <CreateBurger
            open={createBurger}
            setOpen={setCreateBurger}
            setIsLoading={setIsLoading}
          />
          <UpdateBurger
            open={editBurger}
            setOpen={setEditBurger}
            payload={editPayload}
            setIsLoading={setIsLoading}
          />
        </div>
      </PreLoader>
    </>
  );
};
