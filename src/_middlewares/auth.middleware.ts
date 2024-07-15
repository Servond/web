import { Dispatch } from "@reduxjs/toolkit";
import { IUsers } from "@/interface/user.interface";
import parseJWT from "@/utils/parseJwt";
import instance from "@/utils/axiosInstance";
import { deleteCookie, getCookie } from "cookies-next";
import { loginState, logoutState } from "@/lib/features/auth/authSlice";

type User = {
  email: string;
  isVerified: boolean;
  avatar?: string;
};

export const login = ({ email, password }: IUsers) => {
  return async (dispatch: Dispatch) => {
    try {
      await instance().post(
        "/auth/login",
        {
          email,
          password,
        }
        // { headers: { Authorization: `Bearer`}}
        // { withCredentials: true }
      );
      const access_token = getCookie("access-token") || "";
      if (access_token) {
        const user: User = parseJWT(access_token);
        dispatch(loginState(user));
      }

      return;
    } catch (err) {
      if (err instanceof Error) {
        deleteCookie("access-token");
        deleteCookie("refresh-token");
        return err.message;
      }
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      deleteCookie("access-token");
      deleteCookie("refresh-token");
      dispatch(logoutState());

      return {
        success: true,
        message: "success",
      };
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };
};

export const keepLogin = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getCookie("access_token");
      if (!token) throw new Error("token not found");
      const user = parseJWT(token) as User;

      if (user.email) {
        dispatch(loginState(user));
      }

      return {
        success: true,
        message: "success",
      };
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };
};
