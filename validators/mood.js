const { body, param, query, validationResult } = require('express-validator');

const genericError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  next();
};

exports.validatePagination = [
  query("skip").isInt({ min: 0, max: 50 }).optional(),
  query("limit").isInt({ min: 0, max: 50 }).optional(),
  genericError
];

exports.validateMoodId = [
  param("moodId").exists().bail().isMongoId(),
  genericError
];

exports.validateMood = [
  body("timestamp").optional({ checkFalsy: true }).isString().isISO8601(),
  body("feeling").exists().bail().isString().trim().isLength({ min: 1, max: 64 }).escape(),
  body("message").optional().isString().trim().isLength({ max: 128 }).escape(),
  genericError
];

exports.validateMoodOptional = [
  body("timestamp").optional().isISO8601().trim(),
  body("feeling").optional().isString().trim().isLength({ min: 1, max: 64 }).escape(),
  body("message").optional().isString().trim().isLength({ max: 128 }).escape(),
  genericError
];