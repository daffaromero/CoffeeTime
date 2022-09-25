const express = require('express');
const {
    getAllMenu,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu
} = require('../controllers/menuController')

const router  = express.Router();
router
    .route('/')
    .get(getAllMenu)
    .post(createMenu);

router
    .route('/:id')
    .get(getMenu)
    .put(updateMenu)
    .delete(deleteMenu);

module.exports = router;