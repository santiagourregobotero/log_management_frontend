import FuseLoading from "@fuse/core/FuseLoading";
import FuseUtils from "@fuse/utils";
import settingsConfig from "app/configs/settingsConfig";
import { Navigate } from "react-router-dom";
import Error404Page from "../main/404/Error404Page";
import LogsConfig from "../main/logs/LogsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import UsersConfig from "../main/users/UsersConfig";

const routeConfigs = [
  UsersConfig,
  LogsConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "",
    element: <Navigate to="logs" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
