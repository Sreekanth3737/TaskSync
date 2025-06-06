import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "info" | "danger" | "warning" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};
const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  size = "medium",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ""}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default React.memo(Button);
