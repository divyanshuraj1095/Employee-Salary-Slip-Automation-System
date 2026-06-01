import nodemailer from "nodemailer";
console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD:", process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL,
        pass : process.env.EMAIL_PASSWORD   
    }
});

export const sendEmail = async(email : string, pdfPath : string)=>{
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject : "Salary Slip",
        text: "Please Find your salary slip attached",
        attachments:[
            {
                filename : "salary-slip.pdf",
                path : pdfPath
            }
        ]
    });
};