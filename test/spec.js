/**
 * Test dependencies
 */

var should = require( 'should' );
var gyes = require( '../' );
//var LeapDriver = require( '../../LeapModalityDriver/LeapModalityDriver' );
var Modality = gyes.Modality;

/**
 * Test locals variables
 */

var socketURI = 'ws://localhost:26060';
//var socketURI = 'ws://plusultra.geutstudio.com';

var options = {
  // transports: ['websocket'],
  'force new connection': true,
  'forceNew': true
};

/**
 * Tests!
 */

describe('connection', function(){

  it('should connect to default plusultra server', function( done ){
    var app_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdCIsInNjb3BlcyI6WyJtZWRpdW0iXSwiaWF0IjoxNDQzMjgzMTQzfQ.DcIqzxDbFrjP-lTO_8G5g-SncRxwRcYbaPuajgJtHbI';

    var client = new gyes( app_key, socketURI, options );
    console.log('client is ', client.io.on)
    client.should.be.an.instanceOf( gyes );
    client.io.should.have.property( 'on' );

    client.io.on('connect', function(){
      client
      .io.on( 'authenticated', function(err, res){
        console.info( 'Authenticated. ...|_|... on Plusultra!\n' );
        should.not.exist(err);
        done();
      })
      .io.on( 'unauthorized', function(){
        console.info( 'unauthorized!' );
        done();
      })
      /*.io.on( 'error', function ( e ){ 
        console.log('Connection Error: ', e) 
        done();
      })*/

      console.log('calling authenticate...')
      client.authenticate( app_key );
    });
  });

});


describe('connected behavior', function(){
  var app_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdCIsInNjb3BlcyI6WyJtZWRpdW0iXSwiaWF0IjoxNDQzMjgzMTQzfQ.DcIqzxDbFrjP-lTO_8G5g-SncRxwRcYbaPuajgJtHbI';

  var client = new gyes( app_key, socketURI, options );

  var modality = new Modality( 'leap', 'input', {} );

  client.should.be.an.instanceOf( gyes );
  client.io.should.have.property( 'on' );
  
  // connect
  beforeEach(function(done) {

    client.io.on('connect', function(){

      client
      .io.on('authenticated', function(err, res){
        console.info( 'Authenticated. ...|_|... on Plusultra!\n' );
        should.not.exist(err);
      })
      .io.on( 'unauthorized', function(){
        console.info( 'unauthorized!' );
      })
      .io.on( 'error', function ( e ){ console.log('Connection Error: ', e) })

      client.authenticate( app_key );

      client.io.on('ACK', function(err, msg){
        should.not.exist(err);
        done();
      });
    });

  });

  // Add a modality driver
  describe('Add a new modality driver', function(){

/*    it('should add a new modality driver to the plusultra server', function( done ){
  
      client.should.be.an.instanceOf( gyes );

      modality.use( leapDriver );

      client.addModality( app_key, modality );
      
      should.not.exist(err);

      client.io.on('ACK', function(err, msg){
        should.not.exist(err);
        done();
      });
    
    });*/

    it('should send a modality signal via plusultra and trigger an interpretation event', function( done ){

      var _gestureInterpretation;
      var _fusion;
      var _fission;
      var _messaging = require( './messaging' );
      var _modality_data = {};

      _gestureInterpretation = new gyes.Interpretation( 'swipe' );
      // create a fusion module
      _fusion = new gyes.Fusion();
      // listen for some interpretations
      _fusion.fuse( _gestureInterpretation );

      // create a fission module
      _fission = new gyes.Fission();
      // listen for interpretation to happen
      
      // Mocking modality event
      _modality_data.gesture = 'swipe';
      _fusion.onSignal( _modality_data, _modality_data );
      //_messaging.emit( 'gyes::recognize', {'data':data} );
      
      _fission.on( _gestureInterpretation.getName(), function( data ){
        console.log( 'An interpretation happens: ', data );
        done();
      });
      
      gyes.emitInterpretation( _gestureInterpretation );
    });
  });


})

