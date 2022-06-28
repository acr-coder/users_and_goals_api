const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc        Get goals
// @route       GET /api/goals
// access       public  

const getGoals = asyncHandler( async (req,res) =>{
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// @desc        Set goals
// @route       POST /api/goals
// access       private  
const setGoal = asyncHandler( async (req,res) =>{
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const goal = await Goal.create({
        user:req.user.id,
        text: req.body.text
    })

    res.status(200).json(goal)
})

// @desc        Update goals
// @route       PUT /api/goals/:id
// access       private  
const updateGoal = asyncHandler( async (req,res) =>{
    const { id } = req.params
    const goal = await Goal.findById(id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id ){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true } )

    res.status(200).json(updatedGoal)
})

// @desc        Delete goals
// @route       DELETE /api/goals/:id
// access       public  
const deleteGoal = asyncHandler( async (req,res) =>{
    const { id } = req.params
    const goal = await Goal.findById(id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id ){
        res.status(401)
        throw new Error('User not authorized')
    }

    const deletedGoal = await Goal.findByIdAndDelete(id)

    res.status(200).json(deletedGoal)
})

module.exports = {
    getGoals, setGoal, updateGoal,deleteGoal
}