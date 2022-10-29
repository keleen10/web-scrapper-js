require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const nightmare = require('nightmare')()

const args = process.argv.slice(2)
const url = args[0]
const minPrice = args[1]

checkPrice()

async function checkPrice() {
    try {
        const priceString = await nightmare.goto(url)
            .wait("#a-price-whole")
            .evaluate(() => document.getElementById("a-price-whole").innerText)
            .end()
        const priceNumber = parseFloat(priceString.replace('$', ''))
        if (priceNumber < minPrice) {
            console.log(
                'Price Is Low',
                `The price on ${url} has dropped below ${minPrice}`
            )
        }
    } catch (e) {
        
        throw e
    }
}

/*function sendEmail(subject, body) {
    const email = {
        to: 'sapeco9464@evilant.com',
        from: 'price-checker@keleen.com',
        subject: subject,
        text: body,
        html: body
    }

    return sgMail.send(email)
}
*/
