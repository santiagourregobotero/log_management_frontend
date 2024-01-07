import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import LogsHeader from "./LogsHeader";
import LogsTable from "./LogsTable";

function Logs() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<LogsHeader />}
      content={<LogsTable />}
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
    />
  );
}

export default withReducer("logApp", reducer)(Logs);
