import { Dispatch } from "redux";
import { LoginFormData } from "../../types/forms/login";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AuthActionTypes,
} from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { RegistrationFormData } from "../../types/forms/registration";
import axios from "axios";
import { SessionResponse } from "../../types/auth";

const API_BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:5050";

export const login =
  (
    formData: LoginFormData
  ): ThunkAction<Promise<void>, RootState, unknown, AuthActionTypes> =>
  async (dispatch: Dispatch) => {
    try {
      await axios.post(`${API_BASE_URL}/api/login`, formData, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store",
        },
      });
      dispatch({ type: LOGIN_SUCCESS, payload: { email: formData.email } });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };

export const register =
  (formData: RegistrationFormData) => async (dispatch: Dispatch) => {
    try {
      await axios.post(`${API_BASE_URL}/api/register`, formData);
      dispatch({ type: REGISTER_SUCCESS });
      return formData.email;
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE });
      throw error;
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.post(`${API_BASE_URL}/api/logout`, null, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Logout request failed", error);
  }

  dispatch({ type: LOGOUT });
};

export const checkSession = () => async (dispatch: any) => {
  try {
    const response = await axios.get<SessionResponse>(
      `${API_BASE_URL}/api/session`,
      {
        withCredentials: true,
      }
    );
    if (response.data.loggedIn) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { email: response.data.email },
      });
    } else {
      dispatch({ type: LOGOUT });
    }
  } catch (error) {
    dispatch({ type: LOGOUT });
  }
};
