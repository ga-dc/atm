//adds zero class
function addRedBalance(selector){
    if(parseFloat($(selector).html().split('$')[1])==0){
        $(selector).addClass("zero")
    }
}
//removes zero class
function removeRedBalance(selector){
    if(parseFloat($(selector).html().split('$')[1])!==0){
        $(selector).removeClass('zero')
    }
}
//Doc is loaded
$(document).ready(function() {
    //implements the zero class on start
    addRedBalance(".balance");
    //pre enter from reloading page with form wrapper
    $('form').submit(function(event) {
        event.preventDefault();
    });

    //deposit function checking
    $(".deposit:first").on('click', function(event) {
        event.preventDefault();
        var depositAmount = parseFloat($('.input:first').val()).toFixed(2)
        if(!isNaN(depositAmount)){
            var currentBalance = parseFloat($('.balance:first').html().split('$')[1])
            $('.balance:first').html('$' + (parseFloat(depositAmount)+currentBalance).toFixed(2));
            addRedBalance(".balance:first");
            removeRedBalance(".balance:first");
            $('.entry:first')[0].reset();
        }
    });

    //withdraw function checking
    $(".withdraw:first").on('click', function(event) {
        event.preventDefault();
        var withdrawAmount = parseFloat($('.input:first').val()).toFixed(2)
        var currentBalance = parseFloat($('.balance:first').html().split('$')[1])
        var difference = currentBalance - parseFloat(withdrawAmount)
        var saveBalance = parseFloat($('.balance:eq(1)').html().split('$')[1])
        if(!isNaN(withdrawAmount) && difference >= 0){
            $('.balance:first').html('$' + (currentBalance - parseFloat(withdrawAmount)).toFixed(2));
            addRedBalance(".balance:first");
            removeRedBalance(".balance:first");
            $('.entry:first')[0].reset();
            //overdraft protection logic
        } else if (!isNaN(withdrawAmount) && difference < 0 && saveBalance > (difference*-1)) {
                var protectionAmount = ((currentBalance - withdrawAmount) * -1).toFixed(2)
                var savingsAmount = parseFloat($('.balance:eq(1)').html().split('$')[1])
                $('.balance:eq(1)').html('$'+ (savingsAmount - parseFloat(protectionAmount)).toFixed(2))
                $('.balance:first').html('$0.00')
                addRedBalance(".balance:first");
                addRedBalance(".balance:eq(1)");
                alert('Careful! Overdraft Protection Used! $' + protectionAmount + ' removed from savings')
                $('.entry:first')[0].reset();
        } else {
            alert("You're Poor or didn't put in an ammount to remove =(")
        }
    });

    //deposit savings function
    $(".deposit:eq(1)").on('click', function(event) {
        event.preventDefault();
        var depositAmount = parseFloat($('.input:eq(1)').val()).toFixed(2)
        if(!isNaN(depositAmount)){
            var currentBalance = parseFloat($('.balance:eq(1)').html().split('$')[1])
            $('.balance:eq(1)').html('$' + (parseFloat(depositAmount)+currentBalance).toFixed(2));
            removeRedBalance('.balance:eq(1)')
            addRedBalance('.balance:eq(1)');
            $('.entry:eq(1)')[0].reset();
        }
    });

    //withdraw savings function
    $(".withdraw:eq(1)").on('click', function(event) {
        event.preventDefault();
        var withdrawAmount = parseFloat($('.input:eq(1)').val()).toFixed(2)
        var currentBalance = parseFloat($('.balance:eq(1)').html().split('$')[1])
        var difference = currentBalance - parseFloat(withdrawAmount)
        if(!isNaN(withdrawAmount) && difference >= 0){
            $('.balance:eq(1)').html('$' + (currentBalance - parseFloat(withdrawAmount)).toFixed(2));
            $('.entry:eq(1)')[0].reset();
        } else {
            alert('No Funds In Savings!')
        }
    });
});

//Pseudocode

//When specific account button pressed grab input
//if input is a number execute button task (deposit or Withdraw)
    //if deposit add money to balance div for respective account
        //add listener that checks balance to update color based on amount
    //if Withdraw ignore if balance is unsupported of value
        //if balance is within spec subtract money from balance div of respective account
        //have listener that checks updated balance to update color based on amount
