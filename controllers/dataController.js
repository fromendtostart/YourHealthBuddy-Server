import UserData from "../models/UserData.js";
import Users from "../models/Users.js";
import asyncHandler from "express-async-handler"

// all async functions
//choosing specific user by id and getting id and "user" from protect middleware

const fetchPlans = asyncHandler (async (req, res) => {
    if(!req.user)
    {
        res.sendStatus(401)
        throw new Error("User not found")
    }
    const plans = await UserData.find({user: req.user.id})
    console.log(JSON.stringify(plans));
    res.status(200).json(plans)
})

const getData = asyncHandler (async (req, res) => {
    if(!req.user)
    {
        res.sendStatus(401)
        throw new Error("User not found")
    }
    const plan = await UserData.find({user: req.user.id, "plans.name" : req.body.plan})
    console.log(plan);
    res.status(200).json(plan)
})

const updateData = asyncHandler (async (req, res) => {
    if(!req.user){
        res.sendStatus(401)
        throw new Error("User not found")
    }
    const data = await UserData.find({user: req.user.id})
    if(!data){
        res.sendStatus(400)
        throw new Error("Data not found")
    }
    let updatedPlan = await UserData.findOneAndUpdate({user : req.user.id, "plans.name" : req.body.plan.name}, {$set: {"plans.$.plan": req.body.plan.plan}}, {"new":true})
    // updatedPlan.calcSum(req.body.plan.name)
    // updatedPlan = await updatedPlan.save();
    //handled sum at frontend
    res.status(200).json(updatedPlan)
    
})

const addData = asyncHandler (async (req, res) => {
    //do more checks
    if(!req.body.plan){
        res.status(400)
    }
    const result = await UserData.findOne({user : req.user.id})
    if(!result)
    {
        const plan = await UserData.create({
            plans: req.body.plan,
            user: req.user.id
        });
        res.status(200).json(plan);
    }
    else
    {
        const updatedPlan = await UserData.findOneAndUpdate({user : req.user.id}, {$push: {plans : req.body.plan}}, {"new":true})
        res.status(200).json(updatedPlan)
    }

    
})

const addPlan = asyncHandler (async (req, res) => {
    //do more checks
    if(!req.body.plan){
        res.status(400)
    }
    //using find and save as mongoose pre hooks aren't availible for findoneandupdate as they are queries queries
    // const planToBeUpdated = await UserData.findById(req.user.id)
    // planToBeUpdated.plans.push(req.body.plan.plan)
    // planToBeUpdated.save()
    const updatedPlan = await UserData.findOneAndUpdate({user : req.user.id}, {$push: {plans : req.body.plan}}, {"new":true})
    res.status(200).json(updatedPlan)
})

const fetchInsights = asyncHandler(async(req, res) => {
    if(!req.user)
    {
        res.sendStatus(401)
        throw new Error("User not found")
    }
    const plans = await UserData.find({user: req.user.id})
    let bestWorkout = "";
    let worstWorkout = "";
    let min = 1000;
    let max = -1;
    const workingOn = plans[0].plans[plans.length-1].plan.data.today;
    for(let item of workingOn){
        if(item.number>max){
            max=item.number;
            bestWorkout=item.workout;
        }
        if(item.number<min){
            min=item.number;
            worstWorkout=item.workout;
        }
        console.log(JSON.stringify(item));
    }
    res.status(200).json([bestWorkout, worstWorkout]);
})

export {getData, updateData, addData, addPlan, fetchPlans, fetchInsights}