// src/components/molecules/TaskForm/types.ts
export type FieldType = "input" | "textarea" | "checkbox" | "tag";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  // For checkbox
  checkedLabel?: string;
  uncheckedLabel?: string;
}
