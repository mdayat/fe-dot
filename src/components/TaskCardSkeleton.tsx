import styled from "styled-components";

const SkeletonPulse = styled.div<{ $borderRadius?: string }>`
  width: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: pulse 1.5s ease-in-out infinite;
  border-radius: ${(props) => props.$borderRadius || "0.25rem"};

  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -200% 0%;
    }
  }
`;

const SkeletonCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const SkeletonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkeletonTitle = styled(SkeletonPulse)`
  height: 1.5rem;
  width: 60%;
`;

const SkeletonBadge = styled(SkeletonPulse)`
  height: 1.25rem;
  width: 25%;
  border-radius: 9999px;
`;

const SkeletonDescription = styled(SkeletonPulse)`
  height: 3rem;
  margin-bottom: 1rem;
`;

const SkeletonFooter = styled(SkeletonPulse)`
  height: 1rem;
  width: 45%;
  margin-left: auto;
`;

function TaskCardSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonHeader>
        <SkeletonTitle />
        <SkeletonBadge />
      </SkeletonHeader>
      <SkeletonDescription />
      <SkeletonFooter />
    </SkeletonCard>
  );
}

export { TaskCardSkeleton };
