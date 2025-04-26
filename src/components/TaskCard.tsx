import styled from "styled-components";
import type { Task } from "../pages/home";
import { format } from "date-fns";

const StyledTaskCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TaskTitle = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  font-weight: 600;
`;

const Badge = styled.span<{ $finished: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) => (props.$finished ? "#48bb78" : "#f56565")};
  color: white;
  white-space: nowrap;
`;

const TaskDescription = styled.p`
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const TaskFooter = styled.div`
  width: fit-content;
  margin-left: auto;
  color: #718096;
  font-size: 0.875rem;
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "MMMM d, yyyy");
};

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <StyledTaskCard>
      <TaskHeader>
        <TaskTitle>{task.title}</TaskTitle>
        <Badge $finished={task.finished}>
          {task.finished ? "Finished" : "Unfinished"}
        </Badge>
      </TaskHeader>

      <TaskDescription>{task.description}</TaskDescription>
      <TaskFooter>Created on {formatDate(task.created_at)}</TaskFooter>
    </StyledTaskCard>
  );
}

export { TaskCard };
