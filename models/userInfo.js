const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")

const userInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Say your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Enter your email ."],
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, "Enter your phone number."],
        validate: [validator.isMobilePhone, "Please provide a valid phone number."]
    },
    twitter: {
        type: String,
        required: [true, "Enter your twitter account link."],
        validate: [validator.isURL, "Please provide your twitter account link. "]
    },
    instagram: {
        type: String,
        required: [true, "Enter your instagram account link."],
        validate: [validator.isURL, "Please provide your instagram account link. "]
    },
    password: {
        type: String,
        required: [true, "put your password"],
        minlength: 8
    },
    title: {
        type: String,
        required: [true, "Please tell us your position"]
    },
    available: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        required: [true, "Please send us your avatar's link."]
    }
}, {
    timestamps: true
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

userInfoSchema.pre('save', async function (next) {
    let user = this
    //  Only run this function if password was actually modified-
    if (!user.isModified('password')) {
        return next();
    }
    // Hash the password with cost of 12 
    this.password = await bcrypt.hash(this.password, 12);

    next()
})
userInfoSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const UserInfo = mongoose.model("UserInfo", userInfoSchema)

module.exports = UserInfo;