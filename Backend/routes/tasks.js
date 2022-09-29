const { Task } = require("../models/task");
const express = require("express");
const router = express.Router();

router.post("/new", async (req, res) => {
  let task = new Task({
    name: req.body.name,
    desc: req.body.desc,
    date: req.body.date,
    timer: req.body.timer,
    start: req.body.start,
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

router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      desc: req.body.desc,
      date: req.body.date,
      timer: req.body.timer,
      start: req.body.start,
      user: req.body.user,
    },
    { new: true }
  );

  if (!task) return res.status(400).send("The task cannot be created");

  res.send(task);
});

router.delete("/:id", (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then((task) => {
      if (task) {
        return res
          .status(200)
          .json({ success: true, message: "the task is deleted" });
      } else {
        return res
          .status(400)
          .json({ sucess: false, message: "the task not found" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
