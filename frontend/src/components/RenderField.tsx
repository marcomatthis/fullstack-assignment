import React, { useState } from "react";
import styles from "./RenderField.module.css";

const RenderField = ({ input, label, type, meta: { touched, error } }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className={styles.field}>
      <label htmlFor={input.name}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          {...input}
          type={isPasswordField && showPassword ? "text" : type}
          id={input.name}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.toggle}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {touched && error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default RenderField;
