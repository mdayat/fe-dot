import styled from "styled-components";
import type { Product } from "../pages/product";

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ItemDetails = styled.div`
  width: 100%;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

const ItemName = styled.h3`
  font-weight: 600;
  color: #1a202c;
`;

const ItemBadge = styled.span<{ $inStock: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.$inStock ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${(props) => (props.$inStock ? "#10b981" : "#ef4444")};
  white-space: nowrap;
`;

const Price = styled.div`
  font-weight: 600;
  color: #f59e0b;
`;

interface CartItemCardProps {
  cartItem: Product;
}

function CartItemCard({ cartItem }: CartItemCardProps) {
  return (
    <CartItem key={cartItem.id}>
      <ItemImage>📦</ItemImage>
      <ItemDetails>
        <ItemHeader>
          <ItemName>{cartItem.name}</ItemName>
          <ItemBadge $inStock={cartItem.inStock}>
            {cartItem.inStock ? "In Stock" : "Out of Stock"}
          </ItemBadge>
        </ItemHeader>
        <Price>${cartItem.price.toFixed(2)}</Price>
      </ItemDetails>
    </CartItem>
  );
}

export { CartItemCard };
