const express = require('express');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.join('files');
    socket.on('file', file => {
        io.to('files').emit('file', file)
    })
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(routes);

const port = 3333;

mongoose.connect('mongodb+srv://rodrigo:root@cluster0-cql4v.mongodb.net/mybox?retryWrites=true', {
    useNewUrlParser: true
}).then(() => {
    console.log('[X] database runing')    
    server.listen(port, () => {
        console.log(`[X] server runing in port: ${port}`)            
    })
}).catch((e) => {
    console.log(JSON.stringify(e))
})