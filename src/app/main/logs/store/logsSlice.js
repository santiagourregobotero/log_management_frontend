import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getLogs = createAsyncThunk(
  "logApp/getLogs",
  async ({
    page,
    rowsPerPage,
    severityText,
    sourceText,
    startDate,
    endDate,
    order,
  }) => {
    const startDateText = startDate ? startDate.format("YYYY-MM-DD") : "";
    const endDateText = endDate ? endDate.format("YYYY-MM-DD") : "";
    const ordering = (order.id = null
      ? ""
      : order.direction == "asc"
      ? "-" + order.id
      : order.id);
    const response = await axios.get(
      `/api/logs?page=${
        page + 1
      }&size=${rowsPerPage}&severity=${severityText}&source=${sourceText}&start_date=${startDateText}&end_date=${endDateText}&ordering=${ordering}`
    );
    const data = await response.data;
    return data;
  }
);

const LogsAdapter = createEntityAdapter({});

export const { selectAll: selectLogs, selectById: selectLogById } =
  LogsAdapter.getSelectors((state) => state.logApp.logs);

const LogsSlice = createSlice({
  name: "logApp/logs",
  initialState: LogsAdapter.getInitialState({
    severityFilter: "",
    sourceFilter: "",
    startDateFilter: null,
    endDateFilter: null,
    page: 1,
    rowsPerPage: 10,
    logTotalCount: 0,
  }),
  reducers: {
    setFilter: {
      reducer: (state, action) => {
        state.severityFilter = action.payload.severityFilter || "";
        state.sourceFilter = action.payload.sourceFilter || "";
        state.startDateFilter = action.payload.startDateFilter || null;
        state.endDateFilter = action.payload.endDateFilter || null;
      },
      prepare: (data) => ({ payload: data || {} }),
    },
    setPage: {
      reducer: (state, action) => {
        state.page = action.payload;
      },
    },
    setRowsPerPage: {
      reducer: (state, action) => {
        state.rowsPerPage = action.payload;
      },
    },
    setLogTotalCount: {
      reducer: (state, action) => {
        state.logTotalCount = action.payload;
      },
    },
  },
  extraReducers: {
    [getLogs.fulfilled]: (state, action) => {
      state.logTotalCount = action.payload.count;
      LogsAdapter.setAll(state, action.payload.results);
    },
  },
});

export const { setFilter, setPage, setRowsPerPage } = LogsSlice.actions;

export const selectLogsSeverityFilter = ({ logApp }) =>
  logApp.logs.severityFilter;

export const selectLogsSourceFilter = ({ logApp }) => logApp.logs.sourceFilter;

export const selectLogsStartDateFilter = ({ logApp }) =>
  logApp.logs.startDateFilter;

export const selectLogsEndDateFilter = ({ logApp }) =>
  logApp.logs.endDateFilter;

export const logTotalCount = ({ logApp }) => logApp.logs.logTotalCount;

export const page = ({ logApp }) => logApp.logs.page;

export const rowsPerPage = ({ logApp }) => logApp.logs.rowsPerPage;

export default LogsSlice.reducer;
