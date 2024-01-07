import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice';
import detail from './userSlice';

const reducer = combineReducers({
  users,
  detail
});

export default reducer;
