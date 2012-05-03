
/* prototype for instructions- currently bugging out in Firebug */
/*instructionProt = {};
instructionProt.parse = function(line) {
  alert("Implement parsing!")
};
instructionProt.execute = function(memory, registers) {
  alert("Implement execute!")
};

mov = instructionProt.begetObject();*/




function Code() {
  var curLineNum;
  var codeLines = [];

  function curLineNum() {
    return curLineNum;
  }
  function setCurLine(newLine) {
    curLine = newLine;
  }
  function step() {
    var curLine = codeLines[curLineNum];
    curLine.execute();
    curLineNum++;
  }
}