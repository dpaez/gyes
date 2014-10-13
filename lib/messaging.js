/**
 * @module Messaging
 */

/**
 * Module dependencies.
 */

var Emitter = require( 'events' ).EventEmitter;
var tube = new Emitter();
/**
 * Module exports
 */

module.exports = tube;