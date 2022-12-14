import React from 'react';
//import Randomid from "../pureJS.randomId";
// interface GlobalContent {
//   isLoggedIn: Boolean;
//   login: () => any;
// }

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  // newGame: false,
  // gameChanged: () => {},
  // randomId: [],
  // movesFunction: () => {},
  // totalMoves: 0,
  // toggleSolution: false,
  // toggle: () => {},
});

export default AuthContext;
