const { where } = require("sequelize");
const Task  = require("../models/task/TaskModels");
const { Op } = require("sequelize");

const CreateTask = async(req,res) =>{
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
      } catch (error) {
        res.status(400).json({message:"getting error while creating task", error: error.message });
      }
};
// get task on basis of duedate
const GetTasksByUpdatedAtRange = async (req, res) => {
  try {
    const { start_date, end_date } = req.query; // Extract start_date and end_date from query parameters

    if (!start_date || !end_date) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }

    // Query the database for tasks updated within the specified date range
    const tasks = await Task.findAll({
      where: {
        updatedAt: {
          [Op.between]: [new Date(start_date), new Date(end_date)] // Ensure updatedAt falls within the range
        }
      }
    });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for the specified date range" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error: error.message });
  }
};

const getTask = async(req,res)=>{
 
  try {
    const taskData = await Task.findAll();

    if (!taskData || taskData.length === 0) {
      return res.status(404).json({ message: "No task data found" });
    }

   return res.status(200).json(taskData);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while getting data", error: error.message });
  }
}

// Edit a task
const EditTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { shortTaskName, dueDate, recurring,assignedTo,priorityName,huddleName,visibility,participants,notes } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.shortTaskName = shortTaskName || task.shortTaskName;
    task.dueDate = dueDate || task.dueDate;
    task.recurring = recurring || task.recurring;
    task.assignedTo  = assignedTo || task.assignedTo;
    task.priorityName = priorityName || task.priorityName;
    task.huddleName = huddleName || task.huddleName;
    task.visibility = visibility || task.visibility;
    task.participants = participants || task.participants;
    task.notes = notes || task.notes

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};
module.exports = {CreateTask,GetTasksByUpdatedAtRange, getTask, EditTask, DeleteTask};