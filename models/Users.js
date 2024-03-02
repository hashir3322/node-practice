import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    roles: {
        type: [String],
        enum: {
            values: ['Employee', 'Manager', 'Owner'],
            message: 'Invalid Role'
        },
        default: ["Employee"]
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    toJSON: {
        transform: function (doc, ret){
            delete ret.__v;
        }
    }
})


const User = model('user', userSchema);

export default User;