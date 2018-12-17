var express = require('express');
var router = express.Router();

// Require controller modules.
var googleuser_controller = require('../controllers/googleuserController');


//GOOGLEUSER ROUTERS
// GET catalog home page.
//router.get('/', googleuser_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/create', googleuser_controller.googleuser_create_get);

// POST request for creating Book.
router.post('/create', googleuser_controller.googleuser_create_post);

/*
// GET request to delete Book.
router.get('/googleuser/:id/delete', googleuser_controller.googleuser_delete_get);

// POST request to delete Book.
router.post('/googleuser/:id/delete', googleuser_controller.googleuser_delete_post);

// GET request to update Book.
router.get('/googleuser/:id/update', googleuser_controller.googleuser_update_get);

// POST request to update Book.
router.post('/googleuser/:id/update', googleuser_controller.googleuser_update_post);

// GET request for one Book.
router.get('/googleuser/:id', googleuser_controller.googleuser_detail);

// GET request for list of all Book items.
router.get('/googleusers', googleuser_controller.googleuser_list);
*/


module.exports = router;
