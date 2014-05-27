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