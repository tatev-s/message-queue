const express = require('express');
const bodyParser = require('body-parser');
const sqs = require("../helpers/awsSqs");
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.ORDER_SERVICE_PORT;
const app = express();

app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/order', (req, res) => {
  const orderData = {
    userEmail: req.body['userEmail'],
    itemName: req.body['itemName'],
    itemPrice: req.body['itemPrice'],
    itemsQuantity: req.body['itemsQuantity']
  };
  const date = new Date();
  const timestamp = date.getTime();

  let sqsOrderData = {
    MessageAttributes: {
      userEmail: {
        DataType: 'String',
        StringValue: orderData.userEmail
      },
      itemName: {
        DataType: 'String',
        StringValue: orderData.itemName
      },
      itemPrice: {
        DataType: 'Number',
        StringValue: orderData.itemPrice
      },
      itemsQuantity: {
        DataType: 'Number',
        StringValue: orderData.itemsQuantity
      }
    },
    MessageBody: JSON.stringify(orderData),
    MessageDeduplicationId: timestamp.toString(),
    MessageGroupId: 'UserOrders',
    QueueUrl: process.env.AWS_QUEUSE_URL
  };
  // send the order data to the SQS queue
  const sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();

  sendSqsMessage
    .then(data => {
      console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
      res.send(
        `Thank you for your order. Check you inbox for the confirmation email.
        <br/> <a href="/">Continue Shopping</a>`
      );
    })
    .catch(err => {
      console.log(`OrdersSvc | ERROR: ${err}`);
      // send email to emails API
      res.send(`We ran into an error. ${err}  <br> Please try again.
                <br/> <a href="/">Continue Shopping</a>`);
    });
});

console.log(`Orders service listening on port ${port}`);
app.listen(port);