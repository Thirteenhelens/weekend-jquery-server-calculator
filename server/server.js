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

    //Calling my math function with the data sent from client
    let equation = req.body;
    history.unshift(calculated(equation));

    //Check in and see what history has
    console.log(history);

    //Send good conformation status
    res.sendStatus(202);
});


//Effectively my calculator 
function calculated(equation) {
    console.log(equation);
    let numOne = Number(equation.inputOne);
    let numTwo = Number(equation.inputTwo);
    let operator = equation.operator;

    //Evaluates the operator to see what kind of math to do
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