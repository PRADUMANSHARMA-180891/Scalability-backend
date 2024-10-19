const AlignmentChecklist = require("../../models/strategy/AlignmentChecklistModels");
const Section = require("../../models/strategy/AlignmentSectionModels");


const createAlignmentChecklist = async (req, res) => {
  const { texts, sectionId } = req.body; // Expecting texts as an array and sectionId

  // Validate inputs
  if (!Array.isArray(texts) || texts.length === 0) {
    return res.status(400).json({ error: "Texts must be a non-empty array" });
  }

  if (!sectionId) {
    return res.status(400).json({ error: "Section ID is required" });
  }

  try {
    const newTasks = await Promise.all(
      texts.map(async (text) => {
        return await AlignmentChecklist.create({ text, sectionId}); // Create checklist item for each text
      })
    );

    res.json({
      message: "Tasks created successfully",
      tasks: newTasks,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create tasks" });
  }
};


const getAlignmentByCompanyId = async (req, res) => {
  const { companyId } = req.params; // This should be the companyId

  try {
    // Fetch all sections along with their respective alignment tasks for the given companyId
    const sections = await Section.findAll({
      where: { companyId },
      include: {
        model: AlignmentChecklist,
        // as: 'AlignmentChecklists', // Adjust based on the alias you've set in associations
        required: false // Include sections even if they have no tasks
      }
    });

    res.json(sections);
  } catch (error) {
    console.error("Error fetching sections and tasks:", error);
    res.status(500).json({ error: "Failed to fetch sections and tasks" });
  }
};

  
// Update task completion
const updateAlignment = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
  
    try {
      const task = await AlignmentChecklist.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      task.completed = completed;
      await task.save();
      res.json({ message: "Task updated successfully", task });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  };

module.exports ={ createAlignmentChecklist, updateAlignment, getAlignmentByCompanyId }