
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const router = require('./routes/routes');
const cors = require('cors');

require('dotenv').config();
connectDB();


/**Socket IO */
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io').listen(server)

io.on("connection", function (socket) {
    console.log("A user connected");
});

global.io = io;


const PORT = process.env.PORT || 4440
// const { ADD_Discussion, discussion } = require("./middleware/socket");
// const { Discussion } = require('./models/discussion');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

// io.on('connection', (socket) => {
//     console.log("user connected")

//     socket.on('topic', async params => {
//         console.log(params)
//         const data = await ADD_Discussion(params)
//         io.emit("new_discussion", JSON.stringify(data))
//     })


//     socket.on('comment', (comment) => {
//         io.emit("new_comment", comment)
//     })
    
// })

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

module.exports = server