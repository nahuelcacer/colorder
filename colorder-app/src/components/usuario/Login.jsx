import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";
import AuthContext from "../../context/AuthContext";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "16px",
});

const ButtonWrapper = styled("div")({
  alignSelf: "center",
});

const LoginPage = () => {
  const { loginUser, user, logoutUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <Container>
      <Form onSubmit={loginUser}>
        <TextField
          type="text"
          name="username"
          label="Enter username"
          variant="outlined"
        />
        <TextField
          type="password"
          name="password"
          label="Enter password"
          variant="outlined"
        />
        <ButtonWrapper>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </ButtonWrapper>
      </Form>
      {user != null ? <>{user.username}</> : <></>}
      <p onClick={logoutUser}>Logout</p>
    </Container>
  );
};

export default LoginPage;
