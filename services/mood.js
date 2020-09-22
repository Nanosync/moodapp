const Mood = require('../models/mood');
const mongoose = require('mongoose');

const PAGE_SIZE = 25;

const getMoods = async function(skip, limit) {
    const skipVal = Number(skip) || 0;
    const limitVal = Number(limit) || PAGE_SIZE;

    return Mood.find({})
            .limit(limitVal)
            .skip(skipVal)
            .exec()
            .then((moods) => { return moods; })
            .catch((err) => {
                console.log(err.text);
                throw err;
            });
};

const getMood = async function(moodDTO) {
    const { id } = moodDTO;
    
    return Mood.findOne({ _id: id})
        .then((mood) => { return mood; })
        .catch(err => {
            console.log(err.text);
            throw err;
        });
};

const createMood = async function(moodDTO) {
    const { timestamp, feeling, message } = moodDTO;

    let mood = new Mood();
    mood.timestamp = timestamp ? timestamp : Date.now();
    mood.feeling = feeling;
    mood.message = message;
    
    return mood.save()
        .then(mood => { return mood; })
        .catch(err => {
            console.log(err.text);
            throw err;
        });
};

const updateMood = async function(moodDTO) {
    const { id, timestamp, feeling, message } = moodDTO;
    
    let params = {};
    if (timestamp) {
        params = { ...params, timestamp };
    }
    if (feeling) {
        params = { ...params, feeling };
    }
    if (message) {
        params = { ...params, message };
    }

    return Mood.findOneAndUpdate({ _id: id }, params, { new: true })
        .then(mood => {
            return mood;
        })
        .catch(err => {
            console.log(err.text);
            throw err;
        });
};

const deleteMood = async function(moodDTO) {
    const { id } = moodDTO;

    moodItem = getMood(moodDTO);

    return Mood.deleteOne({ _id: id })
        .then(mood => {
            if (!mood || mood && mood.deletedCount === 0) {
                throw new Error("Mood does not exist");
            }
            return moodItem;
        })
        .catch(err => {
            console.log(err.text);
            throw err;
        });
}


module.exports = {
    getMoods,
    getMood,
    createMood,
    updateMood,
    deleteMood
};
