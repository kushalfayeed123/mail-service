const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the CORS package


// Initialize Express
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());  // This allows requests from any origin
app.use(bodyParser.json());

// Configure NodeMailer with Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'segunajanaku617@gmail.com', // Your Gmail address
        pass: 'lylz uryf tfsg oame', // Your App Password
    },
});

// Endpoint to handle the API request
app.post('/send-email', async (req, res) => {
    const {
        formname, utm_source, utm_medium, utm_campaign, utm_term, gclid_field, ip,
        page_url, dial_code, fname, lname, email, mobile_no, country, scam_type,
        amount, message
    } = req.body;

    // Validate required fields
    if (!fname || !lname || !email || !message) {
        return res.status(400).json({ error: 'First name, last name, email, and message are required.' });
    }

    // Email content
    const mailOptions = {
        from: `${email}`, // Sender's email
        to: 'joey.mendez699@gmail.com', // Recipient's email
        subject: `New message from ${fname} ${lname}`,
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
            First Name: ${fname}
            Last Name: ${lname}
            Email: ${email}
            Mobile Number: ${mobile_no || 'Not provided'}
            Country: ${country || 'Not provided'}
            Scam Type: ${scam_type || 'Not provided'}
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
app.post('/send-email-2', async (req, res) => {
    const {
        amount, dial_code, email, fname, formname, gclid_field, ip, message, mobile_no, page_url, utm_campaign, utm_medium, utm_source,
        utm_term

    } = req.body;

    // Validate required fields
    if (!fname || !email || !message) {
        return res.status(400).json({ error: 'First name, last name, email, and message are required.' });
    }

    // Email content
    const mailOptions = {
        from: `${email}`, // Sender's email
        to: 'joey.mendez699@gmail.com', // Recipient's email
        subject: `New message from ${fname} ${lname}`,
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
            Country: ${country || 'Not provided'}
            Scam Type: ${scam_type || 'Not provided'}
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
