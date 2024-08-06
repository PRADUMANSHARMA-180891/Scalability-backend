const Metric = require('../models/metric/MetricModels');

const CreateMetric = async(req,res)=>{
    try {
        const metric = await Metric.create(req.body);
        if(!metric){
            res.status(401).json({message:"all fields are required"})
        }
        res.status(201).json(metric);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = CreateMetric;