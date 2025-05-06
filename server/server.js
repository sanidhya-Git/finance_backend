import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// POST endpoint to send email
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ error: "Missing fields" });
  }

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email template
  const referenceId = `QR-${Math.floor(Math.random() * 90000) + 10000}`;
  const submittedDate = new Date().toLocaleDateString();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting us!",
    html: `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Query Confirmation</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }

    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .header {
      background-color: #4285F4;
      padding: 30px;
      text-align: center;
    }

    .header img {
      max-width: 150px;
      height: auto;
    }

    .content {
      padding: 30px;
    }

    .confirmation-icon {
      text-align: center;
      margin-bottom: 25px;
    }

    .confirmation-message {
      text-align: center;
      margin-bottom: 30px;
    }

    .confirmation-message h1 {
      color: #4285F4;
      font-size: 28px;
      margin-bottom: 15px;
    }

    .confirmation-message p {
      font-size: 16px;
      color: #555;
      margin-bottom: 20px;
    }

    .query-details {
      background-color: #f5f8ff;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 30px;
    }

    .query-details h3 {
      margin-top: 0;
      color: #4285F4;
      font-size: 18px;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }

    .detail-row {
      margin-bottom: 12px;
    }

    .detail-row strong {
      color: #555;
    }

    .next-steps h3 {
      color: #4285F4;
      font-size: 18px;
      margin-bottom: 15px;
    }

    .timeline {
      display: flex;
      margin-bottom: 25px;
    }

    .timeline-item {
      flex: 1;
      text-align: center;
      position: relative;
    }

    .timeline-item:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 15px;
      right: 0;
      width: 100%;
      height: 2px;
      background-color: #e0e0e0;
      z-index: 1;
    }

    .timeline-circle {
      width: 30px;
      height: 30px;
      background-color: #4285F4;
      border-radius: 50%;
      margin: 0 auto 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      position: relative;
      z-index: 2;
    }

    .timeline-text {
      font-size: 14px;
      color: #666;
    }

    .contact-options {
      display: flex;
      justify-content: space-around;
      margin-bottom: 30px;
    }

    .contact-option {
      text-align: center;
      padding: 15px;
      border-radius: 6px;
      background-color: #f5f8ff;
      width: 28%;
    }

    .contact-option p {
      margin: 5px 0 0;
      font-size: 14px;
      color: #666;
    }

    .button {
      display: block;
      text-align: center;
      background-color: #4285F4;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 4px;
      font-weight: 600;
      margin: 30px auto;
      max-width: 200px;
    }

    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }

    .social-icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      background-color: #4285F4;
      border-radius: 50%;
      color: white;
      text-align: center;
      line-height: 32px;
      margin: 0 5px;
      text-decoration: none;
    }

    @media only screen and (max-width: 768px) {
      .email-container {
        width: 100% !important;
        border-radius: 0 !important;
      }

      .content {
        padding: 20px !important;
      }

      .query-details,
      .contact-option {
        padding: 15px !important;
      }

      .contact-options {
        flex-direction: column !important;
        align-items: stretch !important;
      }

      .contact-option {
        width: 100% !important;
        margin-bottom: 15px !important;
      }

      .button {
        width: 100% !important;
        padding: 12px !important;
      }

      .timeline {
        flex-direction: column !important;
      }

      .timeline-item {
        margin-bottom: 20px;
      }

      .timeline-item:not(:last-child)::after {
        content: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://yourdomain.com/logo.png" alt="Company Logo" />
    </div>
    <div class="content">
      <div class="confirmation-icon">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="38" fill="#e1f5fe" stroke="#4285F4" stroke-width="2" />
          <path d="M30 40 L38 48 L55 30" stroke="#4285F4" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div class="confirmation-message">
        <h1>Thank You for Reaching Out!</h1>
        <p>Your query has been successfully submitted. Our team will review your message and get back to you within the next 48 hours.</p>
      </div>
      <div class="query-details">
        <h3>Your Query Details</h3>
        <div class="detail-row"><strong>Name:</strong> ${name}</div>
        <div class="detail-row"><strong>Phone:</strong> ${phone || "Not Provided"}</div>
        <div class="detail-row"><strong>Message:</strong> ${message}</div>
        <div class="detail-row"><strong>Reference ID:</strong> <span style="color: #4285F4;">${referenceId}</span></div>
        <div class="detail-row"><strong>Submitted on:</strong> ${submittedDate}</div>
      </div>
      <div class="next-steps">
        <h3>What Happens Next?</h3>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-circle">1</div>
            <div class="timeline-text">Query Received</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-circle">2</div>
            <div class="timeline-text">Being Reviewed</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-circle">3</div>
            <div class="timeline-text">Response Within 48h</div>
          </div>
        </div>
        <p>Our team is working diligently to provide you with the best possible assistance. We appreciate your patience and look forward to connecting with you soon.</p>
      </div>
      <div class="contact-options">
        <div class="contact-option">
          <strong>Live Chat</strong>
          <p>9am - 6pm<br />Monday to Friday</p>
        </div>
        <div class="contact-option">
          <strong>Email</strong>
          <p>support@company.com</p>
        </div>
        <div class="contact-option">
          <strong>Phone</strong>
          <p>1-800-555-0123<br />24/7 Support</p>
        </div>
      </div>
      <a href="#" class="button">Track Your Query</a>
      <p style="text-align: center; font-size: 14px; color: #777;">
        Have additional questions? Visit our
        <a href="#" style="color: #4285F4; text-decoration: none;">Help Center</a> or
        <a href="#" style="color: #4285F4; text-decoration: none;">FAQs</a>.
      </p>
    </div>
    <div class="footer">
      <p>© 2025 Your Company. All rights reserved.</p>
      <div>
        <a href="#" class="social-icon">f</a>
        <a href="#" class="social-icon">t</a>
        <a href="#" class="social-icon">in</a>
        <a href="#" class="social-icon">ig</a>
      </div>
      <p>
        You're receiving this email because you submitted a query through our website.<br />
        <a href="#" style="color: #4285F4; text-decoration: none;">Unsubscribe</a> ·
        <a href="#" style="color: #4285F4; text-decoration: none;">Privacy Policy</a> ·
        <a href="#" style="color: #4285F4; text-decoration: none;">Terms of Service</a>
      </p>
    </div>
  </div>
</body>
</html>
    `
  };
  

  // Send mail
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
