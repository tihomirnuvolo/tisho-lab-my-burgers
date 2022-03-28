import React from "react";
import { NuvoRoute } from "@nuvolo/nuux/components/NuvoApp";
import { AllBurgersView } from "@views/index";

const example = "EXAMPLE";

const Routes: NuvoRoute[] = [
  {
    path: "/",
    component: AllBurgersView,
    name: example,
  },
];

function getRoutes(): NuvoRoute[] {
  return Routes;
}

export { Routes, getRoutes };
