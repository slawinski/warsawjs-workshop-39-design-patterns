const EventBus = require('./event-bus');
const debug = require('debug')('app:event-bus');
const knex = require('knex')(require('../../knexfile'));

function notify(payload) {
  knex('users')
    .first()
    .where('user_id', payload.client_id)
    .then(client => {
      debug('Sending confirmation email to: ' + client.mail)
    })
}

const runInBatch = (command, count) => {
  let queue = [];
  return payload => {
    queue.push(() => command(payload));
    if (queue.length >= count) {
      const copy = [...queue];
      queue = [];
      copy.forEach((command) => {
        command();
      });
    }
  };
};

EventBus.subscribe('CAR_RENTED', runInBatch(notify, 2))