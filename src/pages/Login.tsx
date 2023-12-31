import { SignInForm } from "@/features/authentication/SignInForm";
import { Heading, Logo } from "@/ui";
import styled from "styled-components";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export const Login = () => (
  <LoginLayout>
    <Logo />
    <Heading as="h4">Log in to your account</Heading>
    <SignInForm />
  </LoginLayout>
);
