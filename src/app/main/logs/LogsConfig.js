import LogAnalytics from "./LogAnalytics/LogAnalytics";
import LogDetail from "./LogDetail/LogDetail";
import Logs from "./LogList/Logs";

const LogsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "logs",
      element: <Logs />,
    },
    {
      path: "log-detail/:id",
      element: <LogDetail />,
    },
    {
      path: "log-analytics",
      element: <LogAnalytics />,
    },
  ],
};

export default LogsConfig;
