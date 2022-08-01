const router = require("express").Router();
const authController = require("../controllers/authController")
router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
// router.get('/logout', authController.logout)

module.exports = router