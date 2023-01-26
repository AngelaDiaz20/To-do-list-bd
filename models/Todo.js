const mongoose = require("mongoose");

// the constant 'TodoSchema' defines two fields 'title' and 'completed'. 
const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

/* añadí esta linea*/
// indicates that Mongoose should not apply strict restrictions on database queries.
mongoose.set('strictQuery', false);

// export the file so that it can be used elsewhere 
module.exports = mongoose.model("Todo", TodoSchema);