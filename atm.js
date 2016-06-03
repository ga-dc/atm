$(document).ready(function(){
  // checking account
  //Deposit Button
  //this var is a link to the checking deposit button
  var checkingDepositButton = $("#checking .deposit");

  // the value of total checking balance
  var checkingAccountTotal = 0;
  // the value of total saving balance
  var savingAccountTotal = 0;

  changeBoxColorChecking();
  changeBoxColorSaving();

  //if click on checking account deposit button, then inserts into checking balance
  checkingDepositButton.on("click", function(){
    var checkingInputValue = $("#checking .input");
    checkingInputValue = parseInt(checkingInputValue.val());
    checkingAccountTotal = parseInt(checkingAccountTotal);
    checkingAccountTotal = checkingAccountTotal + checkingInputValue;
    checkingAccountTotal = String(checkingAccountTotal);
    $("#checking .balance").html("$" + checkingAccountTotal);
    changeBoxColorChecking();
    changeBoxColorSaving();
  });



  //withdraw button
  //this var is a link to the checking withdraw button
  var checkingWithdrawButton = $("#checking .withdraw");

  //if withdraw button clicked, updates total balance, with overdraft protection
  checkingWithdrawButton.on("click", function(){
    var checkingWithdrawValue = $("#checking .input");
    checkingWithdrawValue = parseInt(checkingWithdrawValue.val());
    checkingAccountTotal = parseInt(checkingAccountTotal);
    if (checkingWithdrawValue <= checkingAccountTotal){
      checkingAccountTotal = checkingAccountTotal - checkingWithdrawValue;
      checkingAccountTotal = String(checkingAccountTotal);
      $("#checking .balance").html("$" + checkingAccountTotal);
    }
    else if ( checkingWithdrawValue > checkingAccountTotal) {
      savingAccountTotal = parseInt(savingAccountTotal);
      var accountsTotal = 0;
      accountsTotal = savingAccountTotal + checkingAccountTotal;
      if ( checkingWithdrawValue <= accountsTotal){
        checkingWithdrawValue = checkingWithdrawValue - checkingAccountTotal;
        savingAccountTotal = savingAccountTotal - checkingWithdrawValue;
        savingAccountTotal = String(savingAccountTotal);
        $("#savings .balance").html("$" + savingAccountTotal);
        checkingAccountTotal = checkingAccountTotal - checkingAccountTotal;
        checkingAccountTotal = String(checkingAccountTotal);
        $("#checking .balance").html("$" + checkingAccountTotal);
      }
      else
      {
        alert("Sorry, there is not enough in your accounts to withdraw this much");
      }

    }
    changeBoxColorChecking();
    changeBoxColorSaving();
  });



  //SAVINGS ACCOUNT
  //Deposit Button
  var savingDepositButton = $("#savings .deposit");


  //if click on checking account deposit button, then inserts into checking balance
  savingDepositButton.on("click", function(){
    var savingInputValue = $("#savings .input");
    savingInputValue = parseInt(savingInputValue.val());
    savingAccountTotal = parseInt(savingAccountTotal);
    savingAccountTotal = savingAccountTotal + savingInputValue;
    savingAccountTotal = String(savingAccountTotal);
    $("#savings .balance").html("$" + savingAccountTotal);
    changeBoxColorChecking();
    changeBoxColorSaving();
  });

  //withdraw button
  var savingWithdrawButton = $("#savings .withdraw");

  //if withdraw button clicked, updates total balance
  savingWithdrawButton.on("click", function(){
    var savingWithdrawValue = $("#savings .input");
    savingWithdrawValue = parseInt(savingWithdrawValue.val());
    savingAccountTotal = parseInt(savingAccountTotal);
    if (savingWithdrawValue <= savingAccountTotal){
      savingAccountTotal = savingAccountTotal - savingWithdrawValue;
      savingAccountTotal = String(savingAccountTotal);
      $("#savings .balance").html("$" + savingAccountTotal);
    }
    else if (savingWithdrawValue > savingAccountTotal){
      checkingAccountTotal = parseInt(checkingAccountTotal);
      var bothAccountsTotal = 0;
      bothAccountsTotal = checkingAccountTotal + savingAccountTotal;
      if (savingWithdrawValue <= bothAccountsTotal){
        savingWithdrawValue = savingWithdrawValue - savingAccountTotal;
        checkingAccountTotal = checkingAccountTotal - savingWithdrawValue;
        checkingAccountTotal = String(checkingAccountTotal);
        $("#checking .balance").html("$" + checkingAccountTotal);
        savingAccountTotal = savingAccountTotal - savingAccountTotal;
        savingAccountTotal = String(savingAccountTotal);
        $("#savings .balance").html("$" + savingAccountTotal);
      }
      else {
        alert("Sorry, there is not enough in your accounts to withdraw this much");
      }

    }
    changeBoxColorChecking();
    changeBoxColorSaving();
  });

  //balance reflected in boxes
  function changeBoxColorChecking() {
    if (checkingAccountTotal <= 0){
      $("#checking.account").addClass("zero");
    }
    else if (checkingAccountTotal > 0){
      $("#checking.account").removeClass("zero");
    }
  }

  function changeBoxColorSaving(){
    if (savingAccountTotal <= 0){
      $("#savings.account").addClass("zero");
    }
    else if (savingAccountTotal > 0){
      $("#savings.account").removeClass("zero");
    }

  }

  /*checkingAccountTotal = parseInt(checkingAccountTotal);
  if (checkingAccountTotal <= 0){
    $("#checking .account").css({"background-color": "#F52F4F", "color": "#FFFFFF" })
  }
  else if */


});
