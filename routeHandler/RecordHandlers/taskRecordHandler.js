const express = require("express")
const router = express.Router()
const MenteeSignUp = require("../../schemas/menteeSchema")
const task = require("../../schemas/taskSchema")

router.get("/", async (req, res) => {
  try {
    const tasks = await task.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.get("/:mTaskId", async (req, res) => {
  const { mTaskId } = req.params

  try {
    // Checking if the user exists
    const foundUser = await task.findOne({ mTaskId: mTaskId })
    if (!foundUser) {
      return res.status(401).json({ message: "Task not found" })
    }

    // Fetching user's DEV records
    const userAllTaskRecord = await task.find({ mTaskId: mTaskId })
    res.send(userAllTaskRecord)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred during task retrieval" })
  }
})


router.get("/mentor/:mentorId", async (req, res) => {
  const { mentorId } = req.params

  try {
    // Checking if the user exists
    const foundUser = await task.findOne({ mentorId: mentorId })
    if (!foundUser) {
      return res.status(401).json({ message: "Mentor not found" })
    }

    // Fetching user's DEV records
    const userAllTaskRecord = await task.find({ mentorId: mentorId })
    res.send(userAllTaskRecord)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "An error occurred during task retrieval" })
  }
})

// POST Task data
router.post("/", async (req, res) => {
  try {
    const taskNew = new task({
        mTaskId : req.body.mTaskId,
        mentorId: req.body.mentorId,
        date: req.body.date,
        taskTitle: req.body.taskTitle,
        taskDescription: req.body.taskDescription,
        resources: req.body.resources,
        menteeId: req.body.menteeId  || "All",
    })

    await taskNew.save()
    res.status(200).json({
      message: "Task added successfully!",
      statusCode: 200,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: "Task Add failed!",
    })
  }
})

// DELETE Task data by mTaskId
router.delete("/:mTaskId", async (req, res) => {
  const { mTaskId } = req.params;

  try {
    // Find the task in the database by mTaskId and remove it
    const deletedTask = await task.findOneAndDelete({ mTaskId: mTaskId });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while deleting the task",
    });
  }
});

module.exports = router
