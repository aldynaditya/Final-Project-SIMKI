const nodemailer = require('nodemailer');
const { gmail, password } = require('../../config');
const Mustache = require('mustache');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: gmail,
        pass: password,
    },
});

const otpMail = async (email, data, templateName = 'activation') => {
    try {
        let templatePath = `app/views/email/${templateName}.html`;
        let template = fs.readFileSync(templatePath, 'utf8');

        let message = {
            from: gmail,
            to: email,
            subject: templateName === 'otp' ? 'Otp for registration' : 'Password Reset Request',
            html: Mustache.render(template, data),
        };

        return await transporter.sendMail(message);
    } catch (ex) {
        console.log(ex);
    }
};

module.exports = { otpMail };