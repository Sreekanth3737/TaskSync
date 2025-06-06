import React from "react";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number; // px
  name?: string; // fallback initials
}

const getInitials = (name?: string) => {
  if (!name) return "";
  const names = name.split(" ");
  return names
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 32, name }) => (
  <div
    className={styles.avatar}
    style={{ width: size, height: size, fontSize: size / 2 }}
  >
    {src ? (
      <img src={src} alt={alt || "avatar"} className={styles.img} />
    ) : (
      <span className={styles.initials}>{getInitials(name)}</span>
    )}
  </div>
);

export default Avatar;
