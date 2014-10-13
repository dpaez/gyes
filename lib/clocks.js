/**
 * @module Clocks
 */

/**
 * Module dependencies
 */

var util = require( 'util' );
var Emitter = require( 'events' ).EventEmitter;
var messaging = require( './messaging' );

/**
 * Module exports
 */

module.exports = Clock;

/**
 * Module constructor
 * @constructor
 */
function Clock( startTime, updateTime ){
  startTime = startTime || 3000;
  updateTime = updateTime || 1000;

  this.startTime = startTime;
  this.updateTime = updateTime;

  this.timeoutID = undefined;
}

/**
 * Extends with Emitter
 */

util.inherits( Clock, Emitter );

/**
 * Module implementation
 */

Clock.prototype.update = function(){
  var self = this;
  // check if exists a timeout for this interpretation
  if ( 'undefined' === typeof this.timeoutID ){
    // create a new timeout
    this.timeoutID = setTimeout( self.stop.bind(self), self.startTime );
    return;
  }

  console.log( 'clocks::update' );

  // update old timeout
  clearTimeout( this.timeoutID );
  this.timeoutID = setTimeout( self.stop.bind(self), self.updateTime );
};

/**
 * stop Halts an interpretation window clock.
 * @private
 * @fires Clocks#stop
 */
Clock.prototype.stop = function(){
  /**
   * @event Clocks#stop
   */
  this.emit( 'clock::stop' );
  clearTimeout( this.timeoutID );
};