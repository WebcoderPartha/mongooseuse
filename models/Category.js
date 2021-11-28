const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category_name: {
        type: String,
        minlength:3,
        trim: true,
        require: true
    }
})

module.exports = mongoose.model('categories', categorySchema);