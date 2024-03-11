import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already taken'],
        
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, "Password should be at least 8 characters"],
        select: false
    },
    role: {
        type: String,
        enum: {
            values: ['Employee', 'Manager', 'Owner'],
            message: 'Invalid Role'
        },
        default: 'Employee'
    },
    // active: {
    //     type: Boolean,
    //     default: true,
    //     select: false,
    // }
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPasswords = async function(enteredPassword, userPassword){
    return await bcrypt.compare(enteredPassword, userPassword);
}

const User = model('User', userSchema);

export default User;