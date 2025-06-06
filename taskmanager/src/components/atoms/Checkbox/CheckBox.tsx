import React from "react";
import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, label }) => (
  <label className={styles.checkboxLabel}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={styles.checkbox}
    />
    <span className={styles.customCheckbox} />
    {label && <span className={styles.labelText}>{label}</span>}
  </label>
);

export default CheckBox;
