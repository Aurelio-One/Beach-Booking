const mailgun = require('mailgun-js')

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

const sendEmail = async (to, subject, text) => {
  const data = {
    from: 'maurici.aurelio@gmail.com',
    to,
    subject,
    text,
  }

  try {
    await mg.messages().send(data)
    console.log("Email envoyé!")

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail:", error)
    throw error
  }
}

module.exports = sendEmail
