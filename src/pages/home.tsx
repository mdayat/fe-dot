import { TaskCard } from "@components/TaskCard";
import { TaskCardSkeleton } from "@components/TaskCardSkeleton";
import { TaskEmpty } from "@components/TaskEmpty";
import { useState, useMemo } from "react";
import styled from "styled-components";

export interface Task {
  id: string;
  title: string;
  description: string;
  finished: boolean;
  created_at: string;
}

const Container = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 2rem;
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

// TODO:
const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.$active ? "#3182ce" : "#edf2f7")};
  color: ${(props) => (props.$active ? "white" : "#4a5568")};
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? "#2c5282" : "#e2e8f0")};
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

function Home() {
  const [isLoading, setIsLoading] = useState(true);
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
      <Title>Task List</Title>

      <FilterContainer>
        <FilterButton
          $active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </FilterButton>
        <FilterButton
          $active={filter === "finished"}
          onClick={() => setFilter("finished")}
        >
          Finished
        </FilterButton>
        <FilterButton
          $active={filter === "unfinished"}
          onClick={() => setFilter("unfinished")}
        >
          Unfinished
        </FilterButton>
      </FilterContainer>

      {isLoading ? (
        <TaskGrid>
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
        </TaskGrid>
      ) : filteredTasks.length > 0 ? (
        <TaskGrid>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task}></TaskCard>
          ))}
        </TaskGrid>
      ) : (
        <TaskEmpty />
      )}
    </Container>
  );
}

export { Home };
