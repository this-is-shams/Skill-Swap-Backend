const express = require("express")
const router = express.Router()
const menteeFind = require("../../schemas/menteeSchema")

router.get("/:username", async (req, res) => {
  const { username } = req.params

  try {
    // Checking if the user exists
    const foundUser = await menteeFind.findOne({ user: username })
    if (!foundUser) {
      return res.status(401).json({ message: "User not found" })
    } else res.send(foundUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred during user retrieval" })
  }
})

router.put("/:username", async (req, res) => {
  const { username } = req.params
  const {
    name,
    institution,
    semester,
    contactNo,
    email,
    githubProfile,
    stopstalkProfile,
    linkedinProfile,
  } = req.body

  try {
    // Update the user profile
    const updatedUser = await menteeFind.findOneAndUpdate(
      { user: username },
      {
        name,
        institution,
        semester,
        contactNo,
        email,
        githubProfile,
        stopstalkProfile,
        linkedinProfile,
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(401).json({ message: "User not found" })
    }

    res.json(updatedUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred during profile update" })
  }
})

module.exports = router
