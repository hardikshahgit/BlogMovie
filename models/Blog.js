const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },  
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Blog = mongoose.model('blog', BlogSchema);  