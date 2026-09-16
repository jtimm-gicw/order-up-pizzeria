/**
 * 🍕 ORDER UP! PIZZERIA
 * Shared Event Bus
 *
 * This file creates ONE EventEmitter instance and exports it.
 *
 * IMPORTANT:
 *
 * require('events') gives us the EventEmitter CLASS.
 * A class is a blueprint.
 *
 * We still need to create an INSTANCE:
 *
 * new EventEmitter()
 *
 * Because this file is required by multiple actor files,
 * they can all use this same exported event bus.
 */

const EventEmitter = require('events');

const events = new EventEmitter();

module.exports = events;
