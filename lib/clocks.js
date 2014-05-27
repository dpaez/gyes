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
 */

function Clock( interpretation, startTime, updateTime ){
  if ( 'undefined' === typeof interpretation ){
    throw new Error( 'An interpretation is required.' );
  }
  startTime = startTime || 3000;
  updateTime = updateTime || 1000;

  this.interpretation = interpretation;
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

Clock.prototype.stop = function(){
  this.emit( 'clock::stop' );
  clearTimeout( this.timeoutID );
};