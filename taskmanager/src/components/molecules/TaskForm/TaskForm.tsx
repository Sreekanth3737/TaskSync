import React, { useReducer } from "react";
import styles from "./TaskForm.module.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Tag from "../../atoms/Tag/Tag";
import CheckBox from "../../atoms/Checkbox/CheckBox";
import { FormFieldConfig } from "./types";

type FormFieldValue = string | boolean | string[];
type FormState = Record<string, FormFieldValue>;
type FormErrors = Record<string, string | null>;

interface TaskFormProps {
  fields: FormFieldConfig[];
  initialValues?: FormState;
  onSubmit: (data: FormState) => void;
  onCancel?: () => void;
}

type Action =
  | { type: "CHANGE"; name: string; value: FormFieldValue }
  | { type: "ADD_TAG"; value: string }
  | { type: "REMOVE_TAG"; value: string }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "RESET" };

interface FormReducerState {
  values: FormState;
  errors: FormErrors;
}

function formReducer(
  state: FormReducerState,
  action: Action
): FormReducerState {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: null },
      };
    case "ADD_TAG":
      return {
        ...state,
        values: {
          ...state.values,
          tags: [...((state.values.tags as string[]) || []), action.value],
        },
      };
    case "REMOVE_TAG":
      return {
        ...state,
        values: {
          ...state.values,
          tags: ((state.values.tags as string[]) || []).filter(
            (t: string) => t !== action.value
          ),
        },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET":
      return { values: {}, errors: {} };
    default:
      return state;
  }
}

const TaskForm: React.FC<TaskFormProps> = ({
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
}) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: { ...initialValues, tags: initialValues.tags || [] },
    errors: {},
  });

  // Validation
  const validate = (): boolean => {
    const errors: FormErrors = {};
    fields.forEach((field) => {
      const value = state.values[field.name];
      if (field.required && !value) {
        errors[field.name] = `${field.label} is required`;
      }
      if (
        field.minLength &&
        typeof value === "string" &&
        value.length < field.minLength
      ) {
        errors[field.name] =
          `${field.label} must be at least ${field.minLength} characters`;
      }
      if (
        field.maxLength &&
        typeof value === "string" &&
        value.length > field.maxLength
      ) {
        errors[field.name] =
          `${field.label} must be at most ${field.maxLength} characters`;
      }
    });
    dispatch({ type: "SET_ERRORS", errors });
    return Object.keys(errors).length === 0;
  };

  const handleChange = (name: string, value: FormFieldValue) => {
    dispatch({ type: "CHANGE", name, value });
  };

  const handleAddTag = (tag: string) => {
    if (tag && !((state.values.tags as string[]) || []).includes(tag)) {
      dispatch({ type: "ADD_TAG", value: tag });
    }
  };

  const handleRemoveTag = (tag: string) => {
    dispatch({ type: "REMOVE_TAG", value: tag });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(state.values);
    }
  };

  // For tag input
  const [tagInput, setTagInput] = React.useState("");

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit} noValidate>
      {fields.map((field) => {
        switch (field.type) {
          case "input":
            return (
              <div key={field.name}>
                <Input
                  value={(state.values[field.name] as string) || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  name={field.name}
                  disabled={false}
                  error={state.errors[field.name] || undefined}
                />
                {state.errors[field.name] && (
                  <div className={styles.error}>{state.errors[field.name]}</div>
                )}
              </div>
            );
          case "textarea":
            return (
              <div key={field.name}>
                <label>
                  {field.label}
                  <textarea
                    className={styles.textarea}
                    value={(state.values[field.name] as string) || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    required={field.required}
                  />
                </label>
                {state.errors[field.name] && (
                  <div className={styles.error}>{state.errors[field.name]}</div>
                )}
              </div>
            );
          case "checkbox":
            return (
              <div key={field.name}>
                <CheckBox
                  checked={!!state.values[field.name] as boolean}
                  onChange={(checked: boolean) =>
                    handleChange(field.name, checked)
                  }
                  label={field.label}
                />
                {state.errors[field.name] && (
                  <div className={styles.error}>{state.errors[field.name]}</div>
                )}
              </div>
            );
          case "tag":
            return (
              <div key={field.name} className={styles.tagsSection}>
                {((state.values.tags as string[]) || []).map((tag: string) => (
                  <span key={tag} className={styles.tagWrapper}>
                    <Tag text={tag} />
                    <button
                      type="button"
                      className={styles.removeTag}
                      onClick={() => handleRemoveTag(tag)}
                      aria-label={`Remove tag ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  className={styles.tagInput}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder={field.placeholder || "Add tag"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag(tagInput.trim());
                      setTagInput("");
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    handleAddTag(tagInput.trim());
                    setTagInput("");
                  }}
                  text="Add Tag"
                />

                {state.errors[field.name] && (
                  <div className={styles.error}>{state.errors[field.name]}</div>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
      <div className={styles.actions}>
        <Button
          text="save"
          type="submit"
          onClick={() => {}}
          variant="success"
        />
        {onCancel && (
          <Button
            text="cancel"
            type="button"
            onClick={onCancel}
            variant="secondary"
          />
        )}
      </div>
    </form>
  );
};

export default TaskForm;
