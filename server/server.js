const express = require("express");
const bodyParser = require("body-parser");
// const { response } = require("express");
const app = express();
const PORT = 5000;
let history = {};


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// Hand over static files
app.use(express.static("server/public"));

app.listen(PORT, () => {
    console.log("Server on =>", PORT);
});



// app.post("/evaulate", (req, res) => {
//     console.log(req.body);

//     let inputs = req.body;


//     res.sendStatus(202);
// });

// app.post("/guesses", (req, res) => {
//     console.log("This is req.body", req.body);
//     // grabs the guesses from input boxes
//     let allGuesses = req.body;

//     console.log("This is the guesses array!", allGuesses);

//     receiveGuesses(allGuesses);
//     res.sendStatus(201);
// });




