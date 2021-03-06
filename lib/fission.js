/**
 * @module Fission
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

module.exports = Fission;

/**
 * Module constructor
 * @constructor
 */
function Fission( opts ){
  opts = opts || {};

  this.interpretations = {};
  this.totalI = 0;
  this.setup();
}

/**
 * Extends with Emitter
 */

util.inherits( Fission, Emitter );

/**
 * Module implementation
 */

/**
 * setup Setup private events
 * @api private
 */
Fission.prototype.setup = function setup(){
  messaging.on( 'gyes::interpretation', this.sendInterpretation.bind(this) );
};

/**
 * sendInterpretation Emits interpretation event to the developer.
 * @param  {Object} data data should contain an interpretation object.
 * @private
 */
Fission.prototype.sendInterpretation = function sendInterpretation( data ){
  if ( !data ){
    throw new Error( 'Missing argument.' );
  }

  try{
    this.emit( data.interpretation.name, data.interpretation );
  }catch( e ){
    console.error( e );
    throw new Error( 'Fission::sendInterpretation | ', e );
  }
};


