const express = require("express")
const router = express.Router()
const leaderboard = require("../../schemas/leaderBoardSchema")
const menteeFind = require("../../schemas/menteeSchema")

// GET DEVELOPMENT LEADERBOARD
router.get("/devleaderboard", async (req, res) => {
  try {
    const allLeaderboardRecords = await leaderboard.find().sort({
      totalDevTime: -1,
    }) // -1 refers descending order..

    const leaderboardWithNames = await Promise.all(
      allLeaderboardRecords.map(async (record) => {
        const mentee = await menteeFind.findOne({ user: record.user })
        const name = mentee ? mentee.name : ""
        return { name, user: mentee.user, totalDevTime: record.totalDevTime }
      })
    )
    res.status(200).json(leaderboardWithNames)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred from server side" })
  }
})
// GET Problem Solving LEADERBOARD
router.get("/cpleaderboard", async (req, res) => {
  try {
    const allLeaderboardRecords = await leaderboard.find().sort({
      totalCpTime: -1,
    }) // -1 refers descending order..
    const leaderboardWithNames = await Promise.all(
      allLeaderboardRecords.map(async (record) => {
        const mentee = await menteeFind.findOne({ user: record.user })
        const name = mentee ? mentee.name : ""
        return { name, user: mentee.user, totalCpTime: record.totalCpTime }
      })
    )
    res.status(200).json(leaderboardWithNames)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred from server side" })
  }
})

module.exports = router