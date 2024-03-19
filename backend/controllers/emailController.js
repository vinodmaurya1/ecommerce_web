const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const {
  validname,
  validEmail,
  validMobile
} = require("../validation/valid");

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: process.env.MAIL_HOST,
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
    port: 587,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass:process.env.MAIL_PASSWORD,
    },
  })
);

// MAIL_MAILER=smtp
// MAIL_HOST=mail.divineglobalbusiness.com
// MAIL_PORT=587
// MAIL_USERNAME=admin@divineglobalbusiness.com
// MAIL_PASSWORD='Enter123@'
// MAIL_ENCRYPTION=tls
// MAIL_FROM_ADDRESS=admin@divineglobalbusiness.com
// MAIL_FROM_NAME="${APP_NAME}"


// const transporter = nodemailer.createTransport(
//   smtpTransport({
//     host: "mail.asyscraft.com",
//     secureConnection: false,
//     tls: {
//       rejectUnauthorized: false,
//     },
//     port: 587,
//     auth: {
//       user: "no-reply@asyscraft.com",
//       pass: "Enter123@",
//     },
//   })
// );




// const transporter = nodemailer.createTransport(
//   smtpTransport({
//     host: "mail.luckyrealtime.com",
//     secureConnection: false,
//     tls: {
//       rejectUnauthorized: false,
//     },
//     port: 587,
//     auth: {
//       user: "admin@luckyrealtime.com",
//       pass: "Enter123@",
//     },
//   })
// );


exports.sendEmail = async ({to, subject, text, html}) => {

  let mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS, 
    to: to, 
    subject: subject, 
    text: text,
    html: html,
  };

  try {

    // let data = req.body;
    // if (Object.keys(data).length === 0) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Body is empty can't craeate data" });
    // }

    // if (!data.name.trim() || validname.test(data.name)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "enter a valid name" });
    // }

    // if (!data.email.trim() || !validEmail.test(data.email.trim())) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "enter a valid email" });
    // }
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
        res.status(400).json({
          success: false,
          message: "Message not send!",
        });
        return;
      }
      console.log("Message sent successfully!");
        //   console.log("Message ID:", info);
      if (info) {
        return res.status(200).json({
          success: true,
          message: "Message sent successfully!",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
