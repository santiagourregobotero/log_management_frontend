import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "userApp/getUsers",
  async ({ page, rowsPerPage, searchText }) => {
    const response = await axios.get(
      `/api/users?page=${page + 1}&size=${rowsPerPage}&search=${searchText}`
    );
    const data = await response.data;
    return data;
  }
);

const UsersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUserById } =
  UsersAdapter.getSelectors((state) => state.userApp.users);

const UsersSlice = createSlice({
  name: "userApp/users",
  initialState: UsersAdapter.getInitialState({
    searchText: "",
    page: 1,
    rowsPerPage: 10,
    userTotalCount: 0,
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    setPage: {
      reducer: (state, action) => {
        state.page = action.payload;
      },
    },
    setRowsPerPage: {
      reducer: (state, action) => {
        state.rowsPerPage = action.payload;
      },
    },
    setUserTotalCount: {
      reducer: (state, action) => {
        state.userTotalCount = action.payload;
      },
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.userTotalCount = action.payload.count;
      UsersAdapter.setAll(state, action.payload.results);
    },
  },
});

export const { setUsersSearchText, setPage, setRowsPerPage } =
  UsersSlice.actions;

export const selectUsersSearchText = ({ userApp }) => userApp.users.searchText;

export const userTotalCount = ({ userApp }) => userApp.users.userTotalCount;

export const page = ({ userApp }) => userApp.users.page;

export const rowsPerPage = ({ userApp }) => userApp.users.rowsPerPage;

export default UsersSlice.reducer;
