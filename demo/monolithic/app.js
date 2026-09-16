/**
 * 🍕 ORDER UP! PIZZERIA
 * Class 11 — Event-Driven Basics
 *
 * This is the MONOLITHIC version.
 *
 * "Monolithic" simply means that we are keeping the main
 * application logic together in one file.
 *
 * Our goal is to learn the EVENT pattern before splitting
 * the code into multiple files.
 */

const EventEmitter = require('events');

// ---------------------------------------------------------
// STEP 1 — Create ONE shared event bus
// ---------------------------------------------------------

/*
 * EventEmitter is a Node.js class.
 *
 * We create an INSTANCE of that class with "new".
 *
 * Think of "events" as the pizzeria's announcement system.
 * Any actor can announce an event.
 * Any actor can listen for an event.
 */
const events = new EventEmitter();

// ---------------------------------------------------------
// STEP 2 — Our order data
// ---------------------------------------------------------

const order = {
  orderId: 101,
  items: ['Large Pepperoni Pizza', 'Garlic Knots'],
  address: '123 Main Street',
};

// ---------------------------------------------------------
// STEP 3 — Helper for creating status information
// ---------------------------------------------------------

/*
 * A PAYLOAD is the information carried by an event.
 *
 * We will reuse this same shape in Classes 12 and 13:
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

// ---------------------------------------------------------
// STEP 4 — CUSTOMER LISTENS FOR STATUS UPDATES
// ---------------------------------------------------------

/*
 * The customer does NOT call the kitchen.
 * The customer does NOT call the driver.
 *
 * Instead, the customer listens for events.
 *
 * When one of these events happens, this function runs.
 */
events.on('order-placed', (payload) => {
  console.log(`👤 Customer: Order #${payload.orderId} was placed.`);
});

events.on('confirmed', (payload) => {
  console.log(`👤 Customer: Order #${payload.orderId} was confirmed!`);
});

events.on('in-the-oven', (payload) => {
  console.log(`👤 Customer: Your pizza is in the oven!`);
});

events.on('ready-for-pickup', (payload) => {
  console.log(`👤 Customer: Your pizza is ready for pickup!`);
});

events.on('out-for-delivery', (payload) => {
  console.log(`👤 Customer: Your pizza is out for delivery!`);
});

events.on('delivered', (payload) => {
  console.log(`👤 Customer: Order #${payload.orderId} has been delivered! 🍕`);
});

// ---------------------------------------------------------
// STEP 5 — KITCHEN LISTENS FOR NEW ORDERS
// ---------------------------------------------------------

/*
 * The kitchen is listening for "order-placed".
 *
 * Notice that the customer never directly calls this
 * kitchen code.
 *
 * The EVENT connects them.
 */
events.on('order-placed', (order) => {
  console.log(`👨‍🍳 Kitchen: Received order #${order.orderId}.`);
  console.log(`👨‍🍳 Kitchen: Confirming order...`);

  events.emit(
    'confirmed',
    createStatusPayload(order.orderId, 'confirmed')
  );

  console.log(`👨‍🍳 Kitchen: Starting the pizza...`);

  events.emit(
    'in-the-oven',
    createStatusPayload(order.orderId, 'in-the-oven')
  );

  /*
   * setTimeout lets us pretend the pizza takes time to bake.
   *
   * We are not actually making the program wait.
   * We are scheduling this function to run later.
   */
  setTimeout(() => {
    console.log(`👨‍🍳 Kitchen: Pizza is finished!`);

    events.emit(
      'ready-for-pickup',
      createStatusPayload(order.orderId, 'ready-for-pickup')
    );
  }, 2000);
});

// ---------------------------------------------------------
// STEP 6 — DRIVER LISTENS FOR READY-FOR-PICKUP
// ---------------------------------------------------------

/*
 * The driver does not ask the kitchen:
 *
 * "Are you finished yet?"
 *
 * The driver listens for an event.
 */
events.on('ready-for-pickup', (payload) => {
  console.log(`🚗 Driver: I see order #${payload.orderId}. Picking it up!`);

  events.emit(
    'out-for-delivery',
    createStatusPayload(payload.orderId, 'out-for-delivery')
  );

  /*
   * Pretend the driver needs time to reach the customer.
   */
  setTimeout(() => {
    console.log(`🚗 Driver: Order #${payload.orderId} delivered!`);

    events.emit(
      'delivered',
      createStatusPayload(payload.orderId, 'delivered')
    );
  }, 2000);
});

// ---------------------------------------------------------
// STEP 7 — CUSTOMER STARTS EVERYTHING
// ---------------------------------------------------------

/*
 * The customer starts the process by emitting one event.
 *
 * This is the beginning of our event chain:
 *
 * order-placed
 *      ↓
 * confirmed
 *      ↓
 * in-the-oven
 *      ↓
 * ready-for-pickup
 *      ↓
 * out-for-delivery
 *      ↓
 * delivered
 */
console.log('🍕 Customer: I am placing my order!');

events.emit('order-placed', order);
