/**
 * Test dependencies
 */

var should = require( 'should' );
var gyes = require( '../' );
var LeapDriver = require( '../../LeapModalityDriver/LeapModalityDriver' );
var Modality = gyes.Modality;

/**
 * Test locals variables
 */

//var socketURI = 'ws://0.0.0.0:26060';
var socketURI = 'ws://plusultra-dk5.rhcloud.com:8000/';
var options ={
  // transports: ['websocket'],
  'force new connection': true,
  'forceNew': true,
  //'globalInterpretations': false
};

/**
 * Tests! -or smtng like that- :P
 */

describe('connection', function(){
  /*
  it('should connect to default plusultra server', function( done ){
    var app_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjEzOTc0MjAzMDJ9.YPN191cpYko9Q_-9AtrOCwGBT6FQU---EduJTJki4zM';

    var client = new gyes( app_key, socketURI, options );

    client.should.be.an.instanceOf( gyes );

    client.io.should.have.property( 'on' );

    client.io.on('connect', function(){
      client.io.on('authenticated', function(err, res){
        console.info( 'Authenticated. ...|_|... on Plusultra!\n' );
        should.not.exist(err);
        done();
      });

      client.authenticate( app_key );
    });
  });

});

// Add a modality driver
describe('New modality driver', function(){

  it('should add a new modality driver to the plusultra server', function( done ){
    var app_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjEzOTc0MjAzMDJ9.YPN191cpYko9Q_-9AtrOCwGBT6FQU---EduJTJki4zM';

    var client = new gyes( app_key, socketURI, options );

    var modality = new Modality( 'leap', 'input', {} );

    var leapDriver = new LeapDriver();

    client.should.be.an.instanceOf( gyes );

    client.io.should.have.property( 'on' );

    modality.use( leapDriver );

    client.io.on('connect', function(){
      client.io.on('authenticated', function(err, res){
        console.info( 'Authenticated. ...|_|... on Plusultra!\n' );
        should.not.exist(err);
      });

      client.authenticate( app_key );

      client.addModality( app_key, modality );

      client.io.on('ACK', function(err, msg){
        should.not.exist(err);

        done();
      });

    });
  });

  it('should send a modality signal via plusultra', function( done ){
    var app_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjEzOTc0MjAzMDJ9.YPN191cpYko9Q_-9AtrOCwGBT6FQU---EduJTJki4zM';

    var client = new gyes( app_key, socketURI, options );

    var modality = new Modality( 'leap', 'input', {} );

    var leapDriver = new LeapDriver();

    client.should.be.an.instanceOf( gyes );

    client.io.should.have.property( 'on' );

    modality.use( leapDriver );

    client.io.on('connect', function(){
      client.io.on('authenticated', function(err, res){
        console.info( 'Authenticated. ...|_|... on Plusultra!\n' );
        should.not.exist(err);
      });

      client.authenticate( app_key );

      client.addModality( app_key, modality );

      client.io.once('ACK SIGNAL', function(err, msg){
        should.not.exist(err);
        done();
      });
    });
  });
  */

  it('should send a modality signal via plusultra and trigger an interpretation event', function( done ){
    var app_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjEzOTc0MjAzMDJ9.YPN191cpYko9Q_-9AtrOCwGBT6FQU---EduJTJki4zM';

    var client = new gyes( app_key, socketURI, options );

    var modality = new Modality( 'leap', 'input', {} );

    var leapDriver = new LeapDriver();

    var _gestureInterpretation;
    var _fusion;
    var _fission;

    client.should.be.an.instanceOf( gyes );

    client.io.should.have.property( 'on' );

    modality.use( leapDriver );

    client.io.on('connect', function(){
      client.io.on('authenticated', function(err, res){
        console.info( 'Authenticated. ...|_|... on Plusultra!\n' );
        should.not.exist(err);
      });

      client.authenticate( app_key );

      client.addModality( app_key, modality );

      client.io.on('ACK SIGNAL', function(err, msg){
        should.not.exist(err);
      });
    });

    _gestureInterpretation = new gyes.Interpretation( 'swipe' );
    // create a fusion module
    _fusion = new gyes.Fusion();
    // listen for some events
    _fusion.fuse( _gestureInterpretation );
    // create a fission module
    _fission = new gyes.Fission();
    // listen for interpretation to happen
    _fission.on( _gestureInterpretation.getName(), function( data ){
      console.log( 'An interpretation happens: ', data );
      done();
    });
  });
});
