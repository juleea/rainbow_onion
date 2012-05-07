
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
  var breakPoints = {};

  this.addLine = function(code, lineNum)
  {
    codeLines[lineNum] = code;
  }

  this.clearCode = function() {
    //TODO: does this leak memory?
    codeLines.clear();
  }

  this.addBreakpoint = function(lineNum) {
    breakPoints[lineNum] = true;
  }

  this.removeBreakpoint = function(lineNum) {
    delete breakPoints[lineNum];
  }

  this.curLineNum = function() {
    return curLineNum;
  }

  this.setCurLine = function(newLine) {
    curLine = newLine;
  }

  this.step = function() {
    var curLine = codeLines[curLineNum];
    if(curLine) {
      curLine.execute();
      curLineNum++;
    }
  }

  this.cont = function() {
    while(curLineNum < code.size() && !breakPoints[curLineNum]) {
      this.step();
    }
  }

  this.run = function() {
    curLineNum = 0;
    this.step();
  }
}