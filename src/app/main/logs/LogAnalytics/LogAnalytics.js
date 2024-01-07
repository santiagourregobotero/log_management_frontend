import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import LogAnalyticsContent from "./LogAnalyticsContent";
import LogAnalyticsHeader from "./LogAnalyticsHeader";

function LogAnalytics() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<LogAnalyticsHeader />}
      content={<LogAnalyticsContent />}
      scroll={isMobile ? "normal" : "content"}
      sx={{
        boxShadow: 0,
        backgroundColor: "white",
        "& .FusePageCarded-content": {
          height: "100%",
          marginLeft: "30px",
          marginRight: "30px",
          boxShadow: 0,
        },
        "& .FusePageCarded-scroll": {
          backgroundColor: "white",
        },
      }}
    ></FusePageCarded>
  );
}

export default withReducer("logApp", reducer)(LogAnalytics);
