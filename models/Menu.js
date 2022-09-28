const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
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