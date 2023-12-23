const mongoose = require("mongoose")

const menteeSchema = mongoose.Schema({
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
  },
  institution: {
    type: String,
    default: "University Name",
  },
  semester: {
    type: String,
    default: "example: 7th",
  },
  contactNo: {
    type: String,
    default: "01212345678",
  },
  email: {
    type: String,
    default: "example@example.com",
  },
  githubProfile: {
    type: String,
    default: "https://github.com/username",
  },
  stopstalkProfile: {
    type: String,
    default: "https://ojprofile.com/username",
  },
  linkedinProfile: {
    type: String,
    default: "https://linkedin.com/in/username",
  },
})

const MenteeSignUp = mongoose.model("Mentee", menteeSchema)

module.exports = MenteeSignUp
