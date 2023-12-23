const mongoose = require("mongoose")

const mentorSchema = mongoose.Schema({
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

})

const MentorSignUp = mongoose.model("Mentor", mentorSchema)

module.exports = MentorSignUp
