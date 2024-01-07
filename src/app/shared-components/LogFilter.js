import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import { Fab } from "@mui/material";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { DatePicker } from "@mui/x-date-pickers-pro";
import * as dayjs from "dayjs";
import "dayjs/locale/en";
import { motion } from "framer-motion";
import { useRef } from "react";
dayjs.locale("en");

function LogFilter({
  defaultSeverityFilter,
  defaultSourceFilter,
  defaultStartDateFilter,
  defaultEndDateFilter,
  onFilter,
}) {
  const severityFilter = useRef("");
  const sourceFilter = useRef("");
  const startDateFilter = useRef(null);
  const endDateFilter = useRef(null);

  const onSearch = () => {
    const startDate = startDateFilter.current.value;
    const endDate = endDateFilter.current.value;

    onFilter({
      severityFilter: severityFilter.current.value,
      sourceFilter: sourceFilter.current.value,
      startDateFilter: startDate.length == 0 ? null : dayjs(startDate),
      endDateFilter: endDate.length == 0 ? null : dayjs(endDate).add(1, "day"),
    });
  };

  return (
    <div className="flex flex-1 items-center justify-end space-x-8 w-full sm:w-auto">
      <div className="flex flex-col">
        <span className="bold ml-8">Date From:</span>
        <DatePicker
          inputRef={startDateFilter}
          defaultValue={
            defaultStartDateFilter == null
              ? null
              : dayjs(defaultStartDateFilter)
          }
          format="MM-DD-YYYY"
          sx={{
            "& .MuiOutlinedInput-notchedOutline, & .Mui-focused": {
              border: "1px solid #666 !important",
              borderWidth: "1px !important",
              borderRadius: 999,
            },
            "& .MuiOutlinedInput-root": {
              border: "0px solid !important",
            },
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="bold ml-8">Date To:</span>
        <DatePicker
          inputRef={endDateFilter}
          defaultValue={
            defaultEndDateFilter == null
              ? null
              : dayjs(defaultEndDateFilter).subtract(1, "day")
          }
          format="MM-DD-YYYY"
          sx={{
            "& .MuiOutlinedInput-notchedOutline, & .Mui-focused": {
              border: "1px solid #666 !important",
              borderWidth: "1px !important",
              borderRadius: 999,
            },
            "& .MuiOutlinedInput-root": {
              border: "0px solid !important",
            },
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="bold ml-8">Severity:</span>
        <Paper
          component={motion.div}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 py-6 rounded-full bLog-1 shadow-0 border-1 border-[#666]"
        >
          <FuseSvgIcon color="action">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Severity"
            className="flex flex-1"
            disableUnderline
            fullWidth
            inputRef={severityFilter}
            defaultValue={defaultSeverityFilter}
            inputProps={{
              "aria-label": "Severity",
            }}
          />
        </Paper>
      </div>
      <div className="flex flex-col">
        <span className="bold ml-8">Source:</span>
        <Paper
          component={motion.div}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 py-6 rounded-full bLog-1 shadow-0 border-1 border-[#666]"
        >
          <FuseSvgIcon color="action">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Source"
            className="flex flex-1"
            disableUnderline
            fullWidth
            inputRef={sourceFilter}
            defaultValue={defaultSourceFilter}
            inputProps={{
              "aria-label": "Source",
            }}
          />
        </Paper>
      </div>
      <Fab
        aria-label="delete"
        size="medium"
        className="mt-24"
        color="primary"
        onClick={onSearch}
      >
        <SearchIcon fontSize="medium" />
      </Fab>
    </div>
  );
}

export default LogFilter;
