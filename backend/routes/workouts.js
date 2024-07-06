const express = require('express');
const router = express.Router();
const {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controller/WorkoutController')


// GET all worksouts
router.get('/', getAllWorkouts);

// GET a sigle workout
router.get('/:id', getWorkout);

// POST a workout
router.post('/', createWorkout);

// delete a workout
router.delete('/:id', deleteWorkout);

// update a workout
router.patch('/:id', updateWorkout);

module.exports = router;