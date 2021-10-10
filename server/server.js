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


app.post("/evaluate", (req, res) => {
    let equation = req.body;

    history.push(calculated(equation));
    
    console.log(history);

    res.sendStatus(202);
});


function calculated(equation) {
    console.log(equation);
    let numOne = Number(equation.inputOne);
    let numTwo = Number(equation.inputTwo);
    let operator = equation.operator;

    switch (operator) {
        default:
            console.log('Empty operator');
            break;
        case '+':
            equation.result = numOne + numTwo;
                console.log(equation.result);
            break;
        case '-':
            equation.result = numOne - numTwo;
                console.log(equation.result);
            break;
        case '*':
            equation.result = numOne * numTwo;
                console.log(equation.result);
            break;
        case '/':
            equation.result = numOne / numTwo;
                console.log(equation.result);
            break;
    }; //switch ends
    return equation;
}


// app.post("/guesses", (req, res) => {
//     console.log("This is req.body", req.body);
//     // grabs the guesses from input boxes
//     let allGuesses = req.body;

//     console.log("This is the guesses array!", allGuesses);

//     receiveGuesses(allGuesses);
//     res.sendStatus(201);
// });




// req.body.unshift({
    //     numOneIn: req.body.numOneIn,
    //     numTwoIn: req.body.numTwoIn,
    //     operatorSelector: req.body.operatorSelector,
    //     result: claculator(req.body)
    // })
    // let inputs = req.body;
    // history.push(inputs);
    // inputs.result = claculated(inputs)
    // res.send(inputs);