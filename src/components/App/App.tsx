import React from "react";
import styled from "styled-components";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NuvoAppProviders from "@nuvolo/nuux/components/NuvoAppProviders";
import { AppBar } from "@components/AppBar";
import { NuvoRoute } from "@nuvolo/nuux/components/NuvoApp";
import { getRoutes } from "@routes/index";

const ContentContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const LayoutRouter = (): JSX.Element => {
  const routes: NuvoRoute[] = getRoutes();
  return (
    <Router>
      <AppBar />
      <ContentContainer>
        <Switch>
          {routes.map((route, index) => {
            const { exact, path, component, name } = route;
            const coerceRoot = path === "/";
            const coercedVal = coerceRoot ? true : false;
            const exactVal = exact === undefined ? coercedVal : exact;
            return (
              <Route
                exact={exactVal}
                path={path}
                component={component}
                key={name}
              />
            );
          })}
        </Switch>
      </ContentContainer>
    </Router>
  );
};

const App = (props: {
  dataset: DOMStringMap;
  appName: string;
}): JSX.Element => {
  return (
    <NuvoAppProviders {...props}>
      <LayoutRouter />
    </NuvoAppProviders>
  );
};

export { App };
