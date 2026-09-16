/**
 * 🍕 DRIVER
 *
 * The driver waits for a pizza to become ready.
 *
 * The driver does NOT directly call the kitchen.
 * The driver listens for "ready-for-pickup".
 */

const events = require('./events');

/**
 * Handle a pizza that is ready for pickup.
 *
 * This function can be tested separately from the EventEmitter.
 */
function handlePickup(payload) {
  console.log(`🚗 Driver: Picking up order #${payload.orderId}.`);

  events.emit('out-for-delivery', {
    orderId: payload.orderId,
    status: 'out-for-delivery',
    timestamp: new Date().toISOString(),
  });

  /*
   * Pretend the driver is traveling to the customer.
   */
  setTimeout(() => {
    console.log(`🚗 Driver: Delivered order #${payload.orderId}!`);

    events.emit('delivered', {
      orderId: payload.orderId,
      status: 'delivered',
      timestamp: new Date().toISOString(),
    });
  }, 2000);
}

/**
 * Listen for pizzas that are ready.
 */
events.on('ready-for-pickup', handlePickup);

module.exports = {
  handlePickup,
};
