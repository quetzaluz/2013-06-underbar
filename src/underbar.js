var _ = {};



(function() {

//Adding this function for undefined iterators
_.identity = function (value) {return value;}

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  _.last = function(array, n) {
    //Below I ref args as arguments[0], etc, just to practice
    //this since it was in the assignment prompt. Obviously it
    //is not reliable to have functions reffing args by index
    var arr = []
      if (Array.isArray(arguments[0])) {arr = (arguments[0]).slice()}
    else if (arguments[0].length === +arguments[0].length) {
      for (var i = 0; i < arguments[0].length; i++){
        arr.push(arguments[0][i])
      }
    }
    if (arguments[1] || arguments[1] === 0) {
      var index = arguments[1]
      if (index > arr.length) {
        index = arr.length;
      }
      return arr.slice((arr.length - index), arr.length)
    } else {
      return arr[arr.length - 1]
    }
  };
/* Provided in assignment, went with own func definition
  // Like last, but for the first elements
  _.first = function(array, n) {
    // TIP: you can often re-use similar functions in clever ways, like so:
    return _.last(array.reverse(), n);
  }; */
  _.first = function (context, myParameter) {
    //Another early function I wrote using arguments[index]
    //I stop doing that after this point.
      var arr = []
      if (Array.isArray(arguments[0])) {arr = (arguments[0]).slice()}
    else if (arguments[0].length === +arguments[0].length) {
      for (var i = 0; i < arguments[0].length; i++){
        arr.push(arguments[0][i])
      }
    }
    if (arguments[1] || arguments[1] === 0) {
      var index = arguments[1]
      if (index > arr.length) {
        index = arr.length;
      }
      return arr.slice(0, index)
    } else {
      return arr[0]
    }
  } 


  // Call iterator(value, key, collection) for each element of collection
  _.each = function(obj, iterator) {
    if (obj == null) return; 
      if (obj.length === +obj.length) {
        for (var i = 0; i < obj.length; i++) {
          if(iterator.call(context, obj[i], i, obj) === {}) return;

      }
    }
  };

  /*
   * TIP: Here's an example of a function that needs to iterate, which we've
   * implemented for you. Instead of using a standard `for` loop, though,
   * it uses the iteration helper `each`, which you will need to write.
   */

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var results = [];
    if (collection === null) return results;
    _.each(collection, function(value, index, list) {
      if (iterator.call(context, value, index, list)) 
      {results[results.length] = value;}
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var results = [];
    if (collection === null) return results;
    _.each(collection, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) 
      {results[results.length] = value;}
    });
    return results;  
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    var seen = [];
    var alreadyFound = false;
    _.each(array, function (value, index) {
      for (var i = 0; i < seen.length; i++) {
      if (value === seen[i]) {alreadyFound = true;}
    }
    if (alreadyFound === false) {
      seen.push(value);
      results.push(array[index]);
    } else alreadyFound = false;
    });
    return results;
  };


  /*
   * map() is a useful primitive iteration function that works a lot
   * like each(), but in addition to running the operation on all
   * the members, it also maintains an array of results.
   */

  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var results = [];
    if (array === null) return results;
    _.each(array, function(value, index, list) {
      //results[results.length] used to insert callback result as it iterates
    results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(obj, propertyName) {
    return _.map(obj, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName) {
    if (arguments[2]) {var args = arguments[2]}
    var isFunc = function (methodName) {
      return typeof methodName === 'function';
    }
    if (isFunc && methodName === "sort") { //patch for 'sort'
      return _.map(list, function(value) {
      return value.sort();
      });
    }else {
      return _.map(list, function(value) {
        return (isFunc ? methodName: value[methodName]).apply(value, args);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(obj, iterator, initialValue) {
    var memo = null;
    if (obj === null) obj = [];
    _.each(obj, function(value, index, list) {
      if (!initialValue) {
    initialValue = true
    memo = 0;
    }
    memo = iterator.call(context, memo, value, index, list);
    });
    return memo
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: A lot of iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    //return _.reduce(collection, function(wasFound, item){
    //  if(wasFound){
    //    return true;
    //  }
    //  return item === target;
    //}, false);
    //NOTE: Decided to go with the solution below...
    var result = false;
    if (collection == null) return result;
    //Following added because had trouble comparing object props
     for(var prop in collection) {
      if(collection.hasOwnProperty(prop) && collection[prop] === target) {
          result = true;
        }
    }
    _.any(collection, function(value) {
      if(target === value) result = true;
    });
    return !!result;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(obj, iterator) {
    // TIP: use reduce on this one!
    // NOTE: Like previous, going with the solution I came up
    // with before I saw the tips in this src file...
    var result = true;
    _.each(obj, function(value, index, list) {
    //if one fails to be the result, return false
      if (result != iterator.call(context, value, index, list)) result = false;
    });
    return result;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.any = function(obj, iterator) {
    // TIP: re-use every() here
    // NOTE: once again using the solution I came up with before
    // seeing this tip. Will refactor later to use _.every ...
    if (!iterator){iterator = _.identity}
    var result = false;
    if (obj == null) return result;
    _.each(obj, function(value, index, list) {
      if (!!result != true) result = iterator.call(context, value, index, list)
    });
    return !!result; //should be true if at least one is true
  };


  /*
   * These are a couple of helpers for merging objects
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  _.extend = function(obj) {
     //copy multiple source objects into one destination object 
    _.each(arguments, function (source) {
      if (source) {
      for (var prop in source) {
        obj[prop] = source[prop]
      }
    }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  _.each(arguments, function (source) {
    if (source) {
      for (var prop in source) {
      if (obj[prop] == null) obj[prop] = source[prop];
    }
    }
  });
    return obj;
  };


  /*
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a `closure scope` (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo;
    return function () {
      memo = func.apply(this, arguments);
    return memo;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2); //get args for func
    return setTimeout(function(){return func.apply(null, args);}, wait);

  };


  /*
   * Advanced collection operations
   */

  // Shuffle an array.
  _.shuffle = function(obj) {
     var obj2 = obj;
      //trying a shuffle method I found on stack overflow.
    //underscore.js uses its own shuffle method _.shuffle
    var counter = obj.length, temp, index;
      while (counter > 0) {
      //swap last element with a random element
      index = Math.floor(Math.random() * counter);
      temp = obj2[counter];
      obj2[counter] = obj2[index];
      obj2[index] = temp;
      counter--;
    }
    return obj2; 
  };

  /* (End of pre-course curriculum) */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //Check if iterator is string, handle appropriately.
    if (typeof iterator === 'string') {
      if (iterator === 'length') {
        iterator = function (obj) {return obj.length;}
      }
    };
    return _.pluck(_.map(collection, function(value, index, list){
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index , right.index ? -1 : 1;
    }), 'value');
    };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  _.zip = function() {
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  _.flatten = function(nestedArray, result) {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /*
   * Offroad
   */

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  _.throttle = function(func, wait) {
  };

}).call(this);
