import _ from "@lodash";

const UserModel = (data) =>
  _.defaults(data || {}, {
    id: null,
    email: "",
    first_name: "",
    last_name: "",
  });

export default UserModel;
