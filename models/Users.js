import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validator: v => v.includes("@") === 1
        //don't use findandsave as validator won't run, use User.find().save()
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    }
},
{
    timestamps: true
})

export default mongoose.model("User", userSchema);