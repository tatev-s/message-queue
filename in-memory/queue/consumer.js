const rsmq = require('../helpers/redisConnection');
const queues = require('../config');
// I know it's not good idea to create timer for non existing queue :(
Object.values(queues).forEach(qname => {
  setInterval(() => {
    rsmq.receiveMessage({
        qname
      },
      (err, resp) => {
        if (err) {
          return;
        }
        // checks if a message has been received
        if (resp.id) {
          console.log('received message:', resp.message);
          rsmq.deleteMessage({
              qname: qname,
              id: resp.id
            },
            err => {
              if (err) {
                console.error(err);
                return;
              }
              console.log('deleted message with id', resp.id);
            }
          );
        } else {
          console.log('no available message in queue..');
        }
      }
    );
  }, 2500);
});