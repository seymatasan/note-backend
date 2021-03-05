const express = require("express");
const router = express.Router(); 
var path = require('path');

const {
  getAll,
  getById,
  postUser,
  updateUser,
  deleteUser
} = require("../controllers/users.controller");


router.get("/", getAll,);

router.get("/:id", getById);

router.post("/", postUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);


module.exports = router;