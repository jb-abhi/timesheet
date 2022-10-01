const { Task } = require("../models/task");
const express = require("express");
const { User, userSchema } = require("../models/user");
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

router.get("/all/:id", async (req, res) => {
  const taskList = await Task.find({ user: req.params.id });
  if (!taskList) return res.status(500).json({ success: false });
  res.status(200).send(taskList);
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id).select("-passwordHash");
  if (!task) return res.status(500).json({ success: false });
  res.status(200).send(task);
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

//GRAPH
router.get("/", async (req, res) => {
  const taskList = await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userdata",
      },
    },
    { $unwind: "$userdata" },
    {
      $project: {
        username: "$userdata.name",
        email: "$userdata.email",
        isAdmin: "$userdata.isAdmin",
        name: 1,
        date: 1,
        timer: 1,
        start: 1,
      },
    },
    {
      $group: {
        _id: "$email",
        taskCount: { $sum: 1 },
        data: {
          $push: {
            username: "$username",
            email: "$email",
            isAdmin: "$isAdmin",
            name: "$name",
            date: "$date",
            timer: "$timer",
            start: "$start",
          },
        },
      },
    },
  ]);

  if (!taskList) return res.status(500).json({ success: false });

  res.status(200).send(taskList);
});

module.exports = router;

// [
//   {
//     _id: "63364bd1c141203b1744aca9",
//     name: "First",
//     desc: "FP",
//     date: "Fri Sep 30 2022 07:22:17 GMT+0530 (India Standard Time)",
//     timer: "00:00:09",
//     start: "Fri Sep 30 2022 07:22:08 GMT+0530 (India Standard Time)",
//     user: [
//       {
//         _id: "6335094bb6c467c3eb7c2534",
//         name: "sam",
//         email: "anymail@gmail.com",
//         passwordHash:
//           "$2a$10$NjeQ0wn6sSkzTGwbFyxb2exA1XfoGvEQuQ7ZnkD2MVYR1tyOfC0ja",
//         isAdmin: true,
//         __v: 0,
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "63364bf6c141203b1744acac",
//     name: "Second",
//     desc: "Second FP",
//     date: "Fri Sep 30 2022 07:22:54 GMT+0530 (India Standard Time)",
//     timer: "00:00:18",
//     start: "Fri Sep 30 2022 07:22:35 GMT+0530 (India Standard Time)",
//     user: [
//       {
//         _id: "6335094bb6c467c3eb7c2534",
//         name: "sam",
//         email: "anymail@gmail.com",
//         passwordHash:
//           "$2a$10$NjeQ0wn6sSkzTGwbFyxb2exA1XfoGvEQuQ7ZnkD2MVYR1tyOfC0ja",
//         isAdmin: true,
//         __v: 0,
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "63364c1ac141203b1744acb2",
//     name: "honnda",
//     desc: "honda Project",
//     date: "Fri Sep 30 2022 07:23:30 GMT+0530 (India Standard Time)",
//     timer: "00:00:10",
//     start: "Fri Sep 30 2022 07:23:19 GMT+0530 (India Standard Time)",
//     user: [
//       {
//         _id: "633509deb6c467c3eb7c253c",
//         name: "VJsam",
//         email: "honda@gmail.com",
//         passwordHash:
//           "$2a$10$.GYqYFho5bJzRrcx90CzJe..GAN86VSfJc.WT19.qeHFugCtYSwyG",
//         isAdmin: false,
//         __v: 0,
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "63365d1ffb94d401b4bf993a",
//     name: "Next Task",
//     desc: "New task",
//     date: "Fri Sep 30 2022 08:36:07 GMT+0530 (India Standard Time)",
//     timer: "00:00:07",
//     start: "Fri Sep 30 2022 08:36:00 GMT+0530 (India Standard Time)",
//     user: [
//       {
//         _id: "6335094bb6c467c3eb7c2534",
//         name: "sam",
//         email: "anymail@gmail.com",
//         passwordHash:
//           "$2a$10$NjeQ0wn6sSkzTGwbFyxb2exA1XfoGvEQuQ7ZnkD2MVYR1tyOfC0ja",
//         isAdmin: true,
//         __v: 0,
//       },
//     ],
//     __v: 0,
//   },
// ];

// [
//   {
//     _id: "63364bd1c141203b1744aca9",
//     name: "First",
//     desc: "FP",
//     date: "Fri Sep 30 2022 07:22:17 GMT+0530 (India Standard Time)",
//     timer: "00:00:09",
//     start: "Fri Sep 30 2022 07:22:08 GMT+0530 (India Standard Time)",
//     user: "6335094bb6c467c3eb7c2534",
//     __v: 0,
//     id: "63364bd1c141203b1744aca9",
//   },
//   {
//     _id: "63364bf6c141203b1744acac",
//     name: "Second",
//     desc: "Second FP",
//     date: "Fri Sep 30 2022 07:22:54 GMT+0530 (India Standard Time)",
//     timer: "00:00:18",
//     start: "Fri Sep 30 2022 07:22:35 GMT+0530 (India Standard Time)",
//     user: "6335094bb6c467c3eb7c2534",
//     __v: 0,
//     id: "63364bf6c141203b1744acac",
//   },
//   {
//     _id: "63364c1ac141203b1744acb2",
//     name: "honnda",
//     desc: "honda Project",
//     date: "Fri Sep 30 2022 07:23:30 GMT+0530 (India Standard Time)",
//     timer: "00:00:10",
//     start: "Fri Sep 30 2022 07:23:19 GMT+0530 (India Standard Time)",
//     user: "633509deb6c467c3eb7c253c",
//     __v: 0,
//     id: "63364c1ac141203b1744acb2",
//   },
//   {
//     _id: "63365d1ffb94d401b4bf993a",
//     name: "Next Task",
//     desc: "New task",
//     date: "Fri Sep 30 2022 08:36:07 GMT+0530 (India Standard Time)",
//     timer: "00:00:07",
//     start: "Fri Sep 30 2022 08:36:00 GMT+0530 (India Standard Time)",
//     user: "6335094bb6c467c3eb7c2534",
//     __v: 0,
//     id: "63365d1ffb94d401b4bf993a",
//   },
// ];

[
  {
    _id: "sam@gmail.com",
    taskCount: 6,
    totalTime: 0,
    data: [
      {
        username: "sam",
        email: "sam@gmail.com",
        isAdmin: true,
        name: "First",
        date: "Fri Sep 30 2022 07:22:17 GMT+0530 (India Standard Time)",
        timer: "00:00:09",
        start: "Fri Sep 30 2022 07:22:08 GMT+0530 (India Standard Time)",
      },
      {
        username: "sam",
        email: "sam@gmail.com",
        isAdmin: true,
        name: "Second",
        date: "Fri Sep 30 2022 07:22:54 GMT+0530 (India Standard Time)",
        timer: "00:00:18",
        start: "Fri Sep 30 2022 07:22:35 GMT+0530 (India Standard Time)",
      },
      {
        username: "sam",
        email: "sam@gmail.com",
        isAdmin: true,
        name: "Next Task",
        date: "Fri Sep 30 2022 08:36:07 GMT+0530 (India Standard Time)",
        timer: "00:00:07",
        start: "Fri Sep 30 2022 08:36:00 GMT+0530 (India Standard Time)",
      },
      {
        username: "sam",
        email: "sam@gmail.com",
        isAdmin: true,
        name: "dfg",
        date: "Fri Sep 30 2022 08:49:07 GMT+0530 (India Standard Time)",
        timer: "00:00:08",
        start: "Fri Sep 30 2022 08:48:58 GMT+0530 (India Standard Time)",
      },
      {
        username: "sam",
        email: "sam@gmail.com",
        isAdmin: true,
        name: "dfgdf",
        date: "Fri Sep 30 2022 08:49:45 GMT+0530 (India Standard Time)",
        timer: "00:00:02",
        start: "Fri Sep 30 2022 08:49:43 GMT+0530 (India Standard Time)",
      },
      {
        username: "sam",
        email: "sam@gmail.com",
        isAdmin: true,
        name: "dfg",
        date: "Fri Sep 30 2022 08:51:12 GMT+0530 (India Standard Time)",
        timer: "00:00:02",
        start: "Fri Sep 30 2022 08:51:10 GMT+0530 (India Standard Time)",
      },
    ],
  },
  {
    _id: "honda@gmail.com",
    taskCount: 1,
    totalTime: 0,
    data: [
      {
        username: "vksam",
        email: "honda@gmail.com",
        isAdmin: false,
        name: "honnda",
        date: "Fri Sep 30 2022 07:23:30 GMT+0530 (India Standard Time)",
        timer: "00:00:10",
        start: "Fri Sep 30 2022 07:23:19 GMT+0530 (India Standard Time)",
      },
    ],
  },
];
