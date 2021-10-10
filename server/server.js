const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
let history = [];


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("server/public"));

app.listen(PORT, () => {
    console.log("Server on =>", PORT);
});


app.get("/history", (req, res) => {
    console.log(`Looking for history`);
    res.send(history)
});


//The other side of the evaluate post
app.post("/evaluate", (req, res) => {
    console.log(req.body);

    // req.body.unshift({
    //     numOneIn: req.body.numOneIn,
    //     numTwoIn: req.body.numTwoIn,
    //     operatorSelector: req.body.operatorSelector,
    //     result: claculator(req.body)
    // })

    req.body = {
        numOneIn: '1',
        numTwoIn: '2',
        operatorSelector: '+',
        result: '3'
    }

    let inputs = req.body;

    // history.push(inputs);

    // inputs.result = claculated(inputs)

    res.send(inputs);

    res.sendStatus(202);
});


function claculated(inputs) {
    switch (inputs.operator) {
        default:
            console.log('Empty operator');
            break;
        case '+':
            inputs.result = parseInt(inputs.numOneIn) + parseInt(inputs.numTwoIn)
            console.log(inputs.result);
            break;
        case '-':
            inputs.result = parseInt(inputs.numOneIn) - parseInt(inputs.numTwoIn)
            console.log(inputs.result);
            break;
        case '*':
            inputs.result = parseInt(inputs.numOneIn) * parseInt(inputs.numTwoIn)
            console.log(inputs.result);
            break;
        case '/':
            inputs.result = parseInt(inputs.numOneIn) / parseInt(inputs.numTwoIn)
            console.log(inputs.result);
            break;
    }
}


// app.post("/guesses", (req, res) => {
//     console.log("This is req.body", req.body);
//     // grabs the guesses from input boxes
//     let allGuesses = req.body;

//     console.log("This is the guesses array!", allGuesses);

//     receiveGuesses(allGuesses);
//     res.sendStatus(201);
// });




