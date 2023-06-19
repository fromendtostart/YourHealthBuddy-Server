import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    workout: String,
    number: Number
});

const planSchema =  new mongoose.Schema({
    dates:{
        start: {
            type : Date,
            immutable : true,
            default: () => Date.now()
        },
        current: Date
    },
    data:{
        today: [workoutSchema],
        sum: [workoutSchema]
    }

});

const userDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    plans : [{name: String, plan:planSchema}]
});

userDataSchema.methods.calcSum = function(planName){
    console.log(this)
    for(let plan = 0; plan < this.plans.length; plan++){
        if(this.plans[plan].name===planName){
            for(let it = 0; it<this.plans[plan].plan.data.sum.length; it++){
                console.log(this.plans[plan].plan.data.sum[it].number)
                this.plans[plan].plan.data.sum[it].number =this.plans[plan].plan.data.sum[it].number+ this.plans[plan].plan.data.today[it].number
            }
        }
    }
}

export default mongoose.model('UserData', userDataSchema);
