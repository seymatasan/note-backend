const usersController = {};

// Models
// -1 seçilirse büyükten küçüğe doğru sıralanır. 
// limit : kaç eleman görmek istiyorsak ona göre sonuç getirir.
//skip(2): Veri listesinin başından belirtilen değer kadar veriyi görmemezlikten gelecek gerisini getirecektir.
const User = require('../models/User');
//let response = require('../models/response');
const mongoose = require('mongoose');
const { json } = require('body-parser');
var jwt = require('jsonwebtoken');




usersController.getAll = (req, res) => {
  User.find()
    .select("username email password _id")
    .exec()
    .then(result => {/*
      const response ={
        count : result.length,
        Users: result
      }*/
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
}

usersController.getById = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (!err) {
      User.aggregate([
        {
          $lookup: {
            from: "notes",
            localField: "_id",
            foreignField: "user_id",
            as: "myNotes"
          }
        }, {

          $match: { _id: user._id }
        }
      ], (error, result) => {
        if (!error)
          res.status(200).json(result);
      });
    }
    else {
      res.status(500).json({
        error: err
      });
    }
  });
}


usersController.postUser = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user.save()
    .then(result => {
      //console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

usersController.updateUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .exec()
    .then(result => {
      //console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}
usersController.deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

module.exports = usersController;

