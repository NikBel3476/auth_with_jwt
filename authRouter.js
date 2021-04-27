const Router = require('express');
const { check } = require('express-validator');

const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');
const controller = require('./authController');
const router = new Router();

router.post('/registration', [
        check('username', "Login cannot be empty").notEmpty(),
        check('password', "Password length must be at least 4 and no more than 10 characters").isLength({ min: 4, max: 10})
    ], 
    controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);

module.exports = router;