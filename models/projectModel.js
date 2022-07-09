const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Enter the project Name"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Tell us more about this project."]
    },

},
    {
        timestamps: true
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const Project = mongoose.model("Project", projectSchema)

module.exports = Project;