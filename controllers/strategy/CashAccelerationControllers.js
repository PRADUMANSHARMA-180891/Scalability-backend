const CashAcceleration = require("../../models/strategy/CashAccelerationStrategiesModel");


const createCashAcceleration = async(req,res)=>{
    const { companyId, SalesCycle, ProductionInventoryCycle, DeliveryCycle, BillingPaymentCycle } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await CashAcceleration.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.SalesCycle = SalesCycle;
            process.ProductionInventoryCycle = ProductionInventoryCycle;
            process.DeliveryCycle = DeliveryCycle;
            process.BillingPaymentCycle = BillingPaymentCycle;

            await process.save();  // Save updated data
            return res.status(200).json({ message: 'Process updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await CashAcceleration.create({
                companyId,
                SalesCycle,
                ProductionInventoryCycle,
                DeliveryCycle,
                BillingPaymentCycle
            });
            return res.status(201).json({ message: 'Process created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 

module.exports= { createCashAcceleration }