import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectUsersSearchText, setUsersSearchText } from "../store/usersSlice";

function UsersHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(selectUsersSearchText);

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between pb-32 pt-24 px-24 md:px-64">
      <Typography className="flex text-24 md:text-36">Users</Typography>

      <div className="flex flex-1 items-center justify-end space-x-8 w-full sm:w-auto">
        <Paper
          component={motion.div}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full bUser-1 shadow-0 border-1 border-[#666]"
        >
          <FuseSvgIcon color="#666">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search Users"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              "aria-label": "Search Users",
            }}
            onChange={(ev) => dispatch(setUsersSearchText(ev))}
          />
        </Paper>
      </div>
    </div>
  );
}

export default UsersHeader;
