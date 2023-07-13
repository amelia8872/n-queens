/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) { // 2

  var solution = new Board({'n': n}); //initiate solution board
  //   0 1
  // 0 1 0
  // 1 0 1

  var colRange = _.range(n);
  //range(3)=[0, 1, 2]
  // [0, 1]

  var addRook = function(count) { // 2
    var row = count; // 2

    // base case: if count === n, return
    if (count === n) {
      return true;
    }

    for (let column of colRange) { // col = 1
      solution.togglePiece(row, column); // (1, 1)
      count++; // 1

      // check if any rook conflicts happens
      if (!solution.hasAnyRowConflicts(row) && !solution.hasAnyColConflicts(column)) {
        if (addRook(count)) { //addRook(1)
          return true;
        }
      }
      solution.togglePiece(row, column);
      count--;
    }
  };

  addRook(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();

};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //
  var solution = new Board({'n': n}); //initiate solution board

  var solutionCount = 0;

  var addRook = function(row) {

    // base case: if row === n, return
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var column = 0; column < n; column++) {

      solution.togglePiece(row, column);


      // check if any rook conflicts happens

      if (!solution.hasAnyRooksConflicts()) {
        addRook(row + 1);
      }
      solution.togglePiece(row, column);

    }
  };


  addRook(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  console.log(solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n}); //initiate solution board
  //   0 1
  // 0 1 0
  // 1 0 1

  var colRange = _.range(n);
  //range(3)=[0, 1, 2]
  // [0, 1]

  var addQueen = function(count) { // 2
    var row = count; // 2

    // base case: if count === n, return
    if (count === n) {
      return true;
    }

    for (let column of colRange) { // col = 1
      solution.togglePiece(row, column); // (1, 1)
      count++; // 1

      // check if any queen conflicts happens
      if (!solution.hasAnyQueenConflictsOn(row, column)) {
        if (addQueen(count)) {
          return true;
        }
      }
      solution.togglePiece(row, column);
      count--;
    }
  };

  addQueen(0);


  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({'n': n}); //initiate solution board

  var solutionCount = 0;


  var rowPos = Array(n);
  rowPos.fill(true);

  var colPos = Array(n);
  colPos.fill(true);



  var addQueen = function(count) { // 2
    var row = count; // 2

    // base case: if count === n, return
    if (count === n) {
      solutionCount++;
      return;
    }
    //i think the issue is now that we dont look at 0,1 it works!
    for (var column = 0; column < n; column++) { // col = 1

      if (rowPos[row] && colPos[column]) {
        solution.togglePiece(row, column); // (1, 1)
        count++; // 1

        rowPos[row] = false;
        colPos[column] = false;

        // check if any rook conflicts happens
        if (!solution.hasAnyQueenConflictsOn(row, column)) {
          addQueen(count);
        }

        rowPos[row] = true;
        colPos[column] = true;
        solution.togglePiece(row, column);
        count--;
      }
    }
  };


  addQueen(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
