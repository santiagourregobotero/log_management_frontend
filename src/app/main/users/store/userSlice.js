import history from "@history";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import UserModel from "../model/UserModel";

export const getUserDetail = createAsyncThunk(
  "userApp/detail/getUser",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.get(`/api/user/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      history.push({ pathname: `/users` });
      return null;
    }
  }
);
/*
export const addContact = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts', contact);

    const data = await response.data;

    return data;
  }
);


*/

export const updateUser = createAsyncThunk(
  "userApp/detail/updateUser",
  async (user, { dispatch, getState }) => {
    try {
      const response = await axios.patch(`/api/user/${user.id}`, user);
      const data = await response.data;
      if (data.detail) return data.detail;
      return data;
    } catch (error) {
      return null;
    }
  }
);

export const removeUser = createAsyncThunk(
  "userApp/detail/removeUser",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(`/api/user/${id}`);
      const data = await response.data;
      if (data.detail) return data.detail;
      return true;
    } catch (error) {
      if (error.response.data.detail) return error.response.data.detail;
      return false;
    }
  }
);

export const selectUser = ({ userApp }) => userApp.detail;

const contactSlice = createSlice({
  name: "userApp/detail",
  initialState: null,
  reducers: {
    newUser: (state, action) => UserModel(),
    resetUser: () => null,
  },
  extraReducers: {
    [getUserDetail.pending]: (state, action) => null,
    [getUserDetail.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetUser, newUser } = contactSlice.actions;

export default contactSlice.reducer;
