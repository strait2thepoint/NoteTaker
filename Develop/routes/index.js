// dependencies 
const express = require('express'); // This line imports the Express framework.
const path = require('path'); // - This line imports the Node.js path module for working with file and directory paths.
const fs = require('fs'); // - This line imports the Node.js fs module for working with the file system.
const app = express(); //This line creates an instance of the Express application.

// Helper method for generating unique ids
const uuid = require('./uuid'); 

const theNotes = require('../db/db.json') //- This line imports an array of notes from a file called db.json located in a directory called db.

const PORT = 3001;

app.use(express.json());  // This line sets up middleware to parse incoming JSON data.
app.use(express.urlencoded({ extended: true })); // This line sets up middleware to parse incoming URL-encoded data.

app.use(express.static('public')); // This line serves static files from a directory called public.


module.exports = (app) =>{
  //GET
  //This line defines a route for handling GET requests to the /api/notes URL of the application. When this route is accessed, the server responds by sending a JSON object that contains all of the notes except for the first one, which is assumed to be a placeholder or template.
  app.get('/api/notes', (req, res) => {
    res.json(theNotes.slice(1));
  });
  
  //routing:
  //The first route (app.get('/')) handles a GET request to the root URL of the application. It sends the index.html file located in the ../public directory as a response to the client.
  app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'))    
    });
//The second route (app.get('/notes')) handles a GET request to the /notes URL of the application. It sends the notes.html file located in the ../public directory as a response to the client.
  app.get('/notes', (req, res) =>{
  res.sendFile(path.join(__dirname, '../public/notes.html'))
  });
  //The third route (app.get('*')) handles any other GET request that is not matched by the previous two routes. It also sends the index.html file located in the ../public directory as a response to the client.
  app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, '../public/index.html'))    
  });
  };

//create new note body
const newNoteBody = ((body, noteArr)=>{
  const newNote = body; //This line creates a new constant variable newNote and sets its value to the body parameter that is passed in.
  if(!Array.isArray(noteArr))
  noteArr =[]; //This line checks if noteArr is an array. If it is not an array, it initializes it as an empty array.
  if(noteArr.length === 0)
  noteArr.push(0); //This line checks if the noteArr is empty. If it is, it adds the value 0 to the array.

 newNote.id = uuid.v4(); // add a unique id to the newNote object using uuid package

  noteArr.push(newNote); //This line adds the newNote to the end of noteArr.
  fs.writeFileSync(path.join(__dirname, '../db/db.json'),
  JSON.stringify(noteArr, null, 2) //This line writes the updated noteArr to a file called db.json located in a directory called db.
  );
  return newNote;  //This line returns the newNote object.
});

// POST request
app.post('/api/notes', (req, res) => {
const newNote = newNoteBody(req.body, theNotes);  //The createNewNote function processes the data and creates a new note object, which is then assigned to a variable called newNote.
res.json(newNote);  //Finally, the function sends a JSON response to the client using the res.json() method, which sends the newNote object as the response body.
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id; // get the note id from the URL parameter
  const noteIndex = theNotes.findIndex(note => note.id === noteId); // find the index of the note with the matching id
  if (noteIndex === -1) {
    res.status(404).send('Note not found');// if the note is not found, return a 404 error response
    return;
  }
  theNotes.splice(noteIndex, 1); // remove the note from theNotes array
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(theNotes, null, 2));// write the updated notes array to the db.json file
  res.sendStatus(204);// return a success response

});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
  
//Utilized chatGPT to help explain the code and make it more user friendly with attached notes

