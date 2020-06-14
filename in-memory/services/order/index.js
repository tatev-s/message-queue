const express = require('express');
const router = express.Router();
const queueHelper = require('../../queue/producer');
const path = require('path');
const {
  CONST_ORDER_QUEUE
} = require('../../config');

router.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

router.post('/order', (req, res) => {
  const data = {
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    userEmail: req.body.userEmail,
    itemsQuantity: req.body.itemsQuantity
  };


  queueHelper.sendMessage(CONST_ORDER_QUEUE, JSON.stringify(data))
    .then(id => {
      res.send(
        `Send Message with Id ${id}.
      <br/> <a href="/">Continue Shopping</a>`
      );
    })
    .catch(err => {
      res.send(`We ran into an error. ${err}  <br> Please try again.
              <br/> <a href="/">Continue Shopping</a>`);
    });
});

module.exports = router;