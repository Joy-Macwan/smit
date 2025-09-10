const express = require('express');
const multer = require('multer');
const { sendInvoice } = require('../controllers/invoiceController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/send-invoice', upload.single('file'), sendInvoice);

module.exports = router;
