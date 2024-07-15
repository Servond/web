import { NextRequest, NextResponse } from "next/server";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/lib/hooks";
import parseJWT from "./utils/parseJwt";
import { AxiosError } from "axios";
import instance from "./utils/axiosInstance";
import { logoutState } from "./lib/features/auth/authSlice";
import { keepLogin, logout } from "./_middlewares/auth.middleware";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("refresh_token")?.value || "";
  const response = NextResponse.next();
  const validate = await instance()
    .get("/auth", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      response.cookies.set("access-token", res.data.access_token);
      return true;
    })
    .catch((err) => {
      if (err instanceof AxiosError) console.log(err.response?.data);
      return false;
    });

  return response;
}
// export const config = {
//   matcher: ["/auth", "/login", "/verification", "/register", "/admin", "/"],
// };
