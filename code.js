
/* prototype for instructions */
instructionProt = {};
instructionProt.parse = function(line) {
  alert("Implement parsing!")
};
instructionProt.execute = function(memory, registers) {
  alert("Implement execute!")
};

mov = instructionProt.begetObject();


//Breaks the line up, figures out which instruction should parse it
//Returns true iff this is a valid instruction
function parseLine(line) {

}


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