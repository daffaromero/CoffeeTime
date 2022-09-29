const Menu = require('../models/Menu');

// @desc    Get all menu items
// @route   GET /api/v1/menu
// @access  Public
exports.getAllMenu = async (req, res, next) => {
    try {
        const menus = await Menu.find()
        res
            .status(200)
            .json({success: true, count: menus.length, data: menus});
    } catch (err) {
        res
        .status(400)
        .json({success: false});
    }
}

// @desc    Get a single menu item
// @route   GET /api/v1/menu/:id
// @access  Public
exports.getMenu = async (req, res, next) => {
    try {
        const menu = await Menu.findById(req.params.id)
        if(!menu){
            return res.status(400).json({ success: false })
        }
        res
            .status(200)
            .json({success: true, data: menu});
    } catch (err) {
        res
        .status(400)
        .json({success: false});
    }
}

// @desc    Create new menu item
// @route   POST /api/v1/menu
// @access  Private
exports.createMenu = async(req, res, next) => {
    try {
        const menu = await Menu.create(req.body);
        res
            .status(201)
            .json({
                success: true,
                data: menu
            });
    } catch (err) {
       res.status(400).json({success : false}) 
    }  
}

// @desc    Update a single menu item
// @route   PUT /api/v1/menu/:id
// @access  Private
exports.updateMenu = async (req, res, next) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!menu){
            return res.status(400).json({ success: false })
        }
        res
        .status(200)
        .json({success: true, data: menu});
    } catch (err) {
        res.status(400).json({ success: false })
    }
}

// @desc    Delete menu item
// @route   DELETE /api/v1/menu/:id
// @access  Private
exports.deleteMenu = async (req, res, next) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id)
        if(!menu){
            return res.status(400).json({ success: false })
        }
        res
        .status(200)
        .json({success: true, data: {}});
    } catch (err) {
        res.status(400).json({ success: false })
    }  
}

