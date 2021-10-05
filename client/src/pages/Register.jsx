import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";

import { registerRoute } from "../utils/ApiRoutes";

import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
};

const Register = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { username, email, password } = registerForm;

    if (username.length < 3) {
      toast.error("Username too short", toastOptions);
      return false;
    }

    if (email.length === 0) {
      toast.error("Please tape an e-mail", toastOptions);
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

    const { username, email, password } = registerForm;
    const { data } = await axios.post(registerRoute, {
      username,
      email,
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
      <RegistrationForm>
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
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

          <button tyle="submit">Create account</button>
          <hr />
          <Link to="/login">Login</Link>
        </form>
      </RegistrationForm>
      <ToastContainer />
    </>
  );
};

const RegistrationForm = styled.div`
  max-width: 400px;
  margin: 30px auto;
  input {
    display: block;
    width: 100%;
    margin: 8px 0;
  }
`;

export default Register;
