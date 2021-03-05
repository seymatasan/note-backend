var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const NoteSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    status: {
        type: Boolean,
        default: true

    },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'users' }
    }
);

module.exports = mongoose.model('notes', NoteSchema);