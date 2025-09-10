const express = require('express');
const router = express.Router();
const { saveBill, generateBillPdf, getAllBills} = require('../controller/billController'); 


router.post('/api/bill', saveBill);
router.post('/api/bill/pdf', generateBillPdf);
router.get('/api/bills', getAllBills);

module.exports = router;
