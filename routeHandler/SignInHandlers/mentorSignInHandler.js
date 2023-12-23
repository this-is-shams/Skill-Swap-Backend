const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const MentorSignUp = require("../../schemas/mentorSchema")

// POST signin data
router.get("/:user/:pass", async (req, res) => {
  const { user, pass } = req.params

  try {
    // console.log("In handler")
    // console.log(req.body)
    // Find the user in the database
    const foundUser = await MentorSignUp.findOne({ user })

    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid Username" })
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(pass, foundUser.pass)
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid Password" })
    }

    // Check the option value
    // if (option !== 'fjs' && option !== 'sp') {
    //   return res.status(400).json({ message: 'Invalid option value. Please provide either "fjs" or "sp".' });
    // }

    // Authentication successful
    res
      .status(200)
      .json({ message: "Authentication successful!", statusCode: 200 })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "An error occurred during authentication." })
  }
})

module.exports = router
