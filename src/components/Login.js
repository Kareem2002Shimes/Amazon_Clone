import React, { useState } from "react";
import LogoImg from "../images/amazonLogo2.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../components/Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password).then((auth) =>
      navigate("/")
    );
  };
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src={LogoImg} alt="logo-img" />
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-signInBtn" type="submit" onClick={signIn}>
            Sign in
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Fake Clone Conditions of Use and
          Privacy Notice.
        </p>
        <button className="login-registerBtn" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
