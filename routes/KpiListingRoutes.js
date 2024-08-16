const express = require("express");
const {CreatKpi, getAllKpi, UpdateKpi, DeleteKpi} = require("../controllers/KpiControllers");

const router = express.Router();

router.post('/create', CreatKpi);
router.get('/get', getAllKpi);
router.put('/update/:id', UpdateKpi);
router.delete('/delete/:id', DeleteKpi);

module.exports = router;