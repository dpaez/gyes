/**
 * @module Modality
 */

/**
 * Module dependencies
 */

var util = require( 'util' );
var debug = require('debug')('gyes:modality');
var messaging = require( './messaging' );

/**
 * Module exports
 */

module.exports = Modality;

/**
 * Module constructor
 * @constructor
 */
function Modality( name, modType, opts ){
  if ( !(this instanceof Modality) ) return new Modality( name, modType, opts );

  if ( 'string' !== typeof name ) throw Error( 'A name is required.' );

  if ( 'string' !== typeof modType ) throw Error( 'A modType is required. Options are: input, output or both.' );


  opts = opts || {};

  this.name = name;

  this.modType = modType;

  this.opts = opts;

}

/**
 * Extends with `Emitter`.
 */

//util.inherits( Modality, Emitter );

/**
 * Module implementation
 */

/**
 * use Attachs a modalityDriver instance with a modality instance.
 * @param  {Object} modalityDriver A modali driver instance.
 * @public
 */
Modality.prototype.use = function use( modalityDriver ){
  if ( 'undefined' === typeof modalityDriver ){
    throw new Error( 'A modality driver is missing.' );
  }

  this.md = modalityDriver;

  if ( (this.modType === 'output') || (this.modType === 'both') ){
    messaging.on( 'gyes::synthesize', this.dispatchSynthetizer.bind(this) );
  }

  if ( (this.modType === 'input') || (this.modType === 'both') ){
    this.md.on( 'recognized', this.dispatchRecognizer );
  }

  if ( (this.md.start) && ('function' === typeof this.md.start ) ){
    this.md.start();
  }

};

/**
 * dispatchSynthetizer Allows a modality driver to trigger custom synthetized functionality.
 * @param  {Object} data An object containing a valid modality identifier and a modalityDriver id.
 * @public
 */
Modality.prototype.dispatchSynthetizer = function dispatchSynthetizer( data ){
  debug( 'modality::dispatchSynthetizer' );
  if ( !data ){
    return;
  }
  console.log('modality::dispatchSynthetizer md ', this.md);
  if ( (data.modality === this.name) && (data.modalityDriver === this.md.getID()) ){
    this.md.fire( 'synthetized', data.params );
  }
};


/**
 * dispatchRecognizer Emits to plusultra data recognized by the modality.
 * @param  {Object} data Recognized data object.
 * @public
 */
Modality.prototype.dispatchRecognizer = function dispatchRecognizer( data ){
  debug( 'modality::dispatchRecognizer' );
  messaging.emit( 'gyes::recognize', {'data':data} );
};
