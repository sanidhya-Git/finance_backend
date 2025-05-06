import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

// CORS Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://finance-portal-vert.vercel.app/"],
  methods: ["GET", "POST" , "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

// JSON parser middleware
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
    html: `...` // (TRUNCATED FOR BREVITY, use your full HTML email here)
      .replace("${name}", name)
      .replace("${phone || 'Not Provided'}", phone || "Not Provided")
      .replace("${message}", message)
      .replace("${referenceId}", referenceId)
      .replace("${submittedDate}", submittedDate)
  };

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
