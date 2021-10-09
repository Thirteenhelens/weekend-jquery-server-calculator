$(document).ready(onLoad);

function onLoad() {
    //Is jQ sourced? 
    console.log(`Hello!`);

    // Click listeners
    $(`#clearButton`).on(`click`, clearInput);
    // $(`#evalButton`).on(`click`, evaluateInputs);
}

function clearInput() {
    console.log(`Clear Pressed!`);

    $('#operatorSelector').val('default'),
    $('#numOneIn').val(''),
    $('#numTwoIn').val(''),
    $('#currentResult').text('')
};




// function evaluateInputs() {
//     console.log($('#numOneIn').val(), $('#numTwoIn').val(), $('#operatorSelector').val());

//     $.ajax({
//         method: 'POST',
//         url: "/evaluate",
//         data: {
//             inputOne: $('#numOneIn').val(),
//             inputTwo: $('#numTwoIn').val(),
//             operator: $('#operatorSelector').val()
//         }
//     })

// }


// capture this input,
// bundle it up in an object, and send this object to the server
// via a POST.


//function renderToDOM() {

// }