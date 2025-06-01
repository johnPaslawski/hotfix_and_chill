import React, { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  special?: boolean;
  gradient1?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  special = false,
  gradient1 = false,
  children,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  if (special) {
    return (
      <button
        style={{
          ...(gradient1
              ? isHovered
                  ? {
                      backgroundColor: "#FD1D1D",
                      background: "linear-gradient(22deg, rgba(253, 29, 29, 1) 0%, rgba(252, 176, 69, 1) 100%)",
                  }
                  : {
                      backgroundColor: "#FD1D1D",
                      background: "linear-gradient(22deg, rgba(253, 29, 29, 1) 0%, rgba(252, 176, 69, 1) 100%)",
                  }
              : {}),
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.3s ease-in-out, background 0.3s ease-in-out,",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`button button-${variant} ${className || ""} py-6 px-12`}
        {...props}
      >
        <h1 className={'text-2xl'}>{children}</h1>
      </button>
    );
  }
  return (
    <button
      style={{
        ...(gradient1
          ? isHovered
            ? {
                    backgroundColor: "#FD1D1D",
                    background: "linear-gradient(22deg, rgba(253, 29, 29, 1) 0%, rgba(252, 176, 69, 1) 100%)",
                }
                : {
                    backgroundColor: "#FD1D1D",
                    background: "linear-gradient(22deg, rgba(253, 29, 29, 1) 0%, rgba(252, 176, 69, 1) 100%)",
                }
          : {}),
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s ease-in-out, background 0.3s ease-in-out",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`button button-${variant} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
