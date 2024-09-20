const ProccessAccountability = require("../../models/strategy/ProccessAccontibilityModels");

const createProcessAcountability = async(req,res)=>{
    const { companyId, processName, personAccountable, kpis } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await ProccessAccountability.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.processName = processName;
            process.personAccountable = personAccountable;
            process.kpis = kpis;

            await process.save();  // Save updated data
            return res.status(200).json({ message: 'Process updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await ProccessAccountability.create({
                companyId,
                processName,
                personAccountable,
                kpis
            });
            return res.status(201).json({ message: 'Process created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 
// getting data by id 

const fetchProcessAccountability =  async(req,res)=>{
    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const processAccountability = await ProccessAccountability.findOne({
            where: { companyId },
        });

        if (!processAccountability) {
            return res.status(404).json({ message: 'Process Accountability data not found' });
        }

        res.json(processAccountability);
    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {createProcessAcountability, fetchProcessAccountability}