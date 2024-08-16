const KPI = require('../models/kpiListing/KpiListingModels');


const CreatKpi = async(req,res)=>{
    try {
        const { name, description, unit } = req.body;
    
        const newKPI = await KPI.create({
          name,
          description,
          unit,
        });
        if(!newKPI){
          res.status(404).json(newKPI);
        }
        res.status(201).json(newKPI);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create KPI' });
      }
};
// getAll Kpi
const getAllKpi = async(req,res)=>{
    try {
        const kpis = await KPI.findAll({});
        res.status(200).json(kpis);
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve KPIs' });
      }
}
// update kpi 
const UpdateKpi = async(req,res)=>{
    try {
        const { id } = req.params;
        const { name, description, unit } = req.body;
    
        const kpi = await KPI.findByPk(id);
    
        if (!kpi) {
          return res.status(404).json({ error: 'KPI not found' });
        }
    
        kpi.name = name;
        kpi.description = description;
        kpi.unit = unit;
    
        await kpi.save();
    
        res.status(200).json(kpi);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update KPI' });
      }
}
// delete Kpi
const DeleteKpi = async(req,res)=>{
    try {
        const { id } = req.params;
    
        const kpi = await KPI.findByPk(id);
    
        if (!kpi) {
          return res.status(404).json({ error: 'KPI not found' });
        }
    
        await kpi.destroy();
    
        res.status(204).json({ message: 'KPI deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete KPI' });
      }
}
module.exports = {CreatKpi, getAllKpi, UpdateKpi, DeleteKpi};