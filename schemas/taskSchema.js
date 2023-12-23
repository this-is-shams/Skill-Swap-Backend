const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
  mTaskId: {
    type: String,
    required: true,
  },
  mentorId:{
    type:String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  resources: {
    type: [String],
    required: true,
  },
//   isCompleted:{
//     type: Boolean,
//     default: false,
//   },
  menteeId:{
    type:String,
    default:"All",
  },

})

const TaskList = mongoose.model("Task", taskSchema)

module.exports = TaskList
