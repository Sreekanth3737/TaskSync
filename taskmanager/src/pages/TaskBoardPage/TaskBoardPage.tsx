import { useState } from "react";
import TaskBoard from "../../components/organisms/TaskBoard/TaskBoard";
import TaskForm from "../../components/molecules/TaskForm/TaskForm";
import Modal from "../../components/organisms/Modal/Modal";
import { DragEndEvent } from "@dnd-kit/core";
import Button from "../../components/atoms/Button/Button";

interface Tag {
  text: string;
  color?: string;
}

interface Assignee {
  name: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  tags?: Tag[];
  assignee?: Assignee;
  status: string;
}

interface FormFieldConfig {
  name: string;
  label: string;
  type: "input" | "textarea" | "tag" | "checkbox";
  required?: boolean;
  minLength?: number;
}

const columns = [
  { id: "todo", title: "To Do", status: "todo" },
  { id: "inprogress", title: "In Progress", status: "inprogress" },
  { id: "done", title: "Done", status: "done" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design login page",
    description: "Create a responsive login page UI",
    tags: [{ text: "UI", color: "#42a5f5" }],
    assignee: { name: "Alice" },
    status: "todo",
  },
  {
    id: "2",
    title: "Setup database",
    tags: [{ text: "Backend", color: "#66bb6a" }],
    assignee: { name: "Bob" },
    status: "inprogress",
  },
  {
    id: "3",
    title: "Write tests",
    tags: [{ text: "Testing", color: "#ffa726" }],
    assignee: { name: "Charlie" },
    status: "done",
  },
];

const fields: FormFieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: "input",
    required: true,
    minLength: 3,
  },
  { name: "description", label: "Description", type: "textarea" },
  { name: "tags", label: "Tags", type: "tag" },
  { name: "completed", label: "Completed", type: "checkbox" },
];

const TaskBoardPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = (data: Partial<Task>) => {
    // Convert tags: string[] to tags: { text: string }[]
    const tags = Array.isArray(data.tags)
      ? Array.isArray(data.tags) && typeof data.tags[0] === "string"
        ? data.tags.map((t) =>
            typeof t === "string" ? { text: t } : (t as Tag)
          )
        : []
      : [];

    if (editingTask) {
      setTasks((tasks) =>
        tasks.map((t) =>
          t.id === editingTask.id ? { ...t, ...data, tags } : t
        )
      );
    } else {
      setTasks((tasks) => [
        ...tasks,
        {
          ...data,
          id: Date.now().toString(),
          status: "todo",
          title: data.title || "Untitled Task",
          tags,
        },
      ]);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Find the task being dragged
    const draggedTask = tasks.find((t) => t.id === active.id);
    if (!draggedTask) return;

    // Find the column where the task was dropped
    const overColumn = columns.find(
      (col) =>
        tasks
          .filter((task) => task.status === col.status)
          .map((task) => task.id)
          .includes(over.id as string) || col.status === over.id // If dropped on empty column
    );

    if (!overColumn) return;

    // If dropped in a new column, update status
    if (draggedTask.status !== overColumn.status) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggedTask.id
            ? { ...task, status: overColumn.status }
            : task
        )
      );
    } else {
      // Reorder within the same column
      const columnTasks = tasks.filter(
        (task) => task.status === draggedTask.status
      );
      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newColumnTasks = [...columnTasks];
        const [moved] = newColumnTasks.splice(oldIndex, 1);
        newColumnTasks.splice(newIndex, 0, moved);

        // Merge reordered column tasks back into the full tasks array
        const otherTasks = tasks.filter(
          (task) => task.status !== draggedTask.status
        );
        setTasks([...otherTasks, ...newColumnTasks]);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleAddTask} text="Add Task" variant="success" />
      <TaskBoard
        columns={columns}
        tasks={tasks}
        onTaskClick={handleEditTask}
        onDragEnd={handleDragEnd}
      />
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTask(null);
        }}
        size="medium"
      >
        <TaskForm
          fields={fields}
          initialValues={
            editingTask
              ? {
                  ...editingTask,
                  tags: editingTask.tags?.map((tag) => tag.text) || [],
                  assignee: editingTask.assignee?.name || "",
                }
              : {}
          }
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default TaskBoardPage;
