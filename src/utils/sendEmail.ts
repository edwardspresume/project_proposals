import nodemailer from 'nodemailer';

export async function sendEmail(mailOptions: object) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
