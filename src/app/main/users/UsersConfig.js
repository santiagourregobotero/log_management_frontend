import UserDetail from "./UserDetail/UserDetail";
import Users from "./UserList/Users";

const UsersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "user-detail/:id",
      element: <UserDetail />,
    },
  ],
};

export default UsersConfig;

/**
 * Lazy load User
 */
/*
import React from 'react';

const User = lazy(() => import('./User'));

const UserConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'User',
      element: <User />,
    },
  ],
};

export default UserConfig;
*/
