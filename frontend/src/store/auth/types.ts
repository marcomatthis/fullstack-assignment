export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT = 'LOGOUT';

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    email: string;
  }
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
}

export type AuthActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | RegisterSuccessAction
  | RegisterFailureAction;