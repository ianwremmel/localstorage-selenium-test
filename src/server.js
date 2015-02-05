'use strict';

/* eslint no-console: [0] */

var http = require('http');

var express = require('express');
var compression = require('compression');

var app = express();

// -------------------
app.use(compression());

// Enable static routes
// --------------------
app.use(express.static('web'));

// Configure server to support pushState routes.
// --------------------------------------------------------

app.get(/\/.*/, function(req, res) {
  res.sendFile('index.html', {
    root: 'src'
  });
});

// Start the server
// ----------------

var port = app.get('port') || process.env.PORT || 3000;
http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});
