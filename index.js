//import the Express.js library to create routes and handle HTTP requests
const express = require("express");
//import the Mongoose library to easily perform CRUD operations on them
const mongoose = require("mongoose");
//Library import that allows an application from another source to access its resources
const cors = require("cors");
require('dotenv').config()

//constant to specify the port number on which the server will listen
const PORT = 3030;
//Express instance used to configure and handle requests and responses from the server
const app = express();

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const cluster=process.env.DB_CLUSTER

//route import
const todoRoutes = require("./routes/todoRoutes");
//creation of connection options object that is used when connecting to a MongoDB database.
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  /* useFindAndModify: false, */
};

//Configuration that interprets the data sent in the body of HTTP requests as JSON
app.use(express.json());
//permission for requests from any source
app.use(cors());

mongoose
  //database connection
  .connect(`mongodb+srv://${username}:${password}@${cluster}.q6mleqd.mongodb.net/todolist?retryWrites=true&w=majority`, connectionOptions)
  //promise result for success or failure connection cases
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error(err));

  //route configuration
app.use("/todos", todoRoutes);

//Express's listen() method to start the server on the port specified in the PORT constant
app.listen(PORT, () => {
  console.log("The server is listening on port " + PORT);
});
