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
 */

function Modality( name, type, opts ){
  if ( !(this instanceof Modality) ) return new Modality( name, type, opts );

  if ( 'string' !== typeof name ) throw Error( 'A name is required.' );

  if ( 'string' !== typeof type ) throw Error( 'A type is required. Options are: input, output or both.' );


  opts = opts || {};

  this.name = name;

  this.type = type;

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
 * @api public
 */
Modality.prototype.use = function( modalityDriver ){
  if ( 'undefined' === typeof modalityDriver ){
    throw new Error( 'A modality driver is missing.' );
  }

  this.md = modalityDriver;

  if ( (this.type === 'output') || (this.type === 'both') ){
    messaging.on( 'gyes::synthetize', this.dispatchSynthetizer.bind(this) );
  }

  if ( (this.type === 'input') || (this.type === 'both') ){
    this.md.on( 'recognized', this.dispatchRecognizer );
  }

  if ( (this.md.start) && ('function' === typeof this.md.start ) ){
    this.md.start();
  }

};

Modality.prototype.dispatchSynthetizer = function( data ){
  debug( 'modality::dispatchSynthetizer' );
  if ( !data ){
    return;
  }
  if ( (data.modality === this.name) && (data.modalityDriver === this.md.getID()) ){
    this.md.fire( 'synthetized', data.params );
  }
};

Modality.prototype.dispatchRecognizer = function( data ){
  debug( 'modality::dispatchRecognizer' );
  messaging.emit( 'gyes::recognize', {'data':data} );
};

