const Task  = require("../models/task/TaskModels");

const CreateTask = async(req,res) =>{
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
      } catch (error) {
        res.status(400).json({message:"getting error while creating task", error: error.message });
      }
};

module.exports = CreateTask;