import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import history from "@history";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import _ from "@lodash";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import { showMessage } from "app/store/fuse/messageSlice";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  addLog,
  getLogDetail,
  newLog,
  removeLog,
  selectLog,
  updateLog,
} from "../store/logSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  message: yup.string().required("You must enter a message"),
  severity: yup.string().required("You must enter an severity"),
  source: yup.string().required("You must enter an source"),
});

function LogDetailContent(props) {
  const logDetail = useSelector(selectLog);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  useEffect(() => {
    if (routeParams.id === "new") {
      dispatch(newLog());
    } else {
      dispatch(getLogDetail(routeParams.id));
    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    reset({ ...logDetail });
  }, [logDetail, reset]);

  /**
   * Form Submit
   */
  async function onSubmit(data) {
    data.timestamp = new Date().toString();

    if (routeParams.id === "new") {
      const response = await dispatch(addLog(data));

      if (response.payload == null) {
        dispatch(
          showMessage({ message: "Error on Server!", variant: "error" })
        );
      } else if (typeof response.payload == "string") {
        dispatch(showMessage({ message: response.payload, variant: "error" }));
      } else {
        dispatch(
          showMessage({ message: "Successfully Updated!", variant: "success" })
        );
      }
    } else {
      const response = await dispatch(updateLog(data));

      if (response.payload == null) {
        dispatch(
          showMessage({ message: "Error on Server!", variant: "error" })
        );
      } else if (typeof response.payload == "string") {
        dispatch(showMessage({ message: response.payload, variant: "error" }));
      } else {
        dispatch(
          showMessage({ message: "Successfully Updated!", variant: "success" })
        );
      }
    }
  }

  async function handleRemove() {
    const response = await dispatch(removeLog(routeParams.id));

    if (typeof response.payload == "string") {
      dispatch(showMessage({ message: response.payload, variant: "error" }));
    } else if (response.payload == false) {
      dispatch(showMessage({ message: "Error on Server!", variant: "error" }));
    } else {
      dispatch(
        showMessage({ message: "Successfully Deleted!", variant: "success" })
      );
      history.back();
    }
  }

  if (_.isEmpty(form) || !logDetail) {
    return <FuseLoading />;
  }

  return (
    <>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Message"
              placeholder="Message"
              id="message"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:Log-circle
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="severity"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Severity"
              placeholder="Severity"
              id="severity"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:Log-circle
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="source"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Source"
              placeholder="Source"
              id="source"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:Log-circle
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </div>

      <Box className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t">
        {routeParams.id !== "new" && (
          <Button color="error" onClick={handleRemove}>
            Delete
          </Button>
        )}
        <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
          Cancel
        </Button>
        <Button
          className="ml-8"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Box>
    </>
  );
}

export default LogDetailContent;
