import mongoose from "mongoose";

const applicationSchmea = new mongoose.Schema({
    jobs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicants:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
},{timestamps:true});

export const Application = mongoose.model('Application', applicationSchmea);