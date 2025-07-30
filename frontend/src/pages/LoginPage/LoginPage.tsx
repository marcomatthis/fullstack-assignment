import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/actions";
import LoginForm from "../../forms/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LoginFormData } from "../../types/forms/login";
import { useAppDispatch } from "../../store/hooks";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialSuccess = location.state?.success ?? "";
  const [successMessage, setSuccessMessage] = useState(initialSuccess);

  const [error, setError] = useState("");

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const prefillEmail = location.state?.email || "";

  useEffect(() => {
    if (loggedIn) navigate("/loans");
  }, [loggedIn, navigate]);

  const handleLogin = async (formData: LoginFormData) => {
    try {
      setError("");
      setSuccessMessage("");
      await dispatch(login(formData));
    } catch (err) {
      setError("Invalid email or password, please try again.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img src="/images/valr_logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Login</h1>
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <LoginForm
          onSubmit={handleLogin}
          initialValues={{ email: prefillEmail }}
        ></LoginForm>
        <p className={styles.subtext}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
