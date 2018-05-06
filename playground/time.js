var moment=require('moment');

//set date var
var someTimeStamp=moment().valueOf();
console.log(someTimeStamp);
var date=moment();

console.log(date.format('h:mm a'));