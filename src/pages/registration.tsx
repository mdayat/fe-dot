import { Button } from "@components/Button";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { userManager, userSchema } from "../dummy";
import { toast } from "react-toastify";

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

function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = userSchema
      .pick({ email: true, password: true, name: true })
      .safeParse({ email, password, name: username });

    if (result.error) {
      toast("Invalid registration data", { type: "error", theme: "colored" });
      console.error(result.error);
      return;
    }

    userManager.register({ email, password, name: username });
    toast("Account created, please login to continue", {
      type: "success",
      theme: "colored",
    });
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormTitle>Create an Account</FormTitle>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              required
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              id="username"
              type="text"
              placeholder="Choose a username"
            />
          </FormGroup>

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
              placeholder="Create a password"
            />
          </FormGroup>

          <Button type="submit">Register</Button>
        </Form>

        <SwitchPageText>
          Already have an account?&nbsp;
          <SwitchPageLink onClick={() => navigate("/login")}>
            Log In
          </SwitchPageLink>
        </SwitchPageText>
      </FormContainer>
    </PageContainer>
  );
}

export { Registration };
