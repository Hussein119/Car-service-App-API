const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text').htmlToText;

module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.firstName = user.name.split(' ')[0]),
      (this.email = user.email),
      (this.url = url);
    this.from = `Hussein <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'development') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'gmail',
        //name: process.env.NAME,
        //host: process.env.EMAIL_HOST,
        //port: process.env.EMAIL_PORT,
        //secure: true,
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
          //user: process.env.EMAIL_USERNAME,
          //pass: process.env.EMAIL_PASSWORD,
        },
      });
    }
    // return nodemailer.createTransport({
    //   //service: 'Gmail',
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   auth: {
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    //   // Activate in gmail "less secure app" option
    // });
  }
  async send(template, subject) {
    // Send the actual email
    // 1) Render HTML based on a pug template

    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      email: this.email,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOption = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email

    await this.newTransport().sendMail(mailOption);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to Our Car Services App!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
