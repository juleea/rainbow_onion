

function Code() {
  var curLineNum = 0;
  var codeLines = [];
  var breakPoints = {};

  this.addLine = function(lineNum, code)
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
      if(!curLine.execute){
        alert("instruction not implemented");
      } else {
        curLine.execute(memory, registers);
      }
    }
    curLineNum++;
  }

  this.cont = function() {
    while(curLineNum < codeLines.length) {
      this.step();
      if(curLineNum in breakPoints) {
        break;
      }
    }
  }

  this.run = function() {
    curLineNum = 0;
    this.cont();
  }
}