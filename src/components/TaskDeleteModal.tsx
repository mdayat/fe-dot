import styled from "styled-components";
import { Button } from "./Button";
import type { Dispatch, SetStateAction } from "react";
import type { Task } from "../pages/task";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 384px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    margin: 0 1rem;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
  line-height: 1.25;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

interface TaskDeleteModalProps {
  task: Task;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function TaskDeleteModal({ task, setOpened, setTasks }: TaskDeleteModalProps) {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Confirm Deletion</ModalTitle>

        <ModalBody>Are you sure you want to delete this task?</ModalBody>

        <ModalFooter>
          <Button
            type="button"
            color="secondary"
            onClick={() => setOpened(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            color="danger"
            onClick={() => {
              setOpened(false);
              setTasks((tasks) => tasks.filter((item) => item.id !== task.id));
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

export { TaskDeleteModal };
