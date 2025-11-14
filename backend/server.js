import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Resend init
const resend = new Resend(process.env.RESEND_API_KEY);

// Statikus frontend
const frontendPath = path.join(__dirname, "dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// API endpoint
app.post("/api/order", async (req, res) => {
  const { name, email, sole, top } = req.body;

  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `New Shoeshop Order from ${name}`,
      text: `
Order details:

Name: ${name}
Email: ${email}
Sole: ${sole}
Top: ${top}
      `,
    });

    console.log(result);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
