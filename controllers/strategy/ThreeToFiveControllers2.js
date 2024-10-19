const ThreeToFive2 = require("../../models/strategy/OnePageStrategyPlan/ThreeToFiveYearsPlanModels2");

const createThreeToFive2 = async(req,res)=>{
    const { companyId, title, sub_title,  Category, Projected, Actuals, OwnerName } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await ThreeToFive2.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.title = title
            process.sub_title = sub_title
            // process.title1 = title1
            // process.title3 = title3

            await process.save();  // Save updated data
            return res.status(200).json({ message: 'theme updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await ThreeToFive2.create({
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

const fetchThreetoFiveYearsPlan2 =  async(req,res)=>{
    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const ThreeYearsPlanData = await ThreeToFive2.findOne({
            where: { companyId },
        });

        if (!ThreeYearsPlanData) {
            return res.status(404).json({ message: 'Support data not found' });
        }

        res.json(ThreeYearsPlanData);
    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const removeThreeYearPlan2 = async (req, res) => {
    const { companyId, ThreeyearplanField, id } = req.params;

    try {
        // Find the ThreeToFive2 entry by companyId
        const ThreeToFive1data = await ThreeToFive2.findOne({ where: { companyId } });

        if (!ThreeToFive1data) {
            return res.status(404).json({ message: 'Three-year plan data not found' });
        }

        // Ensure the ThreeyearplanField exists in the model and is valid
        const validFields = ['Category', 'Projected', 'Actuals', 'OwnerName']; // Add other valid fields if needed
        if (!validFields.includes(ThreeyearplanField)) {
            return res.status(400).json({ message: 'Invalid field' });
        }

        // Parse the specified field (assuming it's stored as a JSON string array)
        let planData = [];
        if (ThreeToFive1data[ThreeyearplanField]) {
            planData = JSON.parse(ThreeToFive1data[ThreeyearplanField]); // Parse the string to JSON array
        }

        // Filter out the item to be deleted by its index (assuming `id` is an index in the array)
        const updatedPlanData = planData.filter((_, index) => index !== parseInt(id));

        // Update the field with the new data (convert back to JSON string)
        await ThreeToFive1data.update({
            [ThreeyearplanField]: updatedPlanData
        });

        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
};


module.exports ={ createThreeToFive2, fetchThreetoFiveYearsPlan2, removeThreeYearPlan2 }