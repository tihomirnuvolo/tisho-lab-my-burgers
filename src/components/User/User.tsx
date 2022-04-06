import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PreLoader } from "src/nuvolo/nuux/components/NuvoLoader";
import {
  Column,
  NuvoDataGrid,
  Pager,
  Paging,
} from "@nuvolo/nuux/components/NuvoDataGrid";
import { ColumnParams } from "src/types/columnParams";
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";
import { Col, Container, Row } from "react-bootstrap";
import { userState } from "src/store/userSlice";
import { Wallet } from "src/types/Wallet";

function renderTitleHeader(data: any) {
  return <div style={{ whiteSpace: "pre-wrap" }}>{data.column.caption}</div>;
}

export const User = (): JSX.Element => {
  const { user } = useSelector(userState);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [createWallet, setCreateWallet] = useState(false);
  const [editWallet, setEditWallet] = useState(false);
  const editPayload = useRef({} as Wallet);

  const columnMap: Array<ColumnParams> = [
    {
      columnName: "sys_id",
      columnLabel: "Id",
      columnType: "string",
      visible: false,
    },
    {
      columnName: "balance",
      columnLabel: "Balance",
      columnType: "number",
      visible: true,
      alignment: "left",
      format: { precision: 2, type: "fixedPoint" },
    },
    {
      columnName: "currency",
      columnLabel: "Wallet Currency",
      columnType: "string",
      visible: true,
      alignment: "left",
    },
    {
      columnName: "ref_balance",
      columnLabel: "Balance (USD)",
      columnType: "number",
      visible: true,
      alignment: "left",
      format: { precision: 2, type: "fixedPoint" },
    },
  ];

  const onAddNewClick = () => {
    setCreateWallet(true);
  };

  const onRowClick = (e: any) => {
    editPayload.current = {
      ...e.data,
    };
    setEditWallet(true);
  };

  return (
    <>
      <PreLoader mode="page" isLoading={!user || isLoading}>
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
            dataSource={user?.wallets}
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
                alignment={c.alignment}
                format={c.format}
                headerCellRender={renderTitleHeader}
              />
            ))}
            <Paging defaultPageSize={10} />
            <Pager showPageSizeSelector allowedPageSizes={[10, 20, 50, 100]} />
          </NuvoDataGrid>
          {/* <CreateBurger
            open={createWallet}
            setOpen={setCreateBurger}
            setIsLoading={setIsLoading}
          />
          <UpdateBurger
            open={editBurger}
            setOpen={setEditBurger}
            payload={editPayload}
            setIsLoading={setIsLoading}
          /> */}
        </div>
      </PreLoader>
    </>
  );
};
