const Support = require("../../models/strategy/OnePageStrategyPlan/SupportModels");

const createSupport = async(req,res)=>{
    const { companyId, title, sub_title, support_title1, support1,support_title2,support2,support_title3,support3,support4 } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await Support.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.title = title
            process.sub_title = sub_title
            process.support_title1 = support_title1
            process.support1 = support1
            process.support_title2 = support_title2
            process.support2 = support2
            process.support_title3 = support_title3
            process.support3 = support3
            process.support4 = support4

            await process.save();  // Save updated data
            return res.status(200).json({ message: 'support updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await Support.create({
                companyId,
                title, 
                sub_title,
                support_title1,
                support1,
                support_title2,
                support2,
                support_title3,
                support3,
                support4
            });
            return res.status(201).json({ message: 'Process created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 
// getting data by id 

const fetchSupport =  async(req,res)=>{
    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const SupportData = await Support.findOne({
            where: { companyId },
        });

        if (!SupportData) {
            return res.status(404).json({ message: 'Support data not found' });
        }

        res.json(SupportData);
    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const removeSupportItem = async (req, res) => {
    const { companyId, SupportField, id } = req.params;

    try {
        // Find the support entry by companyId
        const support = await Support.findOne({ where: { companyId } });

        if (!support) {
            return res.status(404).json({ message: 'Support not found' });
        }

        // Ensure the SupportField exists in the model
        const supportFields = ['support1', 'support2', 'support3'];
        if (!supportFields.includes(SupportField)) {
            return res.status(400).json({ message: 'Invalid support field' });
        }

        // Parse the specified support field (assuming it's stored as a JSON array)
        let supportData = [];
        if (support[SupportField]) {
            supportData = JSON.parse(support[SupportField]); // Parse the string to a JSON object
        }

        // Filter out the item to be deleted
        const updatedSupportData = supportData.filter(item => item.id !== parseInt(id));

        // Update the support entry with the new data
        await support.update({ [SupportField]: updatedSupportData }); // Convert back to string

        return res.status(200).json({ message: 'Support item deleted successfully' });
    } catch (error) {
        console.error("Error deleting support item:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
};



module.exports = { createSupport, fetchSupport, removeSupportItem }