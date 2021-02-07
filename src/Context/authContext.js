import React, { useReducer } from "react";

const initialState = {
  user: null,
};

export const AUTH_STATE_CHANGED = "AUTH_STATE_CHANGED";
export const LOGOUT = "LOGOUT";
export const DEFAULT_ACCOUNT="DEFAULT_ACCOUNT"
const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_STATE_CHANGED:
      return {
        user: action.payload,
      };
    case DEFAULT_ACCOUNT:
        return {
            user: {...state.user,defaultAccount:action.payload}
        }
    case LOGOUT:
        return {
            user: null,
          };
  }
  return state;
};

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [authState, dispatch] = useReducer(reducer, initialState);

  const actions = {
    authStateChanged: (user) => {
      if (user) {
        dispatch({ type: AUTH_STATE_CHANGED, payload: user });
      } 
    },
    logout: () => {
        dispatch({ type: LOGOUT, payload: null });
    },
    setDefaultAccount: (acc) => {
        dispatch({ type: DEFAULT_ACCOUNT, payload: acc });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        authActions: actions,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };