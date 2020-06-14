const express = require('express');
const router = express.Router();
const queueHelper = require('../../queue/producer');
const path = require('path');
const {
  CONST_USER_QUEUE
} = require('../../config');

router.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

router.post('/user', (req, res) => {
  const data = {
    firstName: req.body.firstName,
    email: req.body.email,
  };

  queueHelper
    .sendMessage(CONST_USER_QUEUE, JSON.stringify(data))
    .then(id => {
      res.send(
        `Send Message with Id ${id}.
      <br/> <a href="/">Register</a>`
      );
    })
    .catch(err => {
      // send email to emails API
      res.send(`We ran into an error. ${err}  <br> Please try again.
                <br/> <a href="/">Continue Shopping</a>`);
    });
});

module.exports = router;