import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";

import { loginRoute } from "../utils/ApiRoutes";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { username, password } = loginForm;

    if (username.length < 3) {
      toast.error("Username too short", toastOptions);
      return false;
    }

    if (password.length < 8) {
      toast.error("Please tape a valid password", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { username, password } = loginForm;
    const { data } = await axios.post(loginRoute, {
      username,
      password,
    });

    if (!data.status) {
      toast.error(data.message, toastOptions);
      return;
    }

    // TODO: Replace with JWT
    localStorage.setItem("token", JSON.stringify(data.user));
    navigate("/");
  };

  return (
    <>
      <LoginForm>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <h1>TikTalks</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

          <button tyle="submit">Login</button>
          <hr />
          <Link to="/register">Create account</Link>
        </form>
      </LoginForm>
      <ToastContainer />
    </>
  );
};

const LoginForm = styled.div`
  max-width: 400px;
  margin: 30px auto;
  input {
    display: block;
    width: 100%;
    margin: 8px 0;
  }
`;

export default Login;
