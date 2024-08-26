const Tag = require("../models/companySettings/CompanySettingsModels");


const createCompanyTags = async(req,res)=>{
    try {
        const { name, color } = req.body;
    
        // Validate input
        if (!name || !color) {
          return res.status(400).json({ message: 'Name and color are required' });
        }
    
        // Create the tag
        const newTag = await Tag.create({ name, color });
    
        res.status(201).json(newTag);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}
// 
const getTags = async(req,res)=>{
    try {
        const tags = await Tag.findAll();
        if(!tags){
            return res.status(404).json({message:"Tags are not founds"})
        }
        res.json(tags);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
// Update Tags
const updateTags = async(req,res)=>{
    const { id } = req.params;
    const { name, color } = req.body;
  
    try {
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      tag.name = name || tag.name;
      tag.color = color || tag.color;
      await tag.save();
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
// delete Tags
const deleteTags = async(req,res) =>{
    const { id } = req.params;

    try {
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      await tag.destroy();
      res.json({ message: 'Tag deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
module.exports = { createCompanyTags, updateTags, deleteTags, getTags }