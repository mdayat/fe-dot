import {
  useOnboardingContext,
  type OnboardingContextType,
} from "@contexts/OnboardingProvider";
import { useState } from "react";
import { Button } from "./Button";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  animation: ${slideIn} 0.4s ease-out;
`;

const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
`;

const ModalSubtitle = styled.p`
  color: #718096;
  margin-top: 0.75rem;
  font-size: 1.1rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const AppOptionCard = styled.div<{ $selected: boolean }>`
  flex: 1;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 2px solid ${(props) => (props.$selected ? "#0070f3" : "#e2e8f0")};
  background-color: ${(props) =>
    props.$selected ? "rgba(0, 112, 243, 0.05)" : "white"};

  &:hover {
    transform: translateY(-5px);
  }
`;

const AppIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: white;
`;

const TaskAppIcon = styled(AppIcon)`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
`;

const ProductAppIcon = styled(AppIcon)`
  background: linear-gradient(135deg, #f59e0b, #ef4444);
`;

const AppTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #1a202c;
  font-size: 1.25rem;
  font-weight: 600;
`;

const AppDescription = styled.p`
  color: #718096;
  line-height: 1.5;
`;

const ContinueButton = styled(Button)`
  display: block;
  margin: 0 2rem 1.5rem 2rem;
  width: 100%;

  @media (min-width: 480px) {
    width: fit-content;
    margin-left: auto;
  }
`;

function Onboarding() {
  const [selectedApp, setSelectedApp] =
    useState<OnboardingContextType["selectedApp"]>("task");

  const { handleAppSelect } = useOnboardingContext();

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Welcome to MultiApp</ModalTitle>
          <ModalSubtitle>Choose an application to get started</ModalSubtitle>
        </ModalHeader>

        <OptionsContainer>
          <AppOptionCard
            $selected={selectedApp === "task"}
            onClick={() => setSelectedApp("task")}
          >
            <TaskAppIcon>📋</TaskAppIcon>
            <AppTitle>Task Management</AppTitle>
            <AppDescription>
              Stay organized and manage your daily tasks efficiently.
            </AppDescription>
          </AppOptionCard>

          <AppOptionCard
            $selected={selectedApp === "product"}
            onClick={() => setSelectedApp("product")}
          >
            <ProductAppIcon>🛒</ProductAppIcon>
            <AppTitle>Product Store</AppTitle>
            <AppDescription>
              Browse products and add items to your shopping cart.
            </AppDescription>
          </AppOptionCard>
        </OptionsContainer>

        <ContinueButton
          onClick={() => handleAppSelect(selectedApp)}
          type="button"
          color="primary"
        >
          Continue
        </ContinueButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export { Onboarding };
