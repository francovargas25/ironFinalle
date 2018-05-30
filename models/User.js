const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: String,
    profilePic:String,
    username: String,
    nickName: String,
    clusters: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cluster'
        }
    ],
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    score: Number
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = mongoose.model('User', userSchema)