import styled from "styled-components";
import { Button } from "./Button";
import type { Product } from "../pages/product";

const StyledProductCard = styled.div`
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  height: 180px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ProductInfo = styled.div`
  height: calc(100% - 180px - 40px);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
`;

const Badge = styled.span<{ $inStock: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) => (props.$inStock ? "#f59e0b" : "#f56565")};
  color: white;
  white-space: nowrap;
`;

const ProductPrice = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: #f59e0b;
  margin-bottom: 0.75rem;
`;

const ProductDescription = styled.p`
  color: #718096;
  font-size: 0.875rem;
  line-height: 1.25;
  margin-bottom: 1.5rem;
`;

const ActionBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <StyledProductCard key={product.id}>
      <ProductImage>📦</ProductImage>
      <ProductInfo>
        <ProductInfoHeader>
          <ProductName>{product.name}</ProductName>
          <Badge $inStock={product.inStock}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </ProductInfoHeader>

        <div>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
        </div>

        <ActionBar>
          <Button type="button" color="warning">
            Add to Cart
          </Button>

          <Button type="button" color="secondary">
            View Detail
          </Button>
        </ActionBar>
      </ProductInfo>
    </StyledProductCard>
  );
}

export { ProductCard };
