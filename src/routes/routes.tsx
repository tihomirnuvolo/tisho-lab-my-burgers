import React from "react";
import { NuvoRoute } from "@nuvolo/nuux/components/NuvoApp";
import { ExampleView } from "@views/index";

const example = "EXAMPLE";

const Routes: NuvoRoute[] = [
  {
    path: "/",
    component: ExampleView,
    name: example,
  },
];

function getRoutes(): NuvoRoute[] {
  return Routes;
}

export { Routes, getRoutes };
