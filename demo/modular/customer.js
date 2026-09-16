/**
 * 🍕 CUSTOMER
 *
 * The customer places an order and listens for status updates.
 *
 * Notice:
 * The customer does NOT directly call kitchen functions.
 * The customer communicates by emitting and listening for events.
 */

const events = require('./events');

/**
 * Place a new order.
 *
 * This function creates the order information and emits
 * "order-placed".
 */
function placeOrder() {
  const order = {
    orderId: 101,
    items: ['Large Pepperoni Pizza', 'Garlic Knots'],
    address: '123 Main Street',
  };

  console.log('👤 Customer: Placing order...');

  events.emit('order-placed', order);

  return order;
}

// ---------------------------------------------------------
// Customer listens for ALL status updates.
// ---------------------------------------------------------

events.on('order-placed', (payload) => {
  console.log(`👤 Customer: Order #${payload.orderId} was received.`);
});

events.on('confirmed', (payload) => {
  console.log(`👤 Customer: Order #${payload.orderId} is confirmed.`);
});

events.on('in-the-oven', (payload) => {
  console.log('👤 Customer: Your pizza is in the oven! 🔥');
});

events.on('ready-for-pickup', (payload) => {
  console.log('👤 Customer: Your pizza is ready for pickup!');
});

events.on('out-for-delivery', (payload) => {
  console.log('👤 Customer: Your pizza is on the way! 🚗');
});

events.on('delivered', (payload) => {
  console.log(`👤 Customer: Order #${payload.orderId} has arrived! 🍕`);
});

module.exports = {
  placeOrder,
};
