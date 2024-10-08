const Quaterly = require("../../models/strategy/OnePageStrategyPlan/QuaterlyModels");

const createQuaterly = async(req,res)=>{
    const { companyId, title, sub_title, Category, Projected, Actuals, OwnerName } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await Quaterly.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.title = title
            process.sub_title = sub_title
            process.Category = Category,
            process.Projected = Projected,
            process.Actuals = Actuals,
            process.OwnerName = OwnerName

            await process.save();  // Save updated data
            return res.status(200).json({ message: 'Quaterly updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await Quaterly.create({
                companyId,
                title, 
                sub_title,
                Category,
                Projected,
                Actuals,
                OwnerName
            });
            return res.status(201).json({ message: 'Theme created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 

const fetchQuaterly =  async(req,res)=>{
    try {
        const { companyId } = req.params;
        
        // Fetch process accountability data from the database
        const quaterlyData = await Quaterly.findOne({
            where: { companyId },
        });

        if (!quaterlyData) {
            return res.status(404).json({ message: 'Support data not found' });
        }

        res.json(quaterlyData);
    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createQuaterly, fetchQuaterly }