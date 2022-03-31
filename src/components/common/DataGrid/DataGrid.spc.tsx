import React from "react";
import { render } from "enzyme";
import { DataGrid } from "./DataGrid";

const DataGridMock = jest.fn();

jest.mock("styled-components", () => (component: any) => () => {
  return component;
});

jest.mock("@nuvolo/nuux/components/NuvoDataGrid", () => ({
  NuvoDataGrid: (props: any): JSX.Element => {
    DataGridMock(props);
    return <span>NuvoDataGrid</span>;
  },
}));

describe("@components/common/DataGrid", () => {
  const children = [
    <div key="1">I am a child</div>,
    <div key="2">Me too!</div>,
  ];

  afterEach(() => {
    DataGridMock.mockClear();
  });

  it("with configName", async () => {
    render(<DataGrid configName="test-config-key">{children}</DataGrid>);

    expect(DataGridMock).toHaveBeenCalledWith({
      children,
      stateStoring: {
        enabled: true,
        storageKey: "test-config-key",
      },
    });
  });

  it("without configName", async () => {
    render(<DataGrid>{children}</DataGrid>);

    expect(DataGridMock).toHaveBeenCalledWith({
      children,
      stateStoring: {
        enabled: false,
        storageKey: undefined,
      },
    });
  });
});
