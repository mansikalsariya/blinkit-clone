import nodemailer from 'nodemailer';

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        let mailOptions = {
            from: `"Binkeyit Support" <${process.env.SMTP_USER}>`,
            to: sendTo,
            subject: subject,
            html: html
        };

        let info = await transporter.sendMail(mailOptions);
        console.log(" Email Sent:", info.response); 
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error(" Email Send Error:", error);
        return { success: false, message: "Email sending failed", error };
    }
};

export default sendEmail;































// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// // Email Validation Function
// const validateEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// };

// // Create Transporter (SMTP Configuration)
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false, // true for 465, false for 587
//     requireTLS: true, // Gmail के लिए जरूरी है
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });

// const sendEmail = async ({ sendTo, subject, otp }) => {
//     try {
//         if (!validateEmail(sendTo)) {
//             console.error("❌ Invalid Email Address:", sendTo);
//             return { success: false, message: "Invalid email address" };
//         }

//         if (!otp) {
//             console.error("❌ OTP is missing or undefined!");
//             return { success: false, message: "OTP is missing" };
//         }

//         const html = `
//             <div style="font-family: Arial, sans-serif; text-align: center;">
//                 <h2>🔐 Your OTP Code</h2>
//                 <p>Your OTP for verification is:</p>
//                 <h1 style="color: blue;">${otp}</h1>
//                 <p>This OTP is valid for 10 minutes.</p>
//             </div>
//         `;

//         const info = await transporter.sendMail({
//             from: `"Binkeyit" <${process.env.SMTP_USER}>`,  
//             to: sendTo,
//             subject: subject,
//             html: html,
//         });

//         console.log("✅ Email Sent Successfully:", info.messageId);
//         return { success: true, messageId: info.messageId };

//     } catch (error) {
//         console.error("❌ Email Sending Error:", error.message);
//         return { success: false, message: "Email sending failed", error };
//     }
// };

// export default sendEmail;
