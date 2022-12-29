import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  queTypeChangeHandler: (queId) => {},
  queType: '',
});

export default AuthContext;
