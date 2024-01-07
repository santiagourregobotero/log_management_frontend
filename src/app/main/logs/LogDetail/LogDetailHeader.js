import history from "@history";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function LogDetailHeader(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();

  const handleBack = () => {
    history.back();
  };
  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center pb-32 pt-24 px-24 md:px-64">
      <IconButton aria-label="back" onClick={handleBack}>
        <ArrowBackIosNewIcon fontSize="large" />
      </IconButton>
      <Typography className="flex ml-12 text-24 md:text-36">
        {routeParams.id === "new" ? "New Log" : "Log Detail"}
      </Typography>
    </div>
  );
}

export default LogDetailHeader;
