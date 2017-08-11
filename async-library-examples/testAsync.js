/*
  Example Async waterfall flow

  Shows how to run a bunch of named functions in sequence and pass or inject values from one places to another


 */

'use strict';
const async = require('async');

async.waterfall(
  [
    async.apply(testFunction1,' hi '), // use apply to push inject inputArgs
    testFunction2, // args1 and args2 from testFunction1 pushed in here without any varables just from the callback
    //async.constant('hello'), //set inputArg1 for next function (second)
    async.apply(testFunction3,' Hi2 value '), //set value for arg1 using apply, arg2 set from either constant or testFunction2 callback data
  ],
  function (err, caption) {
    console.log(caption);
    // Node.js and JavaScript Rock!
  }
);

function testFunction1(inputArg,callback) {
  callback(null, inputArg+'Node.js', 'JavaScript');
}
function testFunction2(arg1, arg2, callback) {
  var caption = arg1 +' and '+ arg2;
  callback(null, caption);
}
function testFunction3(arg1,arg2, callback) {
  arg2 += ' Rock!';
  callback(null, arg2+arg1);
}
