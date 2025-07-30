import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { LoginFormData } from "../../types/forms/login";
import styles from "./LoginForm.module.css";
import RenderField from "../../components/RenderField";

interface LoginFormProps {
  initialEmail?: string;
}

const validate = (values: any) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const LoginForm = ({
  handleSubmit,
}: InjectedFormProps<LoginFormData> & LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field name="email" type="email" component={RenderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={RenderField}
        label="Password"
      />
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default reduxForm<LoginFormData>({
  form: "login",
  validate,
  enableReinitialize: true,
})(LoginForm);
