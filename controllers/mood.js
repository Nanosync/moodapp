const Mood = require('../models/mood');
const { getMoods, createMood, getMood, updateMood, deleteMood } = require('../services/mood');

// List all moods
exports.list = async function (req, res) {
    const { skip, limit } = req.query;

    console.log(skip, limit);

    await getMoods(skip, limit)
        .then(mood => { res.json(mood); })
        .catch(err => {
            console.log(err.text);
            res.status(500).json({
                message: "Mood not found"
            });
        });
};

// New mood
exports.new = async function (req, res) {
    const { timestamp, feeling, message } = req.body;
    
    await createMood({ timestamp, feeling, message })
        .then(mood => { res.json(mood); })
        .catch(err => {
            console.log(err.text);
            res.status(500).json({
                message: "Error creating mood"
            });
        });
};

// View mood
exports.view = async function (req, res) {
    const { moodId: id } = req.params;
    
    await getMood({ id })
        .then(mood => {
            if (!mood) {
                res.status(404).json({
                    message: "Mood entry does not exist"
                });
                return;
            }

            res.json(mood);
        })
        .catch(err => {
            console.log(err.text);
            res.status(500).json({
                message: "Error getting mood"
            });
        });
};

// Update mood
exports.update = async function (req, res) {
    const { moodId: id } = req.params;
    const { timestamp, feeling, message } = req.body;

    await updateMood({ id, timestamp, feeling, message })
        .then(mood => { res.json(mood); })
        .catch(err => {
            console.log(err.text);
            res.status(500).json({
                message: "Error updating mood"
            });
        });
};

// Delete mood
exports.delete = async function (req, res) {
    const { moodId: id } = req.params;

    await deleteMood({ id })
        .then(mood => { res.json(mood); })
        .catch(err => {
            console.log(err.text);
            res.status(500).json({
                message: "Error deleting mood"
            });
        });
};