import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { RegistrationFormData } from "../../types/forms/registration";
import styles from "./RegistrationForm.module.css";
import RenderField from "../../components/RenderField";

const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
    errors.name = "Name can only contain letters";
  }

  if (!values.surname) {
    errors.surname = "Surname is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.surname)) {
    errors.surname = "Surname can only contain letters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const RegistrationForm = ({
  handleSubmit,
}: InjectedFormProps<RegistrationFormData>) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field name="name" type="text" component={RenderField} label="Name" />
      <Field
        name="surname"
        type="text"
        component={RenderField}
        label="Surname"
      />
      <Field name="email" type="email" component={RenderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={RenderField}
        label="Password"
      />
      <Field
        name="confirmPassword"
        type="password"
        component={RenderField}
        label="Confirm Password"
      />
      <button type="submit" className={styles.button}>
        Register
      </button>
    </form>
  );
};

export default reduxForm<RegistrationFormData>({
  form: "registration",
  validate,
})(RegistrationForm);
