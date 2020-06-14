const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

// Configure the region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Create an SQS service object
module.exports = new AWS.SQS({
  apiVersion: '2012-11-05'
});