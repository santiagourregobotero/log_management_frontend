import _ from "@lodash";

const LogModel = (data) =>
  _.defaults(data || {}, {
    id: null,
    timestamp: "",
    message: "",
    severity: "",
    source: "",
  });

export default LogModel;
