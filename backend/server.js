import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "dist");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));

app.post("/api/order", async (req, res) => {
  const { name, email, sole, top } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: "Your Shoeshop order",
      text: `
Dear ${name}!

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
    res.status(500).json({ message: "An error occurred while sending the email." });
  }
});

app.use(express.static(path.join(frontendPath, "../shoestore/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../shoestore/dist", "index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
