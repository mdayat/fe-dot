import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../pages/home";

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
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  &::placeholder {
    color: #aaa;
    font-family: "Poppins", sans-serif;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  font-family: "Poppins", sans-serif;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const FormActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`;

interface TaskCreateModalProps {
  type: "create" | "edit";
  task?: Task;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function TaskModal({ type, task, setOpened, setTasks }: TaskCreateModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (type === "create") {
      setTasks((tasks) => [
        ...tasks,
        { id: uuidv4(), finished: false, title, description },
      ]);
    } else {
      setTasks((tasks) =>
        tasks.map((item) => {
          if (item.id !== (task?.id ?? "")) {
            return item;
          }

          return { ...item, title, description };
        })
      );
    }

    setOpened(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{type === "create" ? "Create" : "Edit"} Task</ModalTitle>

        <Form onSubmit={handleSubmit} autoComplete="off">
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              required
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              id="title"
              type="text"
              placeholder="Task title"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              required
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              id="description"
              placeholder="Task description"
            />
          </FormGroup>

          <FormActions>
            <Button
              type="button"
              color="secondary"
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>

            <Button
              disabled={
                type === "edit" &&
                title === task?.title &&
                description === task.description
              }
              type="submit"
              color="primary"
            >
              {type === "create" ? "Create" : "Edit"}
            </Button>
          </FormActions>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export { TaskModal };
