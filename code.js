

function Code() {
  var curLineNum = 0;
  var codeLines = [];
  var breakPoints = {};

  this.init = function(text) {
   this.clear();
    var lines = text.split('\n');
    for(var i = 0; i < lines.length ; i++) {
      this.addLine(parseLine(lines[i]));
    }
  }

  this.insertLine = function(lineNum, code) {
    codeLines[lineNum] = code;
  }

  this.addLine = function(code) {
    codeLines.push(code);
  }

  this.clear = function() {
    codeLines.length = 0;
  }

  this.addBreakpoint = function(lineNum) {
    breakPoints[lineNum] = true;
  }

  this.removeBreakpoint = function(lineNum) {
    delete breakPoints[lineNum];
  }

  this.toggleBreakpoint = function(lineNum) {
    if(breakPoints[lineNum])
      delete breakPoints[lineNum];
    else
      breakPoints[lineNum] = true;
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
    //TODO: seems like breaking our code pattern to put this here but can't think of better;
    curLineNum++;
    updateDisplay();
  }

  this.cont = function() {
    while(curLineNum < codeLines.length + 1) {
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
