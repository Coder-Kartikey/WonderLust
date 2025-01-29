import mongoose from 'mongoose';

import { Review } from './review.js';

import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
        email : {
                type : String,
                required : true,
                unique : true
        },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;