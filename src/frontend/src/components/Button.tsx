import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => (
  <button className={`button button-${variant} ${className || ""}`} {...props}>
    {children}
  </button>
);

export default Button;
