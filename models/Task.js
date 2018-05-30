const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName:{
        type:String,
        required:true
    },
    deadline: Date,
    description:{
        type: String,
        required:[true, 'Please provide Description']
    },
    assignee: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            // required:[true, 'Who will perforn the task?']
        }
    ],
    cluster: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cluster'
        }
    ],
    taskValue: {
        type: Number,
        // required: true
    },
    completed: Boolean,
    evidences: [String],
    recurrent: Boolean,
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Task', taskSchema)