const express= require('express');
const dotenv= require('dotenv');
const colors= require('colors');
const morgan= require('morgan');

require('dotenv').config();
// require('./config/database');

const app = express();

app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT ||5000;

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  
app.listen(port, function() {
    console.log(`Express app running on port ${port}`.yellow.bold);
  });
  