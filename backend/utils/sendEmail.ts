import nodemailer from "nodemailer";

export const sendEmail = async (email: string, pdfPath: string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000,
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Salary Slip",
        text: "Please Find your salary slip attached",
        attachments: [
            {
                filename: "salary-slip.pdf",
                path: pdfPath,
            }
        ]
    });

    console.log("Email sent:", info.messageId);
};