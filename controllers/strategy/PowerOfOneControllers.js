

// const CashAcceleration = require("../../models/strategy/CashAccelerationStrategiesModel");

const PowerOfOne = require("../../models/strategy/PowerOfOneModel");


const createPowerOfOne = async(req,res)=>{
    const { companyId, CurrentPosition, PriceIncrease, 
        VolumeIncrease, COGSReduction, OverheadsReduction, 
        ReductioninDebtorsDays,ReductioninStockDays,
        IncreaseinCreditorsDays,PowerofOneImpact, AdjustedPosition  } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await PowerOfOne.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.CurrentPosition = CurrentPosition;
            process.PriceIncrease = PriceIncrease;
            process.VolumeIncrease = VolumeIncrease;
            process.COGSReduction = COGSReduction;

            process.OverheadsReduction = OverheadsReduction;
            process.ReductioninDebtorsDays = ReductioninDebtorsDays;
            process.ReductioninStockDays = ReductioninStockDays;
            process.IncreaseinCreditorsDays = IncreaseinCreditorsDays;

            process.PowerofOneImpact = PowerofOneImpact;
            process.AdjustedPosition = AdjustedPosition;
            await process.save();  // Save updated data
            return res.status(200).json({ message: 'Process updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await PowerOfOne.create({
                companyId, 
                CurrentPosition, 
                PriceIncrease, 
                VolumeIncrease,
                COGSReduction,
                OverheadsReduction, 
                ReductioninDebtorsDays,
                ReductioninStockDays,
                IncreaseinCreditorsDays,
                PowerofOneImpact, 
                AdjustedPosition
            });
            return res.status(201).json({ message: 'Process created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 

const fetchPowerOfOne =  async(req,res)=>{
    try {
        const {companyId} = req.params;        
        // Fetch process accountability data from the database
        const PowerOfOnedata = await PowerOfOne.findOne({
            where: { companyId },
        });

        if (!PowerOfOnedata) {
            return res.status(404).json({ message: 'PowerOfOnedata data not found' });
        }

        res.json(PowerOfOnedata);
    } catch (error) {
        console.error('Error fetching PowerOfOnedata:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports= { createPowerOfOne, fetchPowerOfOne }