new Promise(function(resolve, reject) {
	// A mock async action using setTimeout
	setTimeout(function() { resolve(10); }, 3000);
})
.then(function(e) { console.log('done', e); }) //The then callback is triggered when the promise is resolved.  You can also chain then method callbacks:
.catch(function(e) { console.log('catch: ', e); }); //The catch callback is executed when the promise is rejected:



/*
Think about JavaScript loaders:  there are times when you trigger multiple async interactions but only want to respond when all of them are completed
-- that's where Promise.all comes in.
The Promise.all method takes an array of promises and fires one callback once they are all resolved:
*/

Promise.all([promise1, promise2]).then(function(results) {
	// Both promises resolved
})
.catch(function(error) {
	// One or more promises was rejected
});

//An perfect way of thinking about Promise.all is firing off multiple AJAX (via fetch) requests at one time:

var request1 = fetch('/users.json');
var request2 = fetch('/articles.json');

Promise.all([request1, request2]).then(function(results) {
	// Both promises done!
});




//Promise.race is an interesting function -- instead of waiting for all promises to be resolved or rejected,
// Promise.race triggers as soon as any promise in the array is resolved or rejected:

var req1 = new Promise(function(resolve, reject) {
	// A mock async action using setTimeout
	setTimeout(function() { resolve('First!'); }, 8000);
});
var req2 = new Promise(function(resolve, reject) {
	// A mock async action using setTimeout
	setTimeout(function() { resolve('Second!'); }, 3000);
});
Promise.race([req1, req2]).then(function(one) {
	console.log('Then: ', one);
}).catch(function(one, two) {
	console.log('Catch: ', one);
});

// From the console:
// Then: Second!
