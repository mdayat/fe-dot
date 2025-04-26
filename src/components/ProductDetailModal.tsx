import { type Dispatch, type SetStateAction } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Product } from "../pages/product";

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
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (min-width: 768px) {
    max-width: 768px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  gap: 1rem;
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

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;
  overflow-y: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ProductImageContainer = styled.div`
  flex: 1;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 256px;
  background-color: #f3f4f6;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
`;

const ProductInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    max-height: 256px;
    overflow-y: scroll;
  }
`;

const ProductStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #f59e0b;
`;

const StockBadge = styled.span<{ $inStock: boolean }>`
  background-color: ${(props) =>
    props.$inStock ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${(props) => (props.$inStock ? "#10b981" : "#ef4444")};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

interface ProductDetailModalProps {
  product: Product;
  cartItems: Product[];
  setOpened: Dispatch<SetStateAction<boolean>>;
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

function ProductDetailModal({
  product,
  cartItems,
  setCartItems,
  setOpened,
}: ProductDetailModalProps) {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{product.name}</ModalTitle>
          <CloseButton onClick={() => setOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>

        <ProductContent>
          <ProductImageContainer>
            <ProductImage>📦</ProductImage>
          </ProductImageContainer>

          <ProductInfoContainer>
            <ProductStatus>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              <StockBadge $inStock={product.inStock}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </StockBadge>
            </ProductStatus>

            <ProductDescription>{product.description}</ProductDescription>

            <Button
              disabled={
                !product.inStock ||
                !!cartItems.find((item) => item.id === product.id)
              }
              onClick={() => setCartItems((items) => [...items, product])}
              type="button"
              color="warning"
            >
              Add to Cart
            </Button>
          </ProductInfoContainer>
        </ProductContent>
      </ModalContainer>
    </ModalOverlay>
  );
}

export { ProductDetailModal };
