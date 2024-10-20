// emailService.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || "587",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendVerificationEmail = async (to, token) => {
    // const verificationLink = `http://localhost:3000/api/auth/investor/verify-email?token=${token}`;
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`

    const mailOptions = {
        from: "iqbalfadhila35@gmail.com",
        to,
        subject: "Verify Your Email Address",
        html: `<p>Thank you for registering. Please verify your email address by clicking <a href="${verificationLink}">here</a>. This link will expire in 1 hour.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const sendResetPasswordEmail = async (to, token) => {
    const resetPasswordLink = `http://localhost:5173/reset-password?token=${token}`;

    const mailOptions = {
        from: "iqbalfadhila35@gmail.com",
        to,
        subject: "Reset Your Password",
        html: `<p>You requested a password reset. Click <a href="${resetPasswordLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
