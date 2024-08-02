const Period = require('../models/period/CreatePeriod');
const Priority = require('../models/priority/PriorityModels'); // Adjust the path to your model
const { createPeriod } = require('./PeriodControllers');

const createPriority = async (req, res) => {
  try {
    const { priority_name, owner, start_value, current_value, target, current_value_source, PeriodId } = req.body;

    // Validate required fields
    if (!priority_name || !owner || !start_value || !current_value || !target || !current_value_source || !PeriodId) {
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
      PeriodId
    });

    // Respond with the created priority
    res.status(201).json({ message: 'Priority created successfully', data: newPriority });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while creating the priority', error });
  }
};

const getPriority = async (req, res) => {
  try {
    const priorityData = await Priority.findAll({});
    if (!priorityData) {
      return res.status(404).json({ message: "Not able to get priority data" });
    }
    res.status(202).json({ data: priorityData });
  } catch (error) {
    res.status(402).json({ message: "Error while getting data", error });
  }
};

const getPriorityByDate = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    if (!start_date || !end_date) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }
    const priorityData = await Period.findAll({
      where: { start_date, end_date },
      include: { model: Priority, as: 'Priorities' }
    });
    if (!priorityData) {
      return res.status(404).json({ message: "No priority data found for the given dates" });
    }

    res.status(200).json(priorityData);

  } catch (error) {
    res.status(500).json({ message: "Something went wrong while fetching priority data", error: error.message });
  }
};

module.exports = { createPriority, getPriority, getPriorityByDate };
