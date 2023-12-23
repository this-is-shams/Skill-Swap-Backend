const express = require("express");
const router = express.Router();
const leaderboard = require("../../schemas/cpRecordSchema");
const menteeFind = require("../../schemas/menteeSchema");

// GET PROBLEM SOLVING LEADERBOARD FOR CURRENT WEEK
router.get("/cpleaderboardweek", async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const endOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (6 - today.getDay())
    );

    const allMentees = await menteeFind.find({});
    const leaderboardData = [];

    for (let i = 0; i < allMentees.length; i++) {
      const mentee = allMentees[i];
      const username = mentee.user;

      const userRecords = await leaderboard
        .find({
          user: username,
          date: {
            $gte: startOfWeek.toISOString().split("T")[0],
            $lte: endOfWeek.toISOString().split("T")[0],
          },
        })
        .sort({ date: 1 });

      let totalTime = 0;
      userRecords.forEach((record) => {
        totalTime += record.time;
      });

      leaderboardData.push({
        name: mentee.name,
        user: username,
        totalCpTime: totalTime,
      });
    }

    leaderboardData.sort((a, b) => b.totalCpTime - a.totalCpTime);

    res.status(200).json(leaderboardData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred from server side" });
  }
});

// GET PROBLEM SOLVING LEADERBOARD FOR CURRENT MONTH
router.get("/cpleaderboardmonth", async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const allMentees = await menteeFind.find({});
    const leaderboardData = [];

    for (let i = 0; i < allMentees.length; i++) {
      const mentee = allMentees[i];
      const username = mentee.user;

      const userRecords = await leaderboard
        .find({
          user: username,
          date: {
            $gte: startOfMonth.toISOString().split("T")[0],
            $lte: endOfMonth.toISOString().split("T")[0],
          },
        })
        .sort({ date: 1 });

      let totalTime = 0;
      userRecords.forEach((record) => {
        totalTime += record.time;
      });

      leaderboardData.push({
        name: mentee.name,
        user: username,
        totalCpTime: totalTime,
      });
    }

    leaderboardData.sort((a, b) => b.totalCpTime - a.totalCpTime);

    res.status(200).json(leaderboardData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred from server side" });
  }
});

module.exports = router;
