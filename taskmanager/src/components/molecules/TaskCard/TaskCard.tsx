import React from "react";
import styles from "./TaskCard.module.scss";
import Tag from "../../atoms/Tag/Tag";
import Avatar from "../../atoms/Avatar/Avatar";

interface TaskCardProps {
  title: string;
  description?: string;
  tags?: { text: string; color?: string }[];
  assignee?: { name: string; avatarUrl?: string };
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  tags,
  assignee,
  onClick,
}) => (
  <div className={styles.taskCard} onClick={onClick}>
    <div className={styles.header}>
      <h4 className={styles.title}>{title}</h4>
      {assignee && (
        <Avatar src={assignee.avatarUrl} name={assignee.name} size={28} />
      )}
    </div>
    {description && <p className={styles.description}>{description}</p>}
    <div className={styles.footer}>
      {tags &&
        tags.map((tag, idx) => (
          <Tag key={idx} text={tag.text} color={tag.color} />
        ))}
    </div>
  </div>
);

export default TaskCard;
