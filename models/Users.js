import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Email is already taken'],
        
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