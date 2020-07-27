const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
},
 { timestamps: true }
)

const Room = mongoose.model('room', RoomSchema);

module.exports = { Room };