const router = require('express').Router()
const path = require("path")
//routing:
//The first route (app.get('/')) handles a GET request to the root URL of the application. It sends the index.html file located in the ../public directory as a response to the client.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
//The second route (app.get('/notes')) handles a GET request to the /notes URL of the application. It sends the notes.html file located in the ../public directory as a response to the client.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

//The third route (app.get('*')) handles any other GET request that is not matched by the previous two routes. It also sends the index.html file located in the ../public directory as a response to the client.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});


module.exports = router