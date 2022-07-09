const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Enter a good title."]
    },
    body: {
        type: String,
        trim: true,
        required: [true, "Tell us what do you want to say."]
    },
    url: {
        type: String,
        trim: true,
        required: [true, "Send us blog's URL."]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)
const Post = mongoose.model('Post', postSchema)

module.exports = Post