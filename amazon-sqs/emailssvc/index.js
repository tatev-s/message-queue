const nodemailer = require('nodemailer');
const sqs = require("../helpers/awsSqs");
const {
  Consumer
} = require('sqs-consumer');
const dotenv = require('dotenv');
dotenv.config();

// configure Nodemailer
const transport = nodemailer.createTransport({
  host: 'smtp.googlemail.com',
  port: 587,
  auth: {
    user: 'email',
    pass: 'password'
  }
});

function sendMail(message) {
  const {
    userEmail,
    itemsQuantity,
    itemName
  } = JSON.parse(message.Body);
  const emailMessage = {
    from: 'SENDER_EMAIL_ADDRESS', // Sender address
    to: userEmail, // Recipient address
    subject: 'Order Received | NodeShop', // Subject line
    html: `<p>Hi ${userEmail}.</p. <p>Your order of ${itemsQuantity} ${itemName} has been received and is being processed.</p> <p> Thank you for shopping with us! </p>` // Plain text body
  };

  transport.sendMail(emailMessage, function (err, info) {
    if (err) {
      console.log(`EmailsSvc | ERROR: ${err}`);
    } else {
      console.log(`EmailsSvc | INFO: ${info}`);
    }
  });
}

const queueUrl = process.env.AWS_QUEUSE_URL;

const app = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async message => {
    sendMail(message);
  },
  sqs: sqs,
  batchSize: 10
});

app.on('error', err => {
  console.error(err.message);
});

app.on('processing_error', err => {
  console.error(err.message);
});

console.log('Emails service is running');
app.start();