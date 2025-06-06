const Task = require("../models/taskModel");
// const User = require("../models/userModel");
// const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Subscription = require("../models/subscriptionModel");

// Setup your email transporter (use your SMTP credentials)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async (to, subject, text) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   });
// };

const sendWebPush = async (userId, payload) => {
  const sub = await Subscription.findOne({ user: userId });
  if (!sub) return;
  try {
    await webpush.sendNotification(sub, JSON.stringify(payload));
  } catch (err) {
    console.error("Web push error:", err);
  }
};

const checkTasksAndNotify = async () => {
  const now = new Date();
  const tasks = await Task.find({
    status: { $in: ["pending", "in-progress"] },
  }).populate("assignedTo");
  for (const task of tasks) {
    if (!task.assignedTo) continue;
    const elapsed = (now - task.createdAt) / 1000 / 60 / 60; // hours
    const halfTime = task.estimatedTime / 2;
    // Notify at half time
    if (
      elapsed > halfTime &&
      !task.notifiedHalfTime &&
      task.status === "pending"
    ) {
      // await sendEmail(
      //   task.assignedTo.email,
      //   "Task Reminder: Halfway to Deadline",
      //   `You are halfway through the estimated time for task: ${task.title}`
      // );
      await sendWebPush(task.assignedTo._id, {
        title: "Task Reminder",
        body: `You are halfway through the estimated time for task: ${task.title}`,
      });
      task.notifiedHalfTime = true;
      await task.save();
    }
    // Notify if overdue
    if (elapsed > task.estimatedTime && task.status !== "completed") {
      // await sendEmail(
      //   task.assignedTo.email,
      //   "Task Overdue",
      //   `Your task "${task.title}" is overdue!`
      // );
      await sendWebPush(task.assignedTo._id, {
        title: "Task Overdue",
        body: `Your task "${task.title}" is overdue!`,
      });
    }
  }
};

// Schedule to run every 10 minutes
cron.schedule("*/10 * * * *", checkTasksAndNotify);

module.exports = { checkTasksAndNotify };
