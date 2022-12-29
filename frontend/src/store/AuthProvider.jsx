import { useReducer } from 'react';
import AuthContext from './auth-context';

const defaultAuthState = {
  isLoggedIn: localStorage.getItem('id') || null,
  queType: 'hr',
};

const AuthReducer = (state, action) => {
  if (action.type === 'LOGIN') {
    return { ...state, isLoggedIn: true };
  }



  if (action.type === 'SET_QUE_TYPE') {
    return { ...state, queType: action.payload };
  }
};

const AuthProvider = (props) => {
  const [authState, dispatchAction] = useReducer(AuthReducer, defaultAuthState);

  const loginHandler = () => {
    dispatchAction({ type: 'LOGIN' });
  };
  const queTypeChangeHandler = (queId) => {
    dispatchAction({ type: "SET_QUE_TYPE", payload: queId });
  };



  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    login: loginHandler,
    queType: authState.queType,
    queTypeChangeHandler: queTypeChangeHandler,
  };

  return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>;
};
export default AuthProvider;
