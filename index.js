const express = require("express")
const mongoose = require("mongoose")
const signupHandler = require("./routeHandler/SignUpHandlers/signupHandler")
const signinHandler = require("./routeHandler/SignInHandlers/signinHandler")
const mentorSignUpHandler = require("./routeHandler/SignUpHandlers/mentorSignUpHandler")
const mentorSignInHandler = require("./routeHandler/SignInHandlers/mentorSignInHandler")
const menteeSignUpHandler = require("./routeHandler/SignUpHandlers/menteeSignUpHandler")
const menteeSignInHandler = require("./routeHandler/SignInHandlers/MenteeSignInHandler")
const devRecordHandler = require("./routeHandler/RecordHandlers/devRecordHandler")
const cpRecordHandler = require("./routeHandler/RecordHandlers/cpRecordHandler")
const taskHandler = require("./routeHandler/RecordHandlers/taskRecordHandler")
const leaderboardHandler = require("./routeHandler/operationHandlers/leaderboardHandler")
const mentorViewHandler = require("./routeHandler/operationHandlers/mentorWindowHandler")
const profileHandler = require("./routeHandler/operationHandlers/profileUpdateHandler")
const leaderboardCP = require("./routeHandler/operationHandlers/leaderboardCP")
const leaderboardDev = require("./routeHandler/operationHandlers/leaderboardDev")

const cors = require("cors")

//express app initialization
const app = express()
app.use(express.json())
app.use(cors())

//cygnus
//star99MOON

//database connection with mongoose
mongoose
  .connect(
    "mongodb+srv://cygnus:star99MOON@cluster0.ifcdflc.mongodb.net/mentorship?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connection Success"))
  .catch((err) => console.log(err))

//application routes
app.use("/signup/mentor", mentorSignUpHandler)
app.use("/signin/mentor", mentorSignInHandler)
app.use("/signup/mentee", menteeSignUpHandler)
app.use("/signin/mentee", menteeSignInHandler)
app.use("/dev", devRecordHandler)
app.use("/cp", cpRecordHandler)
app.use("/leaderboard", leaderboardHandler)
app.use("/viewmentee", mentorViewHandler)
app.use("/leaderboardcp", leaderboardCP)
app.use("/leaderboarddev", leaderboardDev)
app.use("/profile", profileHandler)
app.use("/task", taskHandler)

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err)
  }
  res.status(500).json({ error: err })
}

app.listen(5000, () => {
  console.log("app listening at port 5000")
})

app.use(errorHandler)

