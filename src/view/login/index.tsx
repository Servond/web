"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Stack } from "@mui/material";
import { withFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/lib/hooks";

import { login } from "@/_middlewares/auth.middleware";
import { FormValues, FormProps } from "./types";

import PageWrapper from "../global/components/pageWrapper";
import InnerForm from "./components/innerForm";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || "",
      password: props.initialPassword || "",
    }),
    validationSchema: LoginSchema,
    enableReinitialize: true,
    async handleSubmit({ email, password }: FormValues, { resetForm }) {
      try {
        await login({ email, password })(dispatch);
        resetForm();
        router.push("/");
      } catch (err: any) {
        console.error(err.message);
      }
    },
  })(InnerForm);

  return (
    <PageWrapper>
      <Container>
        <Box
          display="flex"
          sx={{
            justifyContent: "center",
            // textAlign: "center",
            marginTop: "2rem",
            padding: "2rem",
          }}
        >
          <Stack spacing={8}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Login Form
            </Typography>
            <LoginForm />
          </Stack>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default LoginView;
