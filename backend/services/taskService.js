const Task = require("../models/taskModel");

exports.createTask = async (data) => {
  const {
    title,
    description,
    tags,
    assignedTo,
    estimatedTime,
    progress,
    status,
    priority,
  } = data;
  const validPriorities = ["low", "medium", "high"];
  if (priority && !validPriorities.includes(priority)) {
    throw new Error(
      "Invalid priority value. Allowed values are: low, medium, high."
    );
  }

  return await Task.create({
    title,
    description,
    tags,
    assignedTo,
    estimatedTime,
    progress,
    status,
    priority,
  });
};

exports.getTasks = async () => {
  return await Task.find().populate("assignedTo", "email role");
};

exports.getTaskById = async (id) => {
  return await Task.findById(id).populate("assignedTo", "email role");
};

exports.updateTask = async (id, data) => {
  const { priority } = data;
  // Validate priority (optional, if not handled in the schema)
  const validPriorities = ["low", "medium", "high"];
  if (priority && !validPriorities.includes(priority)) {
    throw new Error(
      "Invalid priority value. Allowed values are: low, medium, high."
    );
  }
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};
