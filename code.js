

function Code() {
  var curLineNum = 0;
  codeLines = [];
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

    while(tempLineNum < codeLines.length && !(tempLineNum in breakPoints)) {
      setTimeout(this.step, speed * 100 * ctr);
      tempLineNum++;
      ctr ++;
    }
  }

  this.run = function(speed) {
    curLineNum = 0;
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
