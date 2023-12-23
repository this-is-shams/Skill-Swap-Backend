const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    conPass: {
        type: String,
        required: true,
    },
    cat: {
        type: String,
        required: true,
    },
    mentor: {
        type: String,
        required: true,
    }
});

const SignUp = mongoose.model('SignUp', signupSchema);

module.exports = SignUp;