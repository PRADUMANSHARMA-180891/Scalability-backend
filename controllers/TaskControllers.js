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

// module.exports = GetTasksByUpdatedAtRange;



// module.exports = GetTasksByDueDate;

module.exports = {CreateTask,GetTasksByUpdatedAtRange};