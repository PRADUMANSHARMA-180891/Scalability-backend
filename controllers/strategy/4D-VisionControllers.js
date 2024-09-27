const FourDVision = require("../../models/strategy/4DVisionSummaryModels");


const create4DVision = async(req,res)=>{
    const { companyId, Kpi, CriticalNumber1, CriticalNumber2 } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await FourDVision.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.Kpi = Kpi
            process.CriticalNumber1 = CriticalNumber1
            process.CriticalNumber2 = CriticalNumber2
            
            await process.save();  // Save updated data
            return res.status(200).json({ message: 'Process updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await FourDVision.create({
                companyId,
                Kpi,
                CriticalNumber1,
                CriticalNumber2,
            });
            return res.status(201).json({ message: 'Process created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// getting data 
const fetch4DVision =  async(req,res)=>{

    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const DVisionData = await FourDVision.findOne({
            where: { companyId },
        });

        if (!DVisionData) {
            return res.status(404).json({ message: 'Process Accountability data not found' });
        }

        res.json(DVisionData);

    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {create4DVision, fetch4DVision}