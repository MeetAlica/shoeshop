import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- API végpont a rendeléshez ---
app.post("/api/order", async (req, res) => {
  const { name, email, sole, top } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // 465 esetén true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "Your Shoeshop order",
      text: `
Dear ${name},

We have received your order and processed it.

Your customized shoe:
Sole: ${sole}
Top: ${top}

Your email: ${email}
      `,
    });

    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred during sending the email." });
  }
});

app.listen(process.env.PORT || 5000, () => console.log(`✅ Server running on port ${process.env.PORT || 5000}!`));
