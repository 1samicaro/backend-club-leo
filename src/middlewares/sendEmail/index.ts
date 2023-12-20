import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'clubleoapp@gmail.com',
    pass: 'eoqduodlxxinwlbq'
  },
  secure: true
})

const sendEmail = async (email: string, subject: string, text: string, html: string): Promise<void> => {
  const mailData = {
    from: 'clubleoapp@gmail.com',
    to: email,
    subject,
    text,
    html
  }
  transporter.sendMail(mailData, function (err: any, info) {
    if (err !== undefined) console.log('mail not sent')
    else console.log('mail sent')
  })
}

export default sendEmail
