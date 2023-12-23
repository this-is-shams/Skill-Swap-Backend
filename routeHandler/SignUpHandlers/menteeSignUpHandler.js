const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const router = express.Router()
const menteeSignUp = require("../../schemas/menteeSchema")
const leaderboard = require("../../schemas/leaderBoardSchema")
const mentorCollection = require("../../schemas/mentorSchema")
const mmRelation = require("../../schemas/mmRelationSchema")

// router.get("/:username", async (req, res) => {
//   try {
//     console.log("In backend",req.params.username)
//     const { username } = req.params
//     const users = await menteeSignUp.findOne({ user: username })
//     console.log("In backend U",users)
//     res.json(users)
//     if(users === null){
//       res.status(404).json({message:"User not found"})
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params
    const users = await menteeSignUp.findOne({ user: username })
    console.log("In backend U",users)
    
    if(users === null){
      return res.status(404).json({message:"User not found"})
    } else res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// Post
router.post("/", async (req, res) => {
  try {
    const { name, user, pass, cat, mentor } = req.body

    console.log(mentor)




    // Check if mentor exists

    let mentorExist = await mmRelation.findOne({ mentorUserId: mentor })
    if (!mentorExist) {
      return res.status(404).json({ message: "Mentor not found" })
    }

    // Push the user to the menteeIds array of the mentor
    mentorExist.menteeIds.push(user)

    // Save the updated mentor document
    await mentorExist.save()

    const hashedPassword = await bcrypt.hash(pass, 10)
    const newMenteeSignUp = new menteeSignUp({
      name: name,
      user: user,
      pass: hashedPassword,
      conPass: hashedPassword,
      cat: cat,
      mentor: mentor,
    })

    // Posting To Leaderboard With default Value.
    const newLeaderboard = new leaderboard({
      user,
      totalCpTime: 0,
      totalDevTime: 0,
    })

    await newLeaderboard.save()
    // Leaderboard

    await newMenteeSignUp.save()
    res.status(200).json({
      message: "Mentee Signup successful!",
      statusCode: 200,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: "Mentee Signup failed!",
    })
  }
})

// // POST signup data
// router.post("/", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.pass, 10)
//     const newMenteeSignUp = new menteeSignUp({
//       name: req.body.name,
//       user: req.body.user,
//       pass: hashedPassword,
//       conPass: hashedPassword,
//       cat: req.body.cat,
//       mentor: req.body.mentor,
//     })

//     // Posting To Leaderboard With default Value.
//     const newLeaderboard = new leaderboard({
//       user: req.body.user,
//       totalCpTime: 0,
//       totalDevTime: 0,
//     })

//     await newLeaderboard.save()
//     // Leaderboard

//     await newMenteeSignUp.save()
//     res.status(200).json({
//       message: "Mentee Signup successful!",
//       statusCode: 200,
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({
//       err: "Mentee Signup failed!",
//     })
//   }
// })
//POST all signup data
router.post("/all", async (req, res) => {})

//PUT signup data
router.put("/:id", async (req, res) => {})

//DELETE signup data
router.delete("/:id", async (req, res) => {})

module.exports = router
