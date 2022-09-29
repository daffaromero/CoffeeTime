const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please add a name'],
        unique: true
    },
    slug: String,
    description:{
        type: String,
    },
    image:{
        type: String,
        default: 'no-image.jpg'
    },
    price:{
        type: Number,
        require: true,
    },
    available:{
        type: Boolean,
        require: true,
        default: true
    }
});

module.exports = mongoose.model('Menu', MenuSchema);