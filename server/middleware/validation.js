const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors.array()
    });
  }
  next();
};

const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

const validateProjectCreation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Project name is required'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('templateId')
    .optional()
    .isUUID()
    .withMessage('Invalid template ID'),
  handleValidationErrors
];

const validateAIPrompt = [
  body('prompt')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Prompt must be between 10 and 1000 characters'),
  body('projectType')
    .optional()
    .isIn(['website', 'webapp', 'landing', 'ecommerce', 'blog', 'portfolio'])
    .withMessage('Invalid project type'),
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateProjectCreation,
  validateAIPrompt,
  handleValidationErrors
};