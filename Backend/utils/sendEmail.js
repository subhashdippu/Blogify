const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  const verifyLink = `http://localhost:4001/api/auth/verify/${token}`;
  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAIL_PAWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Welcome to Bligify!</h2>
        <p>Please click the link below to verify your email:</p>
        <a href="${verifyLink}">Verify Email</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

module.exports = sendVerificationEmail;
