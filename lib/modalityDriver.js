/**
 * @module ModalityDriver
 */

/**
 * Module dependencies
 */
var Signal = require( 'signals' );

/**
 * Module exports
 */

module.exports = ModalityDriver;


/**
 * Module constructor
 */
function ModalityDriver(){

  /*
  this.synthetized = new Signal();
  this.recognized = new Signal();
  this.updated = new Signal();
  */

}

var _signals = {
  'synthetized' : new Signal(),
  'recognized'  : new Signal(),
  'updated'     : new Signal()
};

ModalityDriver.prototype.on = function on( signal, callbackFn ){
  _signals[ signal ].add( callbackFn );
};

ModalityDriver.prototype.fire = function fire( signal, data ){
  _signals[ signal ].dispatch( data );
};

ModalityDriver.prototype.getID = function getID(){
  // overwrite with proper module driver name/id.
  return this.id || '';
};
