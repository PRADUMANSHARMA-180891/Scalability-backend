const FunctionalAccountability = require("../../models/strategy/FunctionalAccountabilityModels");

const createFunctionalAcountability = async(req,res)=>{
    const { companyId, FunctionsName, personAccountable, LeadingIndicators, Results } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await FunctionalAccountability.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.FunctionsName = FunctionsName
            process.personAccountable = personAccountable
            process.LeadingIndicators = LeadingIndicators
            process.Results = Results

            await process.save();  // Save updated data
            return res.status(200).json({ message: 'Process updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await FunctionalAccountability.create({
                companyId,
                FunctionsName,
                personAccountable,
                LeadingIndicators,
                Results
            });
            return res.status(201).json({ message: 'Process created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 
// getting data by id 

const fetchFunctionalAcountability =  async(req,res)=>{
    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const functionalAccountability = await FunctionalAccountability.findOne({
            where: { companyId },
        });

        if (!functionalAccountability) {
            return res.status(404).json({ message: 'Process Accountability data not found' });
        }

        res.json(functionalAccountability);
    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {createFunctionalAcountability, fetchFunctionalAcountability}