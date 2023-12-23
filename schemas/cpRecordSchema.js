const mongoose = require("mongoose")

const cpRecordSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  serial: {
    type: Number,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    default: "No Remarks YET",
    required: false,
  },
})

const cpRecord = mongoose.model("cpRecord", cpRecordSchema)

module.exports = cpRecord
