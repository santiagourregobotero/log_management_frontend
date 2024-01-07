import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
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
  getUserDetail,
  removeUser,
  selectUser,
  updateUser,
} from "../store/userSlice";

// import ContactEmailSelector from './email-selector/ContactEmailSelector';
// import PhoneNumberSelector from './phone-number-selector/PhoneNumberSelector';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  first_name: yup.string().required("You must enter a first name"),
  last_name: yup.string().required("You must enter a last name"),
  email: yup.string().required("You must enter an email"),
});

function UserDetailContent(props) {
  const userDetail = useSelector(selectUser);
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
      // dispatch(newContact());
    } else {
      dispatch(getUserDetail(routeParams.id));
    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    reset({ ...userDetail });
  }, [userDetail, reset]);

  function getCountryByIso(iso) {}

  /**
   * Form Submit
   */
  async function onSubmit(data) {
    if (routeParams.id === "new") {
    } else {
      const response = await dispatch(updateUser(data));
      if (response.payload == null) {
        dispatch(showMessage({ message: "Error on Server!" }));
      } else if (typeof response.payload == "string") {
        dispatch(showMessage({ message: response.payload }));
      } else {
        dispatch(showMessage({ message: "Successfully Updated!" }));
      }
    }
  }

  async function handleRemove() {
    const response = await dispatch(removeUser(routeParams.id));
    if (typeof response.payload == "string") {
      dispatch(showMessage({ message: response.payload }));
    } else if (response.payload == false) {
      dispatch(showMessage({ message: "Error on Server!" }));
    } else {
      dispatch(showMessage({ message: "Successfully Deleted!" }));
    }
  }

  if (_.isEmpty(form) || !userDetail) {
    return <FuseLoading />;
  }

  return (
    <>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        {/* <div className="w-full">
          <div className="flex flex-auto items-end mt-16">
            <Controller
              control={control}
              name="avatar"
              render={({ field: { onChange, value } }) => (
                <Box
                  sx={{
                    borderWidth: 4,
                    borderStyle: "solid",
                    borderColor: "background.paper",
                  }}
                  className="relative flex items-center justify-center w-128 h-128 rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div>
                      <label
                        htmlFor="button-avatar"
                        className="flex p-8 cursor-pointer"
                      >
                        <input
                          accept="image/*"
                          className="hidden"
                          id="button-avatar"
                          type="file"
                          onChange={async (e) => {
                            function readFileAsync() {
                              return new Promise((resolve, reject) => {
                                const file = e.target.files[0];
                                if (!file) {
                                  return;
                                }
                                const reader = new FileReader();

                                reader.onload = () => {
                                  resolve(
                                    `data:${file.type};base64,${btoa(
                                      reader.result
                                    )}`
                                  );
                                };

                                reader.onerror = reject;

                                reader.readAsBinaryString(file);
                              });
                            }

                            const newImage = await readFileAsync();

                            onChange(newImage);
                          }}
                        />
                        <FuseSvgIcon className="text-white">
                          heroicons-outline:camera
                        </FuseSvgIcon>
                      </label>
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          onChange("");
                        }}
                      >
                        <FuseSvgIcon className="text-white">
                          heroicons-solid:trash
                        </FuseSvgIcon>
                      </IconButton>
                    </div>
                  </div>
                  <Avatar
                    sx={{
                      backgroundColor: "background.default",
                      color: "text.secondary",
                    }}
                    className="object-cover w-full h-full text-64 font-bold"
                    src={value}
                    alt={userDetail.first_name}
                  >
                    {userDetail.first_name.charAt(0)}
                  </Avatar>
                </Box>
              )}
            />
          </div>
        </div> */}

        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="First Name"
              placeholder="First Name"
              id="first_name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:user-circle
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="last_name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Last Name"
              placeholder="Last Name"
              id="last_name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:user-circle
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Email"
              placeholder="Email"
              id="email"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:user-circle
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

export default UserDetailContent;
