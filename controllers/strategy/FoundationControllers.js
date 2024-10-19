const Foundation = require("../../models/strategy/OnePageStrategyPlan/FoundationModels");

const createFoundation = async(req,res)=>{
    const { companyId, foundation1, foundation2, foundation3, foundation4 } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await Foundation.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.foundation1 = foundation1
            process.foundation2 = foundation2
            process.foundation3 = foundation3
            process.foundation4 = foundation4

            await process.save();  // Save updated data
            return res.status(200).json({ message: 'Process updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await Foundation.create({
                companyId,
                foundation1,
                foundation2,
                foundation3,
                foundation4
            });
            return res.status(201).json({ message: 'Process created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 
// getting data by id 

const fetchFoundation =  async(req,res)=>{
    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const FoundationData = await Foundation.findOne({
            where: { companyId },
        });

        if (!FoundationData) {
            return res.status(404).json({ message: 'Process Accountability data not found' });
        }

        res.json(FoundationData);
    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const removeItem = async (req, res) => {
    const { companyId, foundationField, id } = req.params;

    try {
        // Find the foundation entry by companyId
        const foundation = await Foundation.findOne({ where: { companyId } });

        if (!foundation) {
            return res.status(404).json({ message: 'Foundation not found' });
        }

        // Ensure the foundation field exists in the model
        const foundationFields = ['foundation1', 'foundation2', 'foundation3', 'foundation4'];
        if (!foundationFields.includes(foundationField)) {
            return res.status(400).json({ message: 'Invalid foundation field' });
        }

        // Parse the specified foundation field (assuming it's stored as a JSON string)
        let foundationData = [];
        if (foundation[foundationField]) {
            foundationData = JSON.parse(foundation[foundationField]); // Parse the string to a JSON object
        }

        // Filter out the item to be deleted
        const updatedFoundationData = foundationData.filter(item => item.id !== parseInt(id));

        // Update the foundation entry with the new data
        await foundation.update({ [foundationField]: updatedFoundationData }); // Convert back to string

        return res.status(200).json({ message: 'Foundation item deleted successfully' });
    } catch (error) {
        console.error("Error deleting foundation item:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {createFoundation, fetchFoundation, removeItem}