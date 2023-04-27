// dependencies 
const express = require('express'); // This line imports the Express framework.
const app = express(); //This line creates an instance of the Express application.
const routes = require("./routes")
const PORT = 3001;
app.use(express.json());  // This line sets up middleware to parse incoming JSON data.
app.use(express.urlencoded({ extended: true })); // This line sets up middleware to parse incoming URL-encoded data.

app.use(express.static('public')); // This line serves static files from a directory called public.
// the next line sets up your express app to use the router we declare
app.use(routes)
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });