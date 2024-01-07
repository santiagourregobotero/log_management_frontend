import Typography from "@mui/material/Typography";
import * as dayjs from "dayjs";
import "dayjs/locale/en";
import { useDispatch, useSelector } from "react-redux";
import LogFilter from "../../../shared-components/LogFilter";
import { setFilter } from "../store/logsSlice";

dayjs.locale("en");

import {
  selectLogsEndDateFilter,
  selectLogsSeverityFilter,
  selectLogsSourceFilter,
  selectLogsStartDateFilter,
} from "../store/logsSlice";

function LogsHeader(props) {
  const dispatch = useDispatch();

  const defaultSeverityFilter = useSelector(selectLogsSeverityFilter);
  const defaultSourceFilter = useSelector(selectLogsSourceFilter);
  const defaultStartDateFilter = useSelector(selectLogsStartDateFilter);
  const defaultEndDateFilter = useSelector(selectLogsEndDateFilter);

  const handleFilter = ({
    severityFilter,
    sourceFilter,
    startDateFilter,
    endDateFilter,
  }) => {
    dispatch(
      setFilter({
        severityFilter: severityFilter,
        sourceFilter: sourceFilter,
        startDateFilter: startDateFilter,
        endDateFilter: endDateFilter,
      })
    );
  };

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between pb-32 pt-24 px-24 md:px-64">
      <Typography className="flex text-24 md:text-36">Logs</Typography>
      <LogFilter
        defaultSeverityFilter={defaultSeverityFilter}
        defaultSourceFilter={defaultSourceFilter}
        defaultStartDateFilter={defaultStartDateFilter}
        defaultEndDateFilter={defaultEndDateFilter}
        onFilter={handleFilter}
      />
    </div>
  );
}

export default LogsHeader;
