import { ProductCard } from "@components/ProductCard";
import { ProductEmpty } from "@components/ProductEmpty";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem;
`;

const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  font-weight: 600;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Wireless Earbuds",
        price: 79.99,
        description: "Premium wireless earbuds with noise cancellation.",
        inStock: true,
      },
      {
        id: 2,
        name: "Coffee Maker",
        price: 129.99,
        description: "Automatic coffee maker with timer function.",
        inStock: true,
      },
      {
        id: 3,
        name: "Running Shoes",
        price: 89.95,
        description: "Lightweight running shoes with extra cushioning.",
        inStock: false,
      },
      {
        id: 4,
        name: "Smart Watch",
        price: 199.99,
        description: "Fitness tracker with heart rate monitoring.",
        inStock: true,
      },
      {
        id: 5,
        name: "Yoga Mat",
        price: 24.95,
        description: "Non-slip yoga mat for home workouts.",
        inStock: true,
      },
      {
        id: 6,
        name: "Blender",
        price: 59.99,
        description: "High-speed blender for smoothies and soups.",
        inStock: true,
      },
    ]);
  }, []);

  return (
    <Container>
      <ContainerHeader>
        <Title>Product Store</Title>
      </ContainerHeader>

      {products.length > 0 ? (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <ProductEmpty />
      )}
    </Container>
  );
}

export { ProductPage };
export type { Product };
