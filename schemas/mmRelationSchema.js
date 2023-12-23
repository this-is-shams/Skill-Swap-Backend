const mongoose = require("mongoose")

const mmRelationSchema = mongoose.Schema({
  mentorName: {
    type: String,
    required: true,
  },
  mentorUserId: {
    type: String,
    required: true,
  },
  taskIds: {
    type: [String],
    default: [],
    required: true,
  },
  menteeIds: {
    type: [String], // Specify that "links" is an array of strings
    // default: [], // Optional: Set a default empty array if desired
    required: true,
  },
})

const mmRelation = mongoose.model("mmRelation", mmRelationSchema)

module.exports = mmRelation
