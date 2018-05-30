const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const clusterSchema = new Schema({
    clusterName:String,
    clusterPic:String,
    clusterDescription:String,
    members:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    tasks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    ClusterScore: Number
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Cluster', clusterSchema)