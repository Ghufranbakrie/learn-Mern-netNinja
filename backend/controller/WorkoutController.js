const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

// get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout found' })
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        res.status(404).json({ message: `Workout with id ${id} not found` });
    }

    res.status(200).json(workout);
}


// create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;


    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (emptyFields.length > 0 ){
        return res.status(400).json({ error: `Please provide ${emptyFields.join(', ')} for the workout` });
    }

    // add doc to db
    try {
        // Create a new workout document with an object that matches the schema
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout found' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
        res.status(404).json({ message: `Workout with id ${id} not found` });
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout found' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout found' })
    }

    res.status(200).json({ message: 'Workout updated' })
}



module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}