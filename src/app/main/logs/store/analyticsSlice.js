import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLogAnalytics = createAsyncThunk(
  "logApp/getLogAnalytics",
  async ({ severityText, sourceText, startDate, endDate, constraint }) => {
    const startDateText = startDate ? startDate.format("YYYY-MM-DD") : "";
    const endDateText = endDate ? endDate.format("YYYY-MM-DD") : "";

    const response = await axios.get(
      `/api/logs/analytics?severity=${severityText}&source=${sourceText}&start_date=${startDateText}&end_date=${endDateText}&constraint=${constraint}`
    );
    const data = await response.data;
    return data;
  }
);

export const getLogAnalyticsByFeature = createAsyncThunk(
  "logApp/getLogAnalyticsByFeature",
  async ({ severityText, sourceText, startDate, endDate, constraint }) => {
    const startDateText = startDate ? startDate.format("YYYY-MM-DD") : "";
    const endDateText = endDate ? endDate.format("YYYY-MM-DD") : "";

    const response = await axios.get(
      `/api/logs/analytics?severity=${severityText}&source=${sourceText}&start_date=${startDateText}&end_date=${endDateText}&constraint=${constraint}`
    );
    const data = await response.data;
    return data;
  }
);

const AnalyticsSlice = createSlice({
  name: "logApp/analytics",
  initialState: {
    logAnalytics: null,
    severityFilter: "",
    sourceFilter: "",
    startDateFilter: null,
    endDateFilter: null,
    constraintFilter: null,
  },
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
  },
  extraReducers: {
    [getLogAnalytics.pending]: (state, action) => ({
      ...state,
      logAnalytics: null,
    }),
    [getLogAnalytics.fulfilled]: (state, action) => ({
      ...state,
      logAnalytics: [
        {
          name: "Logs Count",
          data: action.payload.map((value, index) => {
            return {
              x: value["timestamp__date"],
              y: value["count"],
            };
          }),
        },
      ],
    }),
  },
});

export const { setFilter } = AnalyticsSlice.actions;

export const selectLogAnalytics = ({ logApp }) => logApp.analytics.logAnalytics;

export const selectLogsSeverityFilter = ({ logApp }) =>
  logApp.analytics.severityFilter;

export const selectLogsSourceFilter = ({ logApp }) =>
  logApp.analytics.sourceFilter;

export const selectLogsStartDateFilter = ({ logApp }) =>
  logApp.analytics.startDateFilter;

export const selectLogsEndDateFilter = ({ logApp }) =>
  logApp.analytics.endDateFilter;

export default AnalyticsSlice.reducer;
