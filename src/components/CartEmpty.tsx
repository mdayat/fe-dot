import styled from "styled-components";
import { Button } from "./Button";
import type { Dispatch, SetStateAction } from "react";

const StyledCartEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  text-align: center;
`;

const CartEmptyIcon = styled.div`
  font-size: 4rem;
  color: #e2e8f0;
  margin-bottom: 1rem;
`;

const CartEmptyText = styled.p`
  color: #718096;
  margin-bottom: 1.5rem;
`;

interface CartEmptyProps {
  setOpened: Dispatch<SetStateAction<boolean>>;
}

function CartEmpty({ setOpened }: CartEmptyProps) {
  return (
    <StyledCartEmpty>
      <CartEmptyIcon>🛒</CartEmptyIcon>
      <CartEmptyText>Your cart is empty</CartEmptyText>
      <Button onClick={() => setOpened(false)} type="button" color="secondary">
        Continue Shopping
      </Button>
    </StyledCartEmpty>
  );
}

export { CartEmpty };
