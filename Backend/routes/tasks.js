const { Task } = require("../models/task");
const express = require("express");
const router = express.Router();

router.post("/new", async (req, res) => {
  let task = new Task({
    name: req.body.name,
    desc: req.body.desc,
    date: req.body.date,
    timer: req.body.timer,
    user: req.body.user,
  });
  if (!task) return res.status(400).send("the profile cannot be created");
  task = await task.save();
  res.send(task);
});

router.get("/", async (req, res) => {
  const taskList = await Task.find();
  if (!taskList) return res.status(500).json({ success: false });
  res.send(taskList);
});

module.exports = router;
