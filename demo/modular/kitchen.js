/**
 * 🍕 KITCHEN
 *
 * The kitchen listens for new orders.
 *
 * It then creates the next events in the order lifecycle.
 */

const events = require('./events');

/**
 * Create the common status payload.
 *
 * We keep this shape consistent because Classes 12 and 13
 * will reuse it:
 *
 * {
 *   orderId,
 *   status,
 *   timestamp
 * }
 */
function createStatusPayload(orderId, status) {
  return {
    orderId,
    status,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Handle a new order.
 *
 * This is the function we can test directly.
 *
 * It receives an order and emits the status events that
 * belong to the kitchen.
 */
function handleOrder(order) {
  console.log(`👨‍🍳 Kitchen: Received order #${order.orderId}.`);

  events.emit(
    'confirmed',
    createStatusPayload(order.orderId, 'confirmed')
  );

  events.emit(
    'in-the-oven',
    createStatusPayload(order.orderId, 'in-the-oven')
  );

  /*
   * Simulate baking time.
   *
   * setTimeout means:
   * "Run this function later."
   */
  setTimeout(() => {
    console.log(`👨‍🍳 Kitchen: Order #${order.orderId} is ready!`);

    events.emit(
      'ready-for-pickup',
      createStatusPayload(order.orderId, 'ready-for-pickup')
    );
  }, 2000);
}

/**
 * The kitchen listens for the customer's new order.
 *
 * This connects the event to our handler.
 */
events.on('order-placed', handleOrder);

module.exports = {
  handleOrder,
  createStatusPayload,
};
