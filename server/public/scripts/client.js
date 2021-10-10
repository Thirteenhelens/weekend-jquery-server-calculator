$(document).ready(onLoad);

//This is only set to true when the page loads for the first time
let firstTime = true;

function onLoad() {
    //Typical on load stuff :)
    console.log(`Hello!`);

    //Checking history and putting it on DOM
    getHistory();

    // Click listeners
    $(`#clearButton`).on(`click`, clearInput);
    $(`#evalButton`).on(`click`, sendInputs);
}


function sendInputs() {
    // Log to make sure everything is correct
    console.log($('#numOneIn').val(), $('#numTwoIn').val(), $('#operatorSelector').val());

    //Send a post with the input info as data
    $.ajax({
        method: 'POST',
        url: "/evaluate",
        data: {
            inputOne: $('#numOneIn').val(),
            inputTwo: $('#numTwoIn').val(),
            operator: $('#operatorSelector').val()
        } //data ends
    }).then(function (response) {
        console.log('Success POST', response);

        getHistory();

        //Emptying everything for safety 
        $('#numOneIn').val('');
        $('#numTwoIn').val('');
        $('#operatorSelector').val('default')

        //Check response
        console.log(response);


    }).catch(function (response) {
        //Did something go wrong?
        alert('Calculator Failed, please try again');
        console.log('POST FAILED');
    })
}


function getHistory() {
    //Getting array of previous equations from server
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function (response) {
        console.log(response);
        //Sending previous equations to be put on the DOM
        historyToDOM(response)
    }).catch(function (response) {
        //Letting me know if something went wrong
        console.log(`Uh-Oh, get history failed`);
    })
}


function historyToDOM(history) {
    //Clear table and result for safety
    $('#currentResult').text('');
    $('#historyTableBody').empty();

    //Current is equal to the last equation put in history
    let current = history[0].result;
    if (firstTime === false) {
        $('#currentResult').text(current);
    };

    //After the above is run, this is no longer the first time the page loaded
    firstTime = false;

    //Look at history, put it all on DOM
    for (let question of history) {
        console.log(question);

        let firstNum = question.inputOne;
        let secondNum = question.inputTwo;
        let operator = question.operator;
        let result = question.result;

        $('#historyTableBody').append(`
        <tr>
            <td>${firstNum} ${operator} ${secondNum}</td>
            <td>${result}</td>
        </td>
    `)
    }

    //This just detects if there is a # in the current results so that it can be highlighted
    if ($('#currentResult').text().length > 0) {
        $('#result').addClass('omgNumberInMe');
    } else {
        $('#result').removeClass('omgNumberInMe');
    }
}


function clearInput() {
    //This func empties inputs, and sets the selector to default
    console.log(`Clear Pressed!`);

    $('#operatorSelector').val('default');
    $('#numOneIn').val('');
    $('#numTwoIn').val('');
    $('#currentResult').text('');

    //Makes sure current result is no longer highlighted
    $('#result').removeClass('omgNumberInMe');
}