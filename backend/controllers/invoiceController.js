const nodemailer = require('nodemailer');

exports.sendInvoice = async (req, res) => {
  try {
    const { email, name } = req.body;
    const file = req.file;

    if (!email || !file) {
      return res.status(400).json({ message: 'Email or file missing.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Billing System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Invoice',
      text: `Hi ${name || 'Customer'},\n\nPlease find your invoice attached.\n\nThank you!`,
      attachments: [
        {
          filename: file.originalname || 'invoice.pdf',
          content: file.buffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Invoice sent successfully!' });
  } catch (error) {
    console.error('Email error:', error.response || error.message || error);
    res.status(500).json({ message: 'Failed to send invoice.' });
  }
};
