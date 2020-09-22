const router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is working',
        message: 'Hello world!'
    });
});

const moodController = require('../../controllers/mood');
const { validatePagination, validateMoodId, validateMood, validateMoodOptional } = require('../../validators/mood');

router.route('/moods')
    .get(validatePagination, moodController.list)
    .post(validateMood, moodController.new);

router.route('/moods/:moodId')
    .get(validateMoodId, moodController.view)
    .patch(validateMoodId, validateMoodOptional, moodController.update)
    .put(validateMoodId, validateMood, moodController.update)
    .delete(validateMoodId, moodController.delete);

module.exports = router;