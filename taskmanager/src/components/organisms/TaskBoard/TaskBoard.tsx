import React from "react";
import styles from "./TaskBoard.module.scss";
import TaskColumn, { Task } from "../TaskColumn/TaskColumn";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export interface TaskBoardColumn {
  id: string;
  title: string;
  status: string;
}

interface TaskBoardProps {
  columns: TaskBoardColumn[];
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  columns,
  tasks,
  onTaskClick,
  onDragEnd,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className={styles.board}>
        {columns.map((col) => (
          <SortableContext
            key={col.id}
            items={tasks
              .filter((task) => task.status === col.status)
              .map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <TaskColumn
              title={col.title}
              tasks={tasks.filter((task) => task.status === col.status)}
              onTaskClick={onTaskClick}
              droppableId={col.status}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
