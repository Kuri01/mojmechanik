// src/components/Login.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Container, Typography, Box, Link } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import ApiClient from "../api/Client.ts";

const apiClient = new ApiClient();

const schema = yup.object().shape({
  email: yup.string().required("Login jest wymagany"),
  password: yup.string().required("Hasło jest wymagane"),
});

/**
 * Komponent formularza logowania.
 *
 * @component
 * @returns {JSX.Element} Zwraca komponent formularza logowania.
 */

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: (data) => apiClient.login(data),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.token);
      enqueueSnackbar("Logowanie powiodło się!", { variant: "success" });
      navigate("/home");
    },
    onError: () => {
      enqueueSnackbar("Wystąpił błąd podczas logowania", { variant: "error" });
    },
  });

  /**
   * Funkcja obsługująca wysłanie formularza logowania.
   *
   * @param {Object} data - Dane logowania.
   */

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url(https://files.oaiusercontent.com/file-yeafuKJIRURwVj1LzEGp68X5?se=2024-05-31T11%3A12%3A37Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D8e448096-57e4-45ee-84aa-6d450fcf969c.webp&sig=6jmxIp5bL7gUsnIDRz7JYoE0Okx4hJdhh/ldLkzicmg%3D) ",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backdropFilter: "blur(5px)",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{ bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Logowanie
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Hasło"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <LoadingButton
            loading={mutation.isLoading}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Zaloguj się
          </LoadingButton>
        </form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Nie masz konta?{" "}
            <Link href="/register" variant="body2">
              Zarejestruj się
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
