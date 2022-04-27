var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");
const indexController = require("../controllers/indexController");



/// ------------------------------ HOMEPAGE ------------------------------ ///
router.get('/', indexController.index);
router.post('/',indexController.create_message);

/// ------------------------------ SIGNUP ------------------------------ ///
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);


// /// ------------------------------ LOGIN/LOGOUT ------------------------------ ///
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);


// /// ------------------------------ CREATE A MESSAGE ------------------------------ ///
// router.get("/create-message", message_controller.create_message_get);
// router.post("/create-message", message_controller.create_message_post);


module.exports = router;