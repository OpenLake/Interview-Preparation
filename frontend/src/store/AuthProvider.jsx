import { useReducer } from 'react';
// import AuthContext from './auth-context';
// import { RandomId } from '../pureJS/RandomId';
import AuthContext from './auth-context';
//import { gameData } from "../pureJS/gameData";

const defaultAuthState = {
  isLoggedIn: false,
};

const AuthReducer = (state, action) => {
  if (action.type === 'LOGIN') {
    return { ...state, isLoggedIn: true };
  }
  // console.log('solution toggled', state.toggleSolution);
  // if (state.toggleSolution) return { ...state, toggleSolution: false };
  // else return { ...state, toggleSolution: true };
  // // }

  // if (action.type === 'CHANGE_GAME') {
  //   const ran = RandomId();
  //   //console.log("auth changes", ran);

  //   return { ...state, newGame: true, randomId: ran, totalMoves: 0 };
  // }

  // if (action.type === 'NEW_MOVE') {
  //   const move = state.totalMoves + 1;
  //   return { ...state, totalMoves: move };
  // }
};

const AuthProvider = (props) => {
  const [authState, dispatchAction] = useReducer(AuthReducer, defaultAuthState);

  const loginHandler = () => {
    dispatchAction({ type: 'LOGIN' });
  };
  // const movesHandler = () => {
  //   // console.log("new move");
  //   dispatchAction({ type: 'NEW_MOVE' });
  // };

  // const changeGame = () => {
  //   dispatchAction({ type: 'CHANGE_GAME' });
  // };

  // const toggleHandler = () => {
  //   dispatchAction({ type: 'TOGGLE_ACTION' });
  // };

  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    login: loginHandler,
    // newGame: gameState.newGame,
    // randomId: gameState.randomId,
    // movesFunction: movesHandler,
    // totalMoves: gameState.totalMoves,
    // toggleSolution: gameState.toggleSolution,
    // gameChanged: changeGame,
    // toggle: toggleHandler,
  };

  return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>;
};
export default AuthProvider;
