import React from "react";
import styles from "./Tag.module.scss";

interface TagProps {
  text: string;
  color?: string; // Optional: allow custom color
}

const Tag: React.FC<TagProps> = ({ text, color }) => (
  <span className={styles.tag} style={color ? { backgroundColor: color } : {}}>
    {text}
  </span>
);

export default Tag;
