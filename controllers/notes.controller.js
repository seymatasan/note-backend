const notesController = {};
const Note = require("../models/Note");
var jwt = require('jsonwebtoken');


notesController.getAll = (req, res) => {

	Note.find()
	//const limit = typeof e.parameter.limit == "undefined" ? null : e.parameter.limit
	//const limitNumber = /^[1-9]\d*$/.test(limit) ? parseInt(limit) : null
		.exec()
		.then(result => {

			res.status(200).json(result);
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		});
}

notesController.getById = (req, res) => {
	const id = req.params.id;
	Note.findById(id)
		.exec()
		.then(doc => {
			//console.log(doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({ message: 'No valid entry found for provided ID' });
			}
		})
		.catch(err => {
			//console.log(err);
			res.status(500).json({ error: err });
		});
}

notesController.postNote = (req, res) => {
	const note = new Note({
		title: req.body.title,
		description: req.body.description,
		user_id: req.body.user_id
	});
	note.save()
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

notesController.updateNote = (req, res) => {
	const id = req.params.id;
	Note.findByIdAndUpdate(id, req.body, { new: true })
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

// DELETES A USER FROM THE DATABASE
notesController.deleteNote = (req, res) => {
	const id = req.params.id;
	Note.findByIdAndRemove(id)
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




module.exports = notesController;