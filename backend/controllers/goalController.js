const asynHandler = require("express-async-handler");

const Goal = require("../models/goalsmodel");
const User = require("../models/usermodel");

//@desc Get Goals
//@route GET /api/goals
// @access private
const getGoals = asynHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@desc SET Goals
//@route POST /api/goals
// @access private
const setGoal = asynHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text Field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

//@desc update Goals
//@route put /api/goals
// @access private
const updateGoal = asynHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(`Goal Not Found`);
  }
  const user = await User.findById(req.user.id);

  //check user
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(updateGoal);
});

//@desc Delete Goals
//@route DElete /api/goals
// @access private
const deleteGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  const user = await User.findById(req.user.id);

  //check user
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  await Goal.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
