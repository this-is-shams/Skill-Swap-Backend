const express = require("express")
const router = express.Router()
const MenteeData = require("../../schemas/menteeSchema")
const mmRelation = require("../../schemas/mmRelationSchema")
const devRecordAll = require("../../schemas/devRecordSchema")

// GET List of Mentees
router.get("/getmentees/:mentorid", async (req, res) => {
  try {
    const { mentorid } = req.params
    const foundUser = await mmRelation.findOne({ mentorUserId: mentorid })

    // Check if mentor exists
    if (!foundUser) {
      return res.status(404).send({ message: "Mentor not found" })
    }

    const menteeIds = foundUser.menteeIds

    res.json(menteeIds)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: "An error occurred from the server side" })
  }
})

// GET MENTEE DEVELOPMENT RECORDS
router.get("/:mentorid", async (req, res) => {
  try {
    const { mentorid } = req.params
    const foundUser = await mmRelation.findOne({ mentorUserId: mentorid })
    // Check if mentor exists
    if (!foundUser) {
      return res.status(404).json({ message: "Mentor not found" })
    }

    const menteeIds = foundUser.menteeIds

    // Retrieve development records for each mentee
    const developmentRecords = []
    for (const menteeId of menteeIds) {
      const menteeData = await MenteeData.findOne({ user: menteeId })
      const devRecords = await devRecordAll.find({ user: menteeId })
      developmentRecords.push({
        menteeId,
        menteeName: menteeData.name,
        devRecords,
      })
    }

    res.status(200).json(developmentRecords)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred from server side" })
  }
})

module.exports = router
