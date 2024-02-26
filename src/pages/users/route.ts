import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const userRoutes: RouteDefinition[] = [
  {
    path: "/users",
    component: lazy(() => import("./Users")),
    children: [
      {
        path: "/list",
        component: lazy(() => import("./user/User")),
      },
      {
        path: "/create",
        component: lazy(() => import("./user/CreateUser")),
      },
      {
        path: "/edit/:id",
        component: lazy(() => import("./user/EditUser")),
      },
      {
        path: "/detail/:id",
        component: lazy(() => import("./user/DetailUser")),
      },
      {
        path: "/roles",
        component: lazy(() => import("./role/Role")),
      },
      {
        path: "/permissions",
        component: lazy(() => import("./permission/Permission")),
      },
    ],
  },
];

export default userRoutes;
