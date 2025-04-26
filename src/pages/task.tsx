import { TaskCard } from "@components/TaskCard";
import { Button } from "@components/Button";
import { TaskEmpty } from "@components/TaskEmpty";
import { useState, useMemo } from "react";
import styled from "styled-components";
import { PlusIcon } from "@radix-ui/react-icons";
import { TaskModal } from "@components/TaskModal";

export interface Task {
  id: string;
  title: string;
  description: string;
  finished: boolean;
}

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

const TaskCreateButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  flex-direction: column;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

function TaskPage() {
  const [opened, setOpened] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "finished" | "unfinished">(
    "all"
  );

  const filteredTasks = useMemo((): Task[] => {
    return tasks.filter((task) => {
      if (filter === "all") {
        return true;
      } else if (filter === "finished") {
        return task.finished;
      } else if (filter === "unfinished") {
        return !task.finished;
      } else {
        return true;
      }
    });
  }, [filter, tasks]);

  return (
    <Container>
      <ContainerHeader>
        <Title>Task List</Title>
        <TaskCreateButton
          onClick={() => setOpened(true)}
          type="button"
          color="primary"
        >
          Create <PlusIcon />
        </TaskCreateButton>
      </ContainerHeader>

      {opened && (
        <TaskModal type="create" setOpened={setOpened} setTasks={setTasks} />
      )}

      <FilterContainer>
        <Button
          type="button"
          color={filter === "all" ? "primary" : "secondary"}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </Button>

        <Button
          type="button"
          color={filter === "finished" ? "success" : "secondary"}
          onClick={() => setFilter("finished")}
        >
          Finished
        </Button>

        <Button
          type="button"
          color={filter === "unfinished" ? "warning" : "secondary"}
          onClick={() => setFilter("unfinished")}
        >
          Unfinished
        </Button>
      </FilterContainer>

      {filteredTasks.length > 0 ? (
        <TaskGrid>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} setTasks={setTasks} />
          ))}
        </TaskGrid>
      ) : (
        <TaskEmpty />
      )}
    </Container>
  );
}

export { TaskPage };
