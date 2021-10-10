$(document).ready(onLoad);

//Typical on load stuff :)
function onLoad() {
    console.log(`Hello!`);

    //Checking history and putting it on DOM
    getHistory();

    // Click listeners
    $(`#clearButton`).on(`click`, clearInput);
    $(`#evalButton`).on(`click`, evaluateInputs);
}


function evaluateInputs() {
    // Log to make sure everything is correct
    console.log($('#numOneIn').val(), $('#numTwoIn').val(), $('#operatorSelector').val());

    //Send a post with the input info as data
    $.ajax({
        method: 'POST',
        url: "/evaluate",
        data: {
            inputOne: $('#numOneIn').val(),
            inputTwo: $('#numTwoIn').val(),
            operator: $('#operatorSelector').val(),
            result: ''
        }
    }).then(function (response) {
        console.log('Success POST', response);

        //Emptying everything for safety 
        $('#numOneIn').val(''),
        $('#numTwoIn').val(''),
        $('#operatorSelector').val('default')

        //Check response
        console.log(response);

        //Put new response on DOM via function
        resultToDOM(response);

    }).catch(function (response) {
        //Did something go wrong?
        alert('Calculator Failed, please try again');
        console.log('POST FAILED');
    })
}


function resultToDOM(responseObject) {
    //Check what object is comprised of
    console.log('responseObject', responseObject);

    //Clear result landing area
    $('#currentResult').text('');
    //Add result to DOM (part 1)
    $('#currentResult').append(responseObject.result);

    //Making the append more legible
    let firstNum = responseObject.numOneIn;
    let secondNum = responseObject.numTwoIn;
    let operator = responseObject.operatorSelector;
    let result = responseObject.result;

    //Add result to DOM (part 2)
    $('#historyTableBody').append(`
        <tr>
            <td>${firstNum + ' ' + operator + ' ' + secondNum}</td>
            <td>${result}</td>
        </td>
    `);
}


function getHistory() {
    //Getting array of previous equations from server
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function (response) {
        //Sending previous equations to be put on the DOM
        historyToDOM(response)
    }).catch(function (response) {
        //Letting me know if something went wrong
        console.log(`Uh-Oh, get history failed`);
    })
}


function historyToDOM(history) {

    //Clear table and result for safety
    $('#currentResult').text(''),
        $('#historyTableBody').empty();

    //Look at history, put it all on DOM
    for (let question of history) {
        console.log(question);

        let firstNum = question.numOneIn;
        let secondNum = question.numTwoIn;
        let operator = question.operatorSelector;
        let result = question.result;

        $('#historyTableBody').append(`
        <tr>
            <td>${firstNum + ' ' + operator + ' ' + secondNum}</td>
            <td>${result}</td>
        </td>
    `)
    }
}


function clearInput() {
    //This func empties inputs, and sets the selector to default
    console.log(`Clear Pressed!`);

    $('#operatorSelector').val('default'),
        $('#numOneIn').val(''),
        $('#numTwoIn').val(''),
        $('#currentResult').text('')
}