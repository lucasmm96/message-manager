import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
