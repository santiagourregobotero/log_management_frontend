import { combineReducers } from "@reduxjs/toolkit";
import analytics from "./analyticsSlice";
import detail from "./logSlice";
import logs from "./logsSlice";

const reducer = combineReducers({
  logs,
  detail,
  analytics,
});

export default reducer;
