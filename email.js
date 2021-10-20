const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

dotenv.config()

const sendInvoice = (subject, content, filePaths = []) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.SEND_TO,
    subject: subject || 'Lambda test email',
    html: content,
    attachments: filePaths.map(file => ({filename: file.split('/').pop(), path: file}))
  }

  console.log(`Sending email to '${process.env.EMAIL_ADDRESS}' with subject '${subject}'...`)
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.error('there was an error: ', err)
    }
  })
}

module.exports = sendInvoice
