const asynHandler = require("express-async-handler");

const Goal = require("../models/goalsmodel");

//@desc Get Goals
//@route GET /api/goals
// @access private
const getGoals = asynHandler(async (req, res) => {
  const goals = await Goal.find();
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

  await goal.remove();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
