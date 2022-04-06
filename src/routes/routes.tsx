import { NuvoRoute } from "@nuvolo/nuux/components/NuvoApp";
import { AllBurgersView, UserView } from "@views/index";

const Routes: NuvoRoute[] = [
  {
    path: "/",
    component: AllBurgersView,
    name: "ALL_BURGERS",
  },
  {
    path: "/user",
    component: UserView,
    name: "USER",
  },
];

function getRoutes(): NuvoRoute[] {
  return Routes;
}

export { Routes, getRoutes };
