const express = require("express");
const router = express.Router();
var path = require('path');

// Controller
const {
  getAll,
  getById,
  postNote,
  updateNote,
  deleteNote
} = require("../controllers/notes.controller");


router.get("/", getAll);

router.get("/:id", getById);

router.post("/", postNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;