const nodemailer = require("nodemailer");
require('dotenv').config()

const SubmitForm = (req,res)=> {

    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "ab.anubhav19@gmail.com",
            pass: process.env.ID_ACCESS_PASS
        }
    });

    const receiver = {
        from : "ab.anubhav19@gmail.com",
        to : "avbhutani3@gmail.com",
        subject : `Contact Request on Portfolio - ${req.body.name}`,
        text : req.body.content
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("Successfully sent mail!");
        res.end();
    });
}


module.exports = SubmitForm