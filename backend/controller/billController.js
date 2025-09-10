const PDFDocument = require('pdfkit');
const Bill = require('../models/bill');
const fs = require('fs');
const path = require('path');

const saveBill = async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json({ message: 'Bill saved successfully' });
  } catch (error) {
    console.error('Error saving bill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bills' });
  }
};

const generateBillPdf = async (req, res) => {
  try {
    const { customer, billingDate, items, subtotal, totalTax, totalDiscount, grandTotal, profit } = req.body;
    const invoiceId = `INV-${Date.now().toString().slice(-6)}`;
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${invoiceId}_${customer.name}.pdf`);
    doc.pipe(res);

    const logoPath = path.join(__dirname, '../assets/logo.png');
    if (fs.existsSync(logoPath)) doc.image(logoPath, 50, 45, { width: 80 });

    doc.fontSize(20).text('GoCool Retail Billing', 120, 50);
    doc.fontSize(10).text('123 Business Street, Anand, Gujarat', 120, 75)
       .text('Phone: +91-9876543210', 120, 90);

    doc.fontSize(12).text(`Invoice ID: ${invoiceId}`, 400, 50, { align: 'right' })
       .text(`Billing Date: ${billingDate}`, 400, 65, { align: 'right' }).moveDown(2);

    doc.text(`Bill To: ${customer.name}`).text(`Phone: ${customer.phone}`).text(`Email: ${customer.email || 'N/A'}`).moveDown();

    const tableTop = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('Product', 50, tableTop)
      .text('Qty', 200, tableTop)
      .text('Price', 240, tableTop)
      .text('Tax%', 300, tableTop)
      .text('Disc%', 360, tableTop)
      .text('Total', 430, tableTop);
    doc.moveTo(50, doc.y + 15).lineTo(550, doc.y + 15).stroke();

    doc.font('Helvetica');
    let y = doc.y + 20;
    items.forEach((item) => {
      doc.text(item.name, 50, y)
         .text(item.quantity.toString(), 200, y)
         .text(`${item.price}`, 240, y)
         .text(`${item.tax}%`, 300, y)
         .text(`${item.discount}%`, 360, y)
         .text(`${item.total}`, 430, y);
      y += 20;
    });

    doc.moveDown(2).font('Helvetica-Bold');
    doc.text(`Subtotal: ₹ ${subtotal}`, 400)
       .text(`Total Tax: ₹ ${totalTax.toFixed(2)}`, 400)
       .text(`Total Discount: ₹ ${totalDiscount.toFixed(2)}`, 400)
       .text(`Grand Total: ₹ ${grandTotal}`, 400)
       .text(`Profit (10%): ₹ ${profit}`, 400);

    doc.fontSize(10).font('Helvetica').moveDown(2)
       .text('Thank you for shopping with GoCool! Keep this invoice for your records.', { align: 'center' });
    doc.end();
  } catch (err) {
    console.error('PDF generation failed:', err);
    res.status(500).json({ message: 'Error generating PDF' });
  }
};

module.exports = {
  saveBill,
  getAllBills,
  generateBillPdf
};