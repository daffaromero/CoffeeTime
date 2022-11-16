const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Menu = require("../models/Menu");

// @desc    Get all menu items
// @route   GET /api/v1/menu
// @access  Public
exports.getAllMenu = asyncHandler(async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ["select", "sort"];

  //Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //Create query string
  let queryStr = JSON.stringify(req.query);

  //Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$S{match}`
  );

  //Finding menu
  query = Menu.find(JSON.parse(queryStr));

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-price");
  }
  //     //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Menu.countDocuments();
  query = query.skip(startIndex).limit(limit);

  //     //Executing query
  const menus = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res
    .status(200)
    .json({ success: true, count: menus.length, pagination, data: menus });
});

// @desc    Get a single menu item
// @route   GET /api/v1/menu/:id
// @access  Public
exports.getMenu = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id);
  if (!menu) {
    return next(
      new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: menu });
});

// @desc    Create new menu item
// @route   POST /api/v1/menu
// @access  Private
exports.createMenu = asyncHandler(async (req, res, next) => {
  //Add user to req.body
  req.body.user = req.user.id;
  const menu = await Menu.create(req.body);
  res.status(201).json({
    success: true,
    data: menu,
  });
});

// @desc    Update a single menu item
// @route   PUT /api/v1/menu/:id
// @access  Private
exports.updateMenu = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!menu) {
    return next(
      new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: menu });
});

// @desc    Delete menu item
// @route   DELETE /api/v1/menu/:id
// @access  Private
exports.deleteMenu = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findByIdAndDelete(req.params.id);
  if (!menu) {
    return next(
      new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc    Upload photo for menu item
// @route   PUT /api/v1/menu/:id/photo
// @access  Private
exports.menuPhotoUpload = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findByIdAndDelete(req.params.id);
  if (!menu) {
    return next(
      new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));

    const file = req.files.file;

    //Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    //Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    // Create custom filename
    file.name = `photo_${menu._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));

        await Menu.findByIdAndUpdate(req.params.id, { photo: file.name });

        res.status(200).json({
          success: true,
          data: file.name,
        });
      }
    });
  }
});
