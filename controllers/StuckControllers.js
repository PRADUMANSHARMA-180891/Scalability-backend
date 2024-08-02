const Stuck = require('../models/stuck/StuckModels');

const CreateStuck = async(req,res) =>{
    try {
        const { iNeedHelpFrom, notes } = req.body;
        const newStuck = await Stuck.create({ iNeedHelpFrom, notes });
        if(!newStuck){
            res.status(404).json({message: "something went wrong while creating stuck"});
        }
        res.status(201).json(newStuck);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = CreateStuck