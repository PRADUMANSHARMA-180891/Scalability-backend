const OneYearActive = require("../../models/OnepagePersanalPlan/OneYearActive/OneYearActiveModels");

const createOneYearYearAcive = async (req, res) => {
    try {
        const { companyId, relationships, achievements, rituals, wealth } = req.body;

        // Check if an entry already exists for the user
        let aspiration = await OneYearActive.findOne({
            where: { companyId }, // Assuming userId is the unique identifier
        });

        if (aspiration) {
            // If an aspiration entry exists, update the existing record
            aspiration.relationships = relationships;
            aspiration.achievements = achievements;
            aspiration.rituals = rituals;
            aspiration.wealth = wealth;

            await aspiration.save(); // Save the updated data
            
            return res.status(200).json({ message: 'Aspiration updated successfully', data: aspiration });
        } else {
            // If no aspiration exists, create a new record
            aspiration = await OneYearActive.create({
                companyId, // Include userId for associating the aspiration with a specific user
                relationships,
                achievements,
                rituals,
                wealth,
            });

            return res.status(201).json({ message: 'Aspiration created successfully', data: aspiration });
        }
    } catch (error) {
        console.error('Error creating or updating aspiration:', error);
        return res.status(500).json({ message: 'Failed to create or update aspiration' });
    }
};

// getting data 
const fetchOneYearYearAcive =  async(req,res)=>{

    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const OneYearActiveData = await OneYearActive.findOne({
            where: { companyId },
        });

        if (!OneYearActiveData) {
            return res.status(404).json({ message: 'Process Accountability data not found' });
        }

        res.json(OneYearActiveData);

    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {createOneYearYearAcive, fetchOneYearYearAcive}