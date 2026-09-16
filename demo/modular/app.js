/**
 * 🍕 ORDER UP! PIZZERIA
 * Class 11 — Modular Version
 *
 * This file starts the application.
 *
 * The actual actor logic lives in:
 *
 * customer.js
 * kitchen.js
 * driver.js
 *
 * All three files require the SAME event bus from events.js.
 */

// Requiring these files registers their event listeners.
const customer = require('./customer');
require('./kitchen');
require('./driver');

console.log('======================================');
console.log('🍕 ORDER UP! PIZZERIA — MODULAR DEMO');
console.log('======================================');
console.log('');

customer.placeOrder();
