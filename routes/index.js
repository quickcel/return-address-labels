var express = require('express');
var router = express.Router();



var returnAddressLabel_controller = require('../controllers/returnAddressLabelController');
/// returnAddressLabel ROUTES ///
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index');
});*/

router.get('/', returnAddressLabel_controller.index);  

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
//router.get('/returnaddresslabel/create', returnAddressLabel_controller.returnAddressLabels_create_get);

// POST request for creating Author.
router.post('/', returnAddressLabel_controller.returnAddressLabels_create_post);
/*

// GET request to delete Author.
router.get('/author/:id/delete', returnAddressLabel_controller.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', returnAddressLabel_controller.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', returnAddressLabel_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', returnAddressLabel_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', returnAddressLabel_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', returnAddressLabel_controller.author_list);

*/
module.exports = router;
