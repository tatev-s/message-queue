const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const orderService = require('./services/order');
const userService = require('./services/user');
dotenv.config();

const port = process.env.APP_PORT;
const app = express();

app.use(bodyParser.urlencoded());
app.get('/', (req, res) => {
  res.send(
    `Submit queues.
  <br/> <a href="/user">User queue</a>
  <br/> <a href="/order">Order queue</a>`
  );
})
app.use(orderService);
app.use(userService);

app.listen(port, () => {
  console.log(`Orders service listening on port ${port}`);
});