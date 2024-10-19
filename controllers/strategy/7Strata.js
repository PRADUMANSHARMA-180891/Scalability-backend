const SevenStarta = require("../../models/strategy/7StartaModels");

const create7Starta = async(req,res)=>{
    const { companyId, WordsYouOwn, CkEditorWords, BrandPromises, CkEditorBrand } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await SevenStarta.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.WordsYouOwn = WordsYouOwn
            process.CkEditorWords = CkEditorWords
            process.BrandPromises = BrandPromises
            process.CkEditorBrand = CkEditorBrand
            
            await process.save();  // Save updated data
            return res.status(200).json({ message: 'Process updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await SevenStarta.create({
                companyId,
                WordsYouOwn,
                CkEditorWords,
                BrandPromises,
                CkEditorBrand
            });
            return res.status(201).json({ message: 'Process created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// getting data 
const fetch7Starta =  async(req,res)=>{

    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const SevenStartaData = await SevenStarta.findOne({
            where: { companyId },
        });

        if (!SevenStartaData) {
            return res.status(404).json({ message: 'Process Accountability data not found' });
        }

        res.json(SevenStartaData);
    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {create7Starta, fetch7Starta}