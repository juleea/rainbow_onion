

function Code() {
  var curLineNum = 0;
  codeLines = [];
  var breakPoints = {};
  codeErrors = [];

  // Returns true if all lines successfully parsed
  this.init = function(text) {
    this.clear();
    var lines = text.split('\n');
    var errorsFound = false;
    for(var i = 0; i < lines.length; i++) {
      instruction = parseLine(lines[i]);
      if (instruction) {
        this.addLine(parseLine(lines[i]));
      } else if (lines[i] != "") { // sometimes it picks up the last newline - TODO: should not ever try to parse empty line
        codeErrors.push([i+1,parseLine.error]);
        errorsFound = true;
      }
    }
    return !errorsFound;
  }
  
  // Returns an array of (line number, error strings) objects
  this.getCodeErrors = function() {
    return codeErrors;
  }

  this.insertLine = function(lineNum, code) {
    codeLines[lineNum] = code;
  }

  this.addLine = function(code) {
    codeLines.push(code);
  }

  this.clear = function() {
    codeLines.length = 0;
    codeErrors.length = 0;
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

  this.setCurLineNum = function(newLine) {
    curLineNum = newLine;
    updateDisplay();
  }

  this.setLabelLine = function(label) {
    for(var i = 0; i < codeLines.length; i++) {
      if(codeLines[i] && codeLines[i].label == label) {
        this.setCurLineNum(i);
        return;
      }
    }
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

  this.cont = function(speed) {
    var tempLineNum = curLineNum;
    var ctr = 0;
    console.log(speed);
    while(tempLineNum < codeLines.length && !(tempLineNum in breakPoints)) {

      setTimeout(this.step, speed * 2000 * ctr);
      tempLineNum++;
      ctr ++;
    }
  }

  this.run = function(speed) {
    curLineNum = 0;
    updateDisplay();
    this.cont(speed);
  }

  this.stop = function() {
    curLineNum = 0;
    updateDisplay();
  }

  this.getBP = function() {
    return breakPoints;
  }
}
