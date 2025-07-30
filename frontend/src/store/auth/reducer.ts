import {
  LOGIN_SUCCESS,
  LOGOUT,
  AuthActionTypes,
  REGISTER_SUCCESS,
} from "./types";

export interface AuthState {
  loggedIn: boolean;
  email: string | null;
}

const initialState: AuthState = {
  loggedIn: false,
  email: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true, email: action.payload.email };
    case LOGOUT:
      return { ...state, loggedIn: false, email: null };
    case REGISTER_SUCCESS:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};
