import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

type ButtonShape = "rounded" | "pill" | "square";
type ButtonSize = "small" | "medium";
type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  shape?: ButtonShape;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const StyledButton = styled.button<{
  $shape: ButtonShape;
  $size: ButtonSize;
  $color: ButtonColor;
  $fullWidth: boolean;
  $isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  ${(props) => {
    switch (props.$shape) {
      case "pill":
        return css`
          border-radius: 9999px;
        `;
      case "square":
        return css`
          border-radius: 0;
        `;
      case "rounded":
      default:
        return css`
          border-radius: 6px;
        `;
    }
  }}

  ${(props) => {
    switch (props.$size) {
      case "medium":
        return css`
          padding: 8px 16px;
          font-size: 16px;
          height: 40px;
        `;
      case "small":
      default:
        return css`
          padding: 8px 16px;
          font-size: 14px;
          height: 36px;
        `;
    }
  }}
  
  ${(props) => {
    switch (props.$color) {
      case "secondary":
        return css`
          background-color: #6c757d;
          color: white;
          &:hover:not(:disabled) {
            background-color: #5a6268;
          }
        `;
      case "success":
        return css`
          background-color: #28a745;
          color: white;
          &:hover:not(:disabled) {
            background-color: #218838;
          }
        `;
      case "danger":
        return css`
          background-color: #dc3545;
          color: white;
          &:hover:not(:disabled) {
            background-color: #c82333;
          }
        `;
      case "warning":
        return css`
          background-color: #ffc107;
          color: #212529;
          &:hover:not(:disabled) {
            background-color: #e0a800;
          }
        `;
      case "info":
        return css`
          background-color: #17a2b8;
          color: white;
          &:hover:not(:disabled) {
            background-color: #138496;
          }
        `;
      case "primary":
      default:
        return css`
          background-color: #0070f3;
          color: white;
          &:hover:not(:disabled) {
            background-color: #0051cc;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  ${(props) =>
    props.$isLoading &&
    css`
      font-style: italic;
      opacity: 0.65;
      cursor: not-allowed;
    `}
`;

export const Button = ({
  children,
  shape = "rounded",
  size = "small",
  color = "primary",
  fullWidth = false,
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $shape={shape}
      $size={size}
      $color={color}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
