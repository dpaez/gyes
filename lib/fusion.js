/**
 * Module dependencies
 */

var util = require( 'util' );
var Emitter = require( 'events' ).EventEmitter;
var debug = require('debug')('gyes:fusion');
var messaging = require( './messaging' );

/**
 * Module exports
 */

module.exports = Fusion;

/**
 * Module constructor
 */

function Fusion( opts ){
  opts = opts || {};
  this.interpretations = {};
  this.events = {};
  this.totalI = 0;


  this.setup();
}


/**
 * Extending with Emitter
 */

util.inherits( Fusion, Emitter );

/**
 * Module methods
 */

Fusion.prototype.setup = function(){
  messaging.on( 'gyes::new_signal', this.onSignal.bind(this) );
};

/**
 * fuse Adds a new fusion to the fusion system.
 * @param  {Object} anInterpretation One or more modality events which defines a fusion.
 * @api public
 */
Fusion.prototype.fuse = function( anInterpretation ){

  if ( 'undefined' === typeof anInterpretation ){
    throw new Error( 'Missing arguments. At least one modality event is required.' );
  }

  // TODO: try here with workers
  // var w = new Worker();

  this.launchMultipleListeners( anInterpretation );
};


Fusion.prototype.launchMultipleListeners = function( anInterpretation ){
  var self = this;

  var modalityEvents = anInterpretation.getEventsList();
  /*
  for ( var i=0; i < modalityEvents.length; i++ ){
    // hooking up new modality events to be listened
    this.on( modalityEvents[ i ], self.onEvent );
  }
  */
  this.interpretations[ this.totalI++ ] = anInterpretation;

  // create/update per event hash of interpretations
  // one event can be part of many interpretations
  // so this is done to avoid walk over all the interpretations.
  for ( var j = 0; j < modalityEvents.length; j++ ) {
    var modalityEvent = modalityEvents[ j ];

    // hooking up new modality events to be listened
    this.on( modalityEvent, this.onEvent.bind( self ) );

    this.events[ modalityEvent ] = this.events[ modalityEvent ] || [];

    this.events[ modalityEvent ].push( anInterpretation );
  }
};

Fusion.prototype.onEvent = function( eventName ){
  // TODO: do it the async way... :/
  var eventInterpretations = this.events[ eventName ] || [];

  console.log( 'interpretation::onEvent ', eventInterpretations );

  for ( var i = 0; i < eventInterpretations.length; i++ ){
    //eventInterpretations[ i ].touch( eventName );
    eventInterpretations[ i ].touch.call( eventInterpretations[ i ], eventName );
  }

};

Fusion.prototype.onSignal = function( data ){
  debug( 'fusion:onSignal ', data );

  // TODO: improve comments :)
  // if do data.gesture then this is a hardcoded solution...
  // Must think on a modality driver (mini) protocol
  this.emit( data.gesture, data.gesture );
};