import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegistrationForm from "../../forms/RegistrationForm/RegistrationForm";
import { useAppDispatch } from "../../store/hooks";
import { RegistrationFormData } from "../../types/forms/registration";
import { register } from "../../store/auth/actions";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = async (formData: RegistrationFormData) => {
    try {
      setError("");
      const email = await dispatch(register(formData));
      navigate("/", {
        state: { email, success: "Registration successful! Please log in." },
      });
    } catch (error) {
      setError("User already exits, please log in");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img src="/images/valr_logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Create your account</h1>
        {error && <p className={styles.error}>{error}</p>}

        <RegistrationForm onSubmit={handleRegister}></RegistrationForm>
        <p className={styles.subtext}>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
