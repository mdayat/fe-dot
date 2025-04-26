import { Button } from "@components/Button";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";
import { userManager, userSchema } from "../dummy";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 24px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 384px;
  padding: 24px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  &::placeholder {
    color: #aaa;
    font-family: "Poppins", sans-serif;
  }
`;

const SwitchPageText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const SwitchPageLink = styled.button`
  background: none;
  border: none;
  padding: 0px;
  color: #4a90e2;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = userSchema
      .pick({ email: true, password: true })
      .safeParse({ email, password });

    if (result.error) {
      toast("Wrong email or password", { type: "error", theme: "colored" });
      console.error(result.error);
      return;
    }

    try {
      userManager.login({ email, password });
      toast("Login successful", { type: "success", theme: "colored" });
    } catch (error) {
      toast("User not found", { type: "error", theme: "colored" });
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormTitle>Log In</FormTitle>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              required
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              required
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </FormGroup>

          <Button type="submit">Log In</Button>
        </Form>

        <SwitchPageText>
          Don't have an account?&nbsp;
          <SwitchPageLink onClick={() => navigate("/register")}>
            Register
          </SwitchPageLink>
        </SwitchPageText>
      </FormContainer>
    </PageContainer>
  );
}

export { Login };
