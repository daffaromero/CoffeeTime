const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Menu = require('../models/Menu');

// @desc    Get all menu items
// @route   GET /api/v1/menu
// @access  Public
exports.getAllMenu = asyncHandler(async (req, res, next) => {
        const menus = await Menu.find();
        res
            .status(200)
            .json({success: true, count: menus.length, data: menus});
});

// @desc    Get a single menu item
// @route   GET /api/v1/menu/:id
// @access  Public
exports.getMenu = asyncHandler(async (req, res, next) => {
        const menu = await Menu.findById(req.params.id);
        if(!menu){
            return next(new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404));
        }
        res
            .status(200)
            .json({success: true, data: menu});
});

// @desc    Create new menu item
// @route   POST /api/v1/menu
// @access  Private
exports.createMenu = asyncHandler(async (req, res, next) => {
        const menu = await Menu.create(req.body);
        res
            .status(201)
            .json({
                success: true,
                data: menu
            });
});

// @desc    Update a single menu item
// @route   PUT /api/v1/menu/:id
// @access  Private
exports.updateMenu = asyncHandler(async (req, res, next) => {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!menu){
            return next(new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404));
        }
        res
        .status(200)
        .json({success: true, data: menu});
});

// @desc    Delete menu item
// @route   DELETE /api/v1/menu/:id
// @access  Private
exports.deleteMenu = asyncHandler(async (req, res, next) => {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if(!menu){
            return next(new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404));
        }
        res
        .status(200)
        .json({success: true, data: {}});
});