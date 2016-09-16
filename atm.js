//TODO:
  // [x] separate dom stuff from update function
  // [x] start putting into object
  // [ ] handle zero balance (add red style)
  // [ ] overdraft protection
var $buttons = $('input:button');

$buttons.on('click', function(){
  bank.beginTransaction($(this));
});

var bank = {
  checking: 0,
  savings: 0,
  transaction: {
    account: '',
    action: '',
    domBalance: {},
    amount: 0,
  },
  beginTransaction: function(button) {
    this.transaction.amount = this.getInput(button);
    this.domLegWork(button);
    this.transact(this.transaction.account, this.transaction.amount)
  },
  getInput: function(form) {
    var input = form.siblings('.input').val();
    var amount = parseFloat(input.replace(/\$|,/g, ""));
    // double check that the amount is actually a number. If not, return false
    return amount ? amount : false;
  },
  domLegWork: function(button) {
    this.transaction.account = button.parent().attr('id');
    this.transaction.action = button.attr('class');
    this.transaction.domBalance = button.siblings('.balance');
  },
  transact: function(account, amount) {
    // if the action is withdraw, set amount to be negative
    amount = (this.transaction.action == 'withdraw') ? -Math.abs(amount) : amount;
    this[account] += amount;
    this.transaction.domBalance.html(this.toUSD(this[account]));
  },
  toUSD: function(number) {
      //found this function at the following link. It gives a nice walkthrough of what's going on as well:
      // http://www.cssnewbie.com/javascript-currency-conversion-script/#.V9vsYZMrLUo
      var number = number.toString(),
      dollars = number.split('.')[0],
      cents = (number.split('.')[1] || '') +'00';
      dollars = dollars.split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('');
      return '$' + dollars + '.' + cents.slice(0, 2);
  },
}
