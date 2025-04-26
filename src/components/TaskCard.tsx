import styled, { css } from "styled-components";
import type { Task } from "../pages/home";
import { Button } from "./Button";
import { useState, type Dispatch, type SetStateAction } from "react";
import { TaskDeleteModal } from "./TaskDeleteModal";
import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";

const StyledTaskCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CheckboxButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
`;

const CheckboxUnchecked = styled(CircleIcon)`
  width: 24px;
  height: 24px;
  color: #4a5568;
`;

const CheckboxChecked = styled(CheckCircledIcon)`
  width: 24px;
  height: 24px;
  color: #48bb78;
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

const TaskContent = styled.div<{ $finished: boolean }>`
  margin-bottom: 1.5rem;
  ${(props) =>
    props.$finished &&
    css`
      text-decoration: line-through;
      opacity: 0.7;
    `}
`;

const TaskTitle = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  font-weight: 600;
  word-break: break-word;
  margin-bottom: 0.5rem;
`;

const TaskDescription = styled.p`
  color: #4a5568;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TaskFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

interface TaskCardProps {
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function TaskCard({ task, setTasks }: TaskCardProps) {
  const [opened, setOpened] = useState(false);

  const toggleTaskCompletion = () => {
    setTasks((tasks) =>
      tasks.map((item) => {
        if (item.id !== task.id) {
          return item;
        }

        return { ...item, finished: !item.finished };
      })
    );
  };

  return (
    <>
      <StyledTaskCard>
        <TaskHeader>
          <Badge $finished={task.finished}>
            {task.finished ? "Finished" : "Unfinished"}
          </Badge>

          <CheckboxButton onClick={toggleTaskCompletion} type="button">
            {task.finished ? <CheckboxChecked /> : <CheckboxUnchecked />}
          </CheckboxButton>
        </TaskHeader>

        <TaskContent $finished={task.finished}>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDescription>{task.description}</TaskDescription>
        </TaskContent>

        <TaskFooter>
          <Button color="primary" size="small" onClick={() => setOpened(true)}>
            Edit
          </Button>

          <Button color="danger" size="small" onClick={() => setOpened(true)}>
            Delete
          </Button>
        </TaskFooter>
      </StyledTaskCard>

      {opened && (
        <TaskDeleteModal
          task={task}
          setTasks={setTasks}
          setOpened={setOpened}
        />
      )}
    </>
  );
}

export { TaskCard };
