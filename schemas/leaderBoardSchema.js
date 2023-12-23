const mongoose = require("mongoose")

const leaderBoardSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  totalCpTime: {
    type: Number,
    default: 0,
    required: true,
  },
  totalDevTime: {
    type: Number,
    default: 0,
    required: true,
  },
})

const leaderboardRecord = mongoose.model("leaderboardRecord", leaderBoardSchema)

module.exports = leaderboardRecord
