var fs 			= require('fs'),
    config		= require('./lib/config/express.js'),
    express 	= require('express'),
    app     	= express(),
    server  	= require('http').createServer(app),
    io 			= require('socket.io')(server);

/* Configure Express application */
require('./lib/config/express')(express, app);

/* Set Express HTTP GET routes */
require('./lib/gets')(app,fs);

/* Set Express HTTP POST routes */
require('./lib/posts')(app);

/* Set socket.io handlers */
require('./lib/io')(app,fs,io);

/* Start Express/Socket.io server */
server.listen(8086, function(){});