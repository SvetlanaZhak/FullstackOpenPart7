const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator');
// mongoose.set('useFindAndModify', false);
const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true

    },
    author: {
        type: String,
        minlength: 3

    },
    url: {
        type: String,
        minlength: 3,
        required: true

    },

    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})
// blogsSchema.plugin(uniqueValidator)

blogsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogsSchema)