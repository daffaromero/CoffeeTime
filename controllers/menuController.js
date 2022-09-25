
// @desc    Get all menu items
// @route   GET /api/v1/menu
// @access  Public
exports.getAllMenu = (req, res, next) => {
    res
        .status(200)
        .json({success: true, msg: 'Show all menu items'});
}

// @desc    Get a single menu item
// @route   GET /api/v1/menu/:id
// @access  Public
exports.getMenu = (req, res, next) => {
    res
        .status(200)
        .json({success: true, msg: `Show menu with ID ${req.params.id}`});
}

// @desc    Create new menu item
// @route   POST /api/v1/menu
// @access  Private
exports.createMenu = (req, res, next) => {
    res
        .status(200)
        .json({success: true, msg: 'Create new menu item'});
}

// @desc    Update a single menu item
// @route   PUT /api/v1/menu/:id
// @access  Private
exports.updateMenu = (req, res, next) => {
    res
        .status(200)
        .json({success: true, msg: `Update menu item with ID ${req.params.id}`});
}

// @desc    Delete menu item
// @route   DELETE /api/v1/menu/:id
// @access  Private
exports.deleteMenu = (req, res, next) => {
    res
        .status(200)
        .json({success: true, msg: `Delete menu item ${req.params.id}`})    
}

