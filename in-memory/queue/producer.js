const rsmq = require('../helpers/redisConnection');

module.exports = {
  sendMessage: function (qname, message) {
    return this.isQueueExist(qname)
      .then(isExist => {
        if (!isExist) return this.createQueue(qname);
        return true;
      })
      .then(created => {
        if (!created) return;
        return this.sendMessageTo(qname, message);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  },
  isQueueExist: function (qname) {
    return rsmq
      .listQueues()
      .then(queues => {
        return queues.includes(qname);
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  },
  createQueue: function (qname) {
    return rsmq
      .createQueue({
        qname
      })
      .then(() => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  },
  sendMessageTo: function (qname, message) {
    return rsmq
      .sendMessage({
        qname,
        message
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
};