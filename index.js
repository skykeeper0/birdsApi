'use strict';

const path = require('path');
// const bodyParser = require('body-parser');
const conf = require('./shared/config')();
// const express = require('express');
// const app = express();
const port = process.env.PORT || 8080;

// app.use(bodyParser.json());
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port,
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler (request, reply) {

        return reply('hello world');
    },
});

// Start the server
server.start((err) => {
  if (err) {
      throw err;
  }
  console.log('Server running at:', server.info.uri);
});

