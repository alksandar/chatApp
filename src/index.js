const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + './../public'));

app.get('/', (req, res) => {
    res.render('index');
});

server = app.listen(3000, () => {
    console.log('Server up and running on port: 3000');
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('New user connected.');

    // default username
    socket.username = 'Anonymus'

    // listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    // listen on new_message
    socket.on('new_message', (data) => {
        console.log('here');
        console.log(data);
        //broadcast the new message
        io.sockets.emit('new_message', {message: data.message, username: socket.username});
    });
});