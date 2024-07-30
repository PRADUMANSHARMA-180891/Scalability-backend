const Priority = require('../models/priority/PriorityModels'); // Adjust the path to your model

const createPriority = async (req, res) => {
  try {
    const { priority_name, owner, start_value, current_value, target, current_value_source } = req.body;

    // Validate required fields
    if (!priority_name || !owner || !start_value || !current_value || !target || !current_value_source) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create the priority
    const newPriority = await Priority.create({
      priority_name,
      owner,
      start_value,
      current_value,
      target,
      current_value_source,
    });

    // Respond with the created priority
    res.status(201).json({ message: 'Priority created successfully', data: newPriority });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while creating the priority', error });
  }
};
// getData

const getPriority = async (req,res) =>{
    try {
        const priorityData = await Priority.findAll({});
        if(!priorityData){
            res.status(404).json({message:"not able to get priority data"});
        };
        res.status(202).json({data:priorityData});
    } catch (error) {
        res.status(402).json({message:"error while getting data",error});
    }
}
module.exports = { createPriority, getPriority };
