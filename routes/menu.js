const express = require('express');
const { protect } = require('../middleware/auth');

const {
    getAllMenu,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
    menuPhotoUpload

} = require('../controllers/menuController')

const router  = express.Router();
router
    .route('/')
    .get(getAllMenu)
    .post(protect, createMenu);

router
    .route('/:id')
    .get(getMenu)
    .put(protect, updateMenu)
    .delete(protect, deleteMenu);

module.exports = router;

router.route('/:id/photo').put(menuPhotoUpload);