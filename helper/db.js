var mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://dbUser:S412474t@note.ivng8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const MongoServer = async () => {
  mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Mongodb is connected to", db.connection.host))
  .catch((err) => console.error(err));
};
module.exports = MongoServer;

