$(document).ready(onLoad);

//Typical on load stuff :)
function onLoad() {
    console.log(`Hello!`);

    // Click listeners
    $(`#clearButton`).on(`click`, clearInput);
    $(`#evalButton`).on(`click`, evaluateInputs);
}


// When the eval button is pressed, the following comments happen
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

        // emptying everything after 
        $('#numOneIn').val(''),
            $('#numTwoIn').val(''),
            $('#operatorSelector').val('default')

        //Check response
        console.log(response);

        //Put new response on dom
        renderToDOM();

    }).catch(function (response) {
        //Let everything know something went wrong
        alert('Calculator Failed, please try again');
        console.log('POST FAILED');
    })
}


function getHistory() {
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function (response) {
        console.log(`Here's the history:`, response);

        renderToDOM(response)
    }).catch(function (response) {
        console.log(`Uh-Oh, get history failed`);
    })
}


function renderToDOM(history) {
    //Clear table and result for safety
    $('#currentResult').text(''),
    $('#historyTableBody').empty();

    //Look at history, put it all on DOM
    for (let question of history) {
        $('#historyTableBody').append(`
        <tr>
            <td>${question.numOneIn, question.operatorSelector, question.numTwoIn}</td>
            <td>${question.result}</td>
        </td>
    `)
    }

    $('#currentResult').append(question.result);
}


// When the clear button is pressed, everything is 
// reset to default or emptied.
function clearInput() {
    console.log(`Clear Pressed!`);

    $('#operatorSelector').val('default'),
    $('#numOneIn').val(''),
    $('#numTwoIn').val(''),
    $('#currentResult').text('')
};