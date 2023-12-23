const express = require("express")
const router = express.Router()
const cpRecord = require("../../schemas/cpRecordSchema")
const MenteeSignUp = require("../../schemas/menteeSchema")
const leaderboard = require("../../schemas/leaderBoardSchema")

// GET USER CP RECORDS
router.get("/:username", async (req, res) => {
  const { username } = req.params

  try {
    // Checking if the user exists
    const foundUser = await MenteeSignUp.findOne({ user: username })
    if (!foundUser) {
      return res.status(401).json({ message: "User not found" })
    }

    // Fetching user's CP records
    const userAllCpRecord = await cpRecord.find({ user: username })
    res.json(userAllCpRecord)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred during user retrieval" })
  }
})

// POST CP data
router.post("/", async (req, res) => {
  try {
    const devRecordInsert = new cpRecord({
      user: req.body.user,
      serial: req.body.serial,
      link: req.body.link,
      status: req.body.status,
      time: req.body.time,
      date: req.body.date,
      remarks: req.body.remarks,
    })
    const leaderboardUser = await leaderboard.findOne({ user: req.body.user }) // To match username with DB
    leaderboardUser.totalCpTime =
      (leaderboardUser.totalCpTime || 0) + req.body.time

    await devRecordInsert.save()
    await leaderboardUser.save()
    res.status(200).json({
      message: "CP Record Inserted successfully!",
      statusCode: 200,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: "CP Record Insertion failed!",
    })
  }
})

// GET USER CP RECORDS
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params

    try {
      // Checking if the user exists
      const foundUser = await MenteeSignUp.findOne({ user: username }) // To match username with DB
      console.log(foundUser)
      console.log(username)
      if (!foundUser) {
        return res.status(401).json({ message: "User Not found!" })
      }

      // Fetching user's CP records
      const userAllCpRecord = await cpRecord.find({ user: username })

      if (userAllCpRecord.length === 0) {
        return res.status(401).json({ message: "No Records to show!" })
      } else {
        res.send(userAllCpRecord)
      }
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ message: "An error occurred during user retrival" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred from server side" })
  }
})


// DELETE CP Record by User ID and Serial Number
router.delete("/:userId/:serialNo", async (req, res) => {
  const { userId, serialNo } = req.params

  try {
    // Find the CP record in the database by user ID and serial number and remove it
    const deletedRecord = await cpRecord.findOneAndDelete({
      user: userId,
      serial: serialNo,
    })

    if (!deletedRecord) {
      return res.status(404).json({ message: "CP Record not found" })
    }

    // Find the associated leaderboard record and update the totalCpTime
    const leaderboardUser = await leaderboard.findOne({
      user: deletedRecord.user,
    })
    if (leaderboardUser) {
      leaderboardUser.totalCpTime -= deletedRecord.time
      await leaderboardUser.save()
    }

    // Update the serial numbers of the remaining CP records for the same user
    const remainingRecords = await cpRecord
      .find({ user: userId })
      .sort({ serial: 1 })
    for (let i = 0; i < remainingRecords.length; i++) {
      const record = remainingRecords[i]
      if (record.serial > serialNo) {
        record.serial = record.serial - 1
        await record.save()
      }
    }

    res.status(200).json({ message: "CP Record deleted successfully" })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "An error occurred while deleting the CP Record" })
  }
})

module.exports = router
