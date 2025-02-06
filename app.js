const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');

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
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com', // Zoho SMTP server
    port: 465, // Secure SMTP port
    secure: true, // Use SSL
    auth: {
        user: 'support@financemoneyrecovery.com', // Your Zoho email
        pass: 'GFpxSVhEaDab', // Your Zoho app password
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

app.post('/send-welcome-email', async (req, res) => {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required for welcome email.' });
    }

    // Professional HTML email template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Welcome to Chrissian Investments!</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <!-- Optional: Add your logo here -->
                    <img src="https://yourdomain.com/logo.png" alt="Chrissian Logo" width="150" style="display: block;">
                  </td>
                </tr>
                <tr>
                  <td style="color: #333333; font-size: 22px; font-weight: bold; padding-bottom: 20px; text-align: center;">
                    Welcome to Chrissian!
                  </td>
                </tr>
                <tr>
                  <td style="color: #555555; font-size: 16px; line-height: 24px;">
                    <p>Dear ${name},</p>
                    <p>Thank you for registering with Chrissian. We are thrilled to have you as part of our community and look forward to serving you with top-notch financial solutions.</p>
                    <p>Your registered email is: <strong>${email}</strong></p>
                    <p>If you have any questions or need any assistance, feel free to reach out to our support team.</p>
                    <p>Warm regards,</p>
                    <p>The Chrissian Team</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <a href="https://chrissian.com" style="background-color: #007BFF; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px;">Visit Our Website</a>
                  </td>
                </tr>
              </table>
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
                <tr>
                  <td align="center" style="color: #999999; font-size: 12px;">
                    © 2023 Chrissian. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    // Configure mail options for the welcome email
    const mailOptions = {
        from: 'support@financemoneyrecovery.com',
        to: email,
        subject: 'Welcome to Chrissian!',
        html: htmlContent,
    };

    try {
        // Send the welcome email
        await transporter.sendMail(mailOptions);
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
