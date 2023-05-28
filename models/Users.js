import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    workout: String,
    number: Number
});

const planSchema =  new mongoose.Schema({
    dates:{
        start: Date,
        current: Date
    },
    data:{
        today: [{type:workoutSchema, default: undefined}],
        sum: [{type:workoutSchema, default: undefined}]
    }

});

const userSchema = new mongoose.Schema({
    plans : [{name: String, plan:planSchema}]
});

export default mongoose.model('Users', userSchema);
