
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVICE_USER,
    pass: process.env.EMAIL_SERVICE_PASS,
  },
});

const sendEmail = async ({ emails, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: '"Admin App" <fhdsugvi>', // sender address
      to: emails, // list of receivers
      subject: subject, // Subject line
      html: html, // html body
    });
    
  } catch (err) {
    console.log("could not send email to " + emails);
    console.log(err.message);
    throw err ;
  }
};

const sendEmailToattendees = async ({ emails, subject, text , email }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Event Sync" ,${email} `,// sender address
      to: emails, 
      subject: subject,
      text: text, 
    });
    
  } catch (err) {
    console.log("could not send email to " + emails);
    console.log(err.message);
    throw err ;
  }
}

const sendOtpEmail = async ({ otp, email }) => {
  await sendEmail({
    emails: [email],
    subject: "Otp for your verification",
    html: `
      <html>
        <body>
          <div style="text-align: center; padding: 20px;">
            <h1>Welcome to Event Sync</h1>
            <p>Your OTP for verification is:</p>
            <h2 style="color: #4CAF50;">${otp}</h2>
            <p>Please enter this OTP to complete your verification.</p>
            <p>If you did not request this, please ignore this email.</p>
          </div>
        </body>
      </html>
      `,
  });
};


export { sendOtpEmail , sendEmail, sendEmailToattendees };
