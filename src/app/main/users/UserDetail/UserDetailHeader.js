import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { selectUsersSearchText } from "../store/usersSlice";

function UserDetailHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(selectUsersSearchText);

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between pb-32 pt-24 px-24 md:px-64">
      <Typography className="flex text-24 md:text-36">User Detail</Typography>
    </div>
  );
}

export default UserDetailHeader;
