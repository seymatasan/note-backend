const indexController = {};
const User = require("../models/User");
var jwt = require('jsonwebtoken');

//const passport = require('passport');
//const {ensureAuthenticated} = require('../config/auth') 
//const bcrypt = require('bcrypt');

indexController.register = (req, res) => {
	const { username, email, password } = req.body;
	let errors = [];
	if (!username || !email || !password) {
		errors.push("Fields should be full");
	}
	//check if password is more than 6 characters
	if (password.length < 6) {
		errors.push("response.msg_6char");
	}
	if (errors.length > 0) {
		res.status(500).json({
			errors: errors,
			properties: req.body
		})
	} else {
		//validation passed
		User.findOne({ email: email }).exec((err, user) => {
			console.log(user);
			if (user) {
				errors.push("response.emailCheckingAlready");
				res.json({
					errors: errors,
					properties: user
				});
			} else {
				const newUser = new User({
					username: username,
					email: email,
					password: password
				});

				newUser.save()
					.then((result) => {
						res.status(200).json(result);
					})
					.catch(err =>
						res.status(500).json({
							error: err
						}));

			}
		});
	}
}

indexController.login = (req, res) => {
	const { username, password } = req.body;
	let errors = [];
	if (!username || !password) {
		errors.push("response.fieldChecking");
	}
	if (errors.length > 0) {
		res.status(500).json({
			errors: errors
		})
	} else {
		//validation passed
		User.findOne({ username: username, password: password }).exec()
			.then(result => {
				const token = jwt.sign(
					{ userId: username._id },
					'RANDOM_TOKEN_SECRET',
					{ expiresIn: '24h' });
				//console.log(doc);
				if (result) {
					res.status(200).json({
						message: "Login Succes",
						_id:result._id,
						username: result.username,
						token:token
					});
				} else {
					res.status(404).json({ message: 'Login Failed' });
				}
			})
			.catch(err => {
				//console.log(err);
				res.status(500).json({ error: err });
			});
	}
}


indexController.logout = (req, res) => {
	res.send("response.logout");
	req.logout();
}


module.exports = indexController;