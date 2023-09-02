const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Get Goals" });
});

router.post("/", (req, res) => {
  res.status(200).send({ message: "Get Goals" });
});

router.put("/", (req, res) => {
  res.status(200).send({ message: "Get Goals" });
});

router.delete("/", (req, res) => {
  res.status(200).send({ message: "Get Goals" });
});

module.exports = router;
