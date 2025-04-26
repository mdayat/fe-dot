import styled from "styled-components";

const StyledProductEmpty = styled.div`
  text-align: center;
  padding: 2rem 1.5rem;
  background-color: #f7fafc;
  border-radius: 0.75rem;
  border: 2px dashed #f59e0b;
`;

const ProductEmptyTitle = styled.h3`
  color: #4a5568;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ProductEmptyText = styled.p`
  max-width: 512px;
  margin: 0 auto;
  color: #718096;
  line-height: 1.25;
`;

function ProductEmpty() {
  return (
    <StyledProductEmpty>
      <ProductEmptyTitle>No products found</ProductEmptyTitle>
      <ProductEmptyText>
        There are no products to be displayed.
      </ProductEmptyText>
    </StyledProductEmpty>
  );
}

export { ProductEmpty };
