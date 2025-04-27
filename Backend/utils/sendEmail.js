const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.PASS,
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
        <a href="http://localhost:4001/api/verify/${token}">Verify Email</a>
      `,
    };
    console.log(token);
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

module.exports = sendVerificationEmail;
