import { type Dispatch, type SetStateAction } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CartEmpty } from "./CartEmpty";
import type { Product } from "../pages/product";
import { CartItemCard } from "./CartItemCard";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 384px;
  max-height: 80vh;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 1.5rem;
  cursor: pointer;
  color: #1a202c;

  &:hover {
    color: #f59e0b;
  }
`;

const CloseIcon = styled(Cross2Icon)`
  width: 24px;
  height: 24px;
`;

const CartFooter = styled.div`
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 0 0 1rem 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #1a202c;
`;

const TotalValue = styled.span`
  color: #f59e0b;
`;

const ActionBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

interface CartModalProps {
  setOpened: Dispatch<SetStateAction<boolean>>;
  cartItems: Product[];
}

function CartModal({ cartItems, setOpened }: CartModalProps) {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Shopping Cart</ModalTitle>
          <CloseButton onClick={() => setOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemCard key={item.id} cartItem={item} />
          ))
        ) : (
          <CartEmpty setOpened={setOpened} />
        )}

        {cartItems.length > 0 && (
          <>
            <CartFooter>
              <SummaryRow>
                <span>Total</span>
                <TotalValue>
                  $
                  {cartItems
                    .reduce((acc, curr) => acc + curr.price, 0)
                    .toFixed(2)}
                </TotalValue>
              </SummaryRow>

              <ActionBar>
                <Button
                  onClick={() => setOpened(false)}
                  type="button"
                  color="secondary"
                >
                  Continue Shopping
                </Button>

                <Button disabled type="button" color="warning">
                  Checkout
                </Button>
              </ActionBar>
            </CartFooter>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
}

export { CartModal };
