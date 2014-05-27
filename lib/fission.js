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
Fission.prototype.setup = function(){
  messaging.on( 'gyes::interpretation', this.sendInterpretation.bind(this) );
};

/**
 * sendInterpretation Emits interpretation event to the developer.
 * @param  {Object} data data should contain an interpretation object.
 * @api private
 */
Fission.prototype.sendInterpretation = function( data ){
  if ( !data ){
    throw new Error( 'Missing argument.' );
  }

  try{
    this.emit( data.interpretation.getName(), data.interpretation );
  }catch(e){
    throw new Error( 'Fission::sendInterpretation | ', e );
  }
};


