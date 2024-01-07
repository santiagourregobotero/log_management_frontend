import history from "@history";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLogDetail = createAsyncThunk(
  "logApp/detail/getLog",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.get(`/api/logs/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      history.push({ pathname: `/logs` });
      return null;
    }
  }
);

export const addLog = createAsyncThunk(
  "logApp/detail/addLog",
  async (log, { dispatch, getState }) => {
    try {
      let result = null;
      await axios.post(`/api/logs`, log).then(
        async (response) => {
          result = await response.data;
        },
        (reason) => {
          if (reason.response) {
            result = Object.values(reason.response.data)
              .map((item) => item[0])
              .join(". ");
          }
        }
      );
      return result;
    } catch (error) {
      return null;
    }
  }
);

export const updateLog = createAsyncThunk(
  "logApp/detail/updateLog",
  async (log, { dispatch, getState }) => {
    try {
      const response = await axios.patch(`/api/logs/${log.id}`, log);
      const data = await response.data;
      if (data.detail) return data.detail;
      return data;
    } catch (error) {
      return null;
    }
  }
);

export const removeLog = createAsyncThunk(
  "logApp/detail/removeLog",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(`/api/logs/${id}`);
      const data = await response.data;
      if (data.detail) return data.detail;
      return true;
    } catch (error) {
      if (error.response.data.detail) return error.response.data.detail;
      return false;
    }
  }
);

export const selectLog = ({ logApp }) => logApp.detail;

const contactSlice = createSlice({
  name: "logApp/detail",
  initialState: null,
  reducers: {
    newLog: (state, action) => {
      return {
        message: "",
        severity: "",
        source: "",
      };
    },
    resetLog: () => null,
  },
  extraReducers: {
    [getLogDetail.pending]: (state, action) => null,
    [getLogDetail.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetLog, newLog } = contactSlice.actions;

export default contactSlice.reducer;
