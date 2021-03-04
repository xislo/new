import { lazy } from "react";

import {
  LOGIN_PAGE,
  FORGET_PASSWORD_PAGE,
  SAML_AUTHORIZED,
  OIDC_CODE_CALLBACK,
} from "./Constants";

export const publicRoutes = [
  {
    path: LOGIN_PAGE,
    component: lazy(() => import("../../../Pages/UserPages/Login")),
    exact: true,
  },
  {
    path: FORGET_PASSWORD_PAGE,
    component: lazy(() => import("../../../Pages/UserPages/ForgotPassword")),
    exact: true,
  },
  {
    path: SAML_AUTHORIZED,
    component: lazy(() =>
      import("./../../../Pages/Security/User/SAML_Authorized")
    ),
    breadcrumb: true,
  },
  {
    path: OIDC_CODE_CALLBACK,
    component: lazy(() =>
      import("./../../../Pages/Security/User/OIDC_Code_CallBack")
    ),
    breadcrumb: true,
  },
];
