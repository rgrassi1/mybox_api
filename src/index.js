require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const routes = require('./routes')({ io });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

const port = process.env.APP_PORT;
const mongooseURL = process.env.MONGO_URL;

mongoose.connect(mongooseURL, { useNewUrlParser: true })
    .then(() => {
        console.log('[X] database runing')    
        server.listen(port, () => {
            console.log(`[X] server runing in port: ${port}`)            
        })
    }).catch((e) => {
        console.log(JSON.stringify(e))
    })