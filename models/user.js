const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    matric: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["basic", "admin"]
    },
    resetToken: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    maxUnit: {
        type: Number,
        default: 24
    },
    minUnit: {
        type: Number,
        default: 16
    },
    selectedUnit: {
        type: Number,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
},
 { timestamps: true } 
)

const NotificationSchema = new Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    details: {
        type: String
    }
})

UserSchema.plugin(aggregatePaginate);
UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', async function save(next) {
    //if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
}

const User = mongoose.model('User', UserSchema);
const Notifications = mongoose.model('Notification', NotificationSchema);

module.exports =  User, Notifications