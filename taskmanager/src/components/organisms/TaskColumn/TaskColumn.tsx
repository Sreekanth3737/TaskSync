import React from "react";
import styles from "./TaskColumn.module.scss";
import TaskCard from "../../molecules/TaskCard/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableItem } from "./helper/SortableItem";

export interface Task {
  id: string;
  title: string;
  description?: string;
  tags?: { text: string; color?: string }[];
  assignee?: { name: string; avatarUrl?: string };
  status: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  droppableId: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  onTaskClick,
  droppableId,
}) => {
  const { setNodeRef } = useDroppable({ id: droppableId });

  return (
    <div className={styles.column} ref={setNodeRef}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <SortableItem key={task.id} id={task.id}>
            <TaskCard
              title={task.title}
              description={task.description}
              tags={task.tags}
              assignee={task.assignee}
              onClick={() => onTaskClick?.(task)}
            />
          </SortableItem>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
