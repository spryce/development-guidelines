// Comments from Confluence:
// There is a lot of old code in the node.js services that has resulted in deeply nested promises. 
// Some of this code is doing a lot of work and becomes pretty hard to read and horrible to write tests for.
// If you need to chain more than 2 promises you should instead consider the pattern below.
// ================================================================================================


/**
 * Nested promises
 * This is a testing nightmare. Need to mock promises and their return values
 * to get to the inner most promises to test the logic.
*/
function nastyAlphabet() {
  return asyncToLower(["A", "B", "C"])
    .then(abc => {
      // Do some stuff here. Needs to be tested
      // Maybe pass params to the next promise. Maybe not.
      return asyncToLower(["D", "E", "F"])
        .then(def => {
          // Same again.
          return asyncToLower(["H", "I", "J"])
            .then(hij => {
              // and again
              return asyncToLower(["K", "L", "M"])
                .then(klm => {
                  // All tasks complete
                  return abc.concat(def).concat(hij).concat(klm);
                });
            });
        })
    })
}

/**
 * A better alternative.
 * More promises here than above, yet it's
 * easy to read. Easy to test.
 */
function niceAlphabetVersion1() {
  return abc()
    .then(res => def(res))
    .then(res => hij(res))
    .then(res => klm(res))
    .then(res => nop(res))
    .then(res => qrs(res));
}

// Another alternative
function niceAlphabetVersion2() {
  return abc()
    .then(def)
    .then(hij)
    .then(klm)
    .then(nop)
    .then(qrs);
}
// Now we are able to test each small function.
function abc() {
  // Do some work in here
  return asyncToLower(["A", "B", "C"]);
}
function def(abc) {
  // Do some more work in here
  return asyncToLower(["D", "E", "F"])
    .then(def => abc.concat(def));
}
function hij(abcdef) {
  return asyncToLower(["H", "I", "J"])
    .then(hij => abcdef.concat(hij));
}
function klm(chars) {
  return asyncToLower(["K", "L", "M"])
    .then(res => chars.concat(res));
}
function nop(chars) {
  return asyncToLower(["N", "O", "P"])
    .then(res => chars.concat(res));
}
function qrs(chars) {
  return asyncToLower(["Q", "R", "S"])
    .then(res => chars.concat(res));
}

// Some async function
function asyncToLower(chars) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(chars.map(char => char.toLowerCase()));
    }, 100);
  });
}

nastyAlphabet()
  .then(alphabet => console.log("Nasty alphabet:", alphabet));
niceAlphabetVersion1()
  .then(alphabet => console.log("Nice alphabet version 1:", alphabet));
niceAlphabetVersion2()
  .then(alphabet => console.log("Nice alphabet version 2:", alphabet));