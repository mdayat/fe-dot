import styled from "styled-components";

const StyledTaskEmpty = styled.div`
  text-align: center;
  padding: 2rem 1.5rem;
  background-color: #f7fafc;
  border-radius: 0.75rem;
  border: 2px dashed #cbd5e0;
`;

const TaskEmptyTitle = styled.h3`
  color: #4a5568;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const TaskEmptyText = styled.p`
  max-width: 512px;
  margin: 0 auto;
  color: #718096;
  line-height: 1.25;
`;

function TaskEmpty() {
  return (
    <StyledTaskEmpty>
      <TaskEmptyTitle>No tasks found</TaskEmptyTitle>
      <TaskEmptyText>
        There are no tasks that match your current filter. Try changing your
        filter or create a new task.
      </TaskEmptyText>
    </StyledTaskEmpty>
  );
}

export { TaskEmpty };
