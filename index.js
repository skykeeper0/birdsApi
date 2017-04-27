const path = require('path');
const bodyParser = require('body-parser');
const conf = require('./shared/config')();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`API server listening on port ${port}...`)
})

