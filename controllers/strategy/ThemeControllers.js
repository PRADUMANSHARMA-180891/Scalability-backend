const Theme = require("../../models/strategy/OnePageStrategyPlan/ThemeModels");

const createTheme = async(req,res)=>{
    const { companyId, title, sub_title, theme_name, deadline, title2, title3, title4, title5,title6,title7 } = req.body;

    try {
        // Find if an entry already exists for this company
        let process = await Theme.findOne({
            where: { companyId }
        });

        if (process) {
            // If process exists, perform update
            process.title = title
            process.sub_title = sub_title
            process.title2 = title2
            process.title3 = title3
            process.title4 = title4
            process.title5 = title5
            process.title6 = title6
            process.title7 = title7

            await process.save();  // Save updated data
            return res.status(200).json({ message: 'theme updated successfully', data: process });
        } else {
            // If process does not exist, perform create
            process = await Theme.create({
                companyId,
                title, 
                sub_title,
                theme_name,
                deadline,
                title2,
                title3,
                title4,
                title5,
                title6,
                title7
            });
            return res.status(201).json({ message: 'Theme created successfully', data: process });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 
// getting data by id 

const fetchTheme =  async(req,res)=>{
    try {
        const {companyId} = req.params;
        
        // Fetch process accountability data from the database
        const ThemeData = await Theme.findOne({
            where: { companyId },
        });

        if (!ThemeData) {
            return res.status(404).json({ message: 'Theme data not found' });
        }

        res.json(ThemeData);
    } catch (error) {
        console.error('Error fetching process accountability:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports ={ createTheme, fetchTheme }