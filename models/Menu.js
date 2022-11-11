const mongoose = require('mongoose');
const slugify = require('slugify');

const MenuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    slug: String,
    description:{
        type: String,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    image:{
        type: String,
        default: 'no-image.jpg'
    },
    price:{
        type: Number,
        required: [true, 'Please add a price']
    },
    available:{
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    }
});

// Create menu slug from the name

MenuSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

module.exports = mongoose.model('Menu', MenuSchema);