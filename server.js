const express = require('express');
const { dirname } = require('path');

const path = require('path');

const apiroutes = require('./routes/apiroutes')
const htmlroutes = require('./routes/htmlroutes')

const dirpath = __dirname;


// const logger = require('./middleware/logger');
const app =express();

const PORT = process.env.PORT || 5001;

app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));
app.use('/api',apiroutes);
app.use('/',htmlroutes);

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));