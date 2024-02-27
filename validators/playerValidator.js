const {check, validationResult} = require('express-validator');

const validateCreatePlayer = [
    check('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Cant be empty!')
      .escape(),
  check('jersey')
      .trim()
      .isNumeric()
      .withMessage('Should be a number')
      .isLength({min: 1})
      .withMessage('Name can not be empty!')
      .escape(),
  check('position')
      .trim()
      .matches(/Goalie|Defence|Forward/)
      .withMessage('Select option!'),
  check('team')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Cant be empty!')
      .escape(),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

module.exports = {
    validateCreatePlayer
}