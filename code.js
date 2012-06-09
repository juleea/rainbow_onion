function Code() {
  var curLineNum = 0;
  codeLines = [];
  var breakPoints = {};
  codeErrors = [];
  var stopped = false;

  // Returns true if all lines successfully parsed
  this.init = function(text) {
    this.clear();
    var lines = text.split('\n');
    var errorsFound = false;
    for(var i = 0; i < lines.length; i++) {
      instruction = parseLine(lines[i]);
      if (instruction) {
        this.addLine(parseLine(lines[i]));
      } else if (lines[i] != "") {
        codeErrors.push([i+1,parseLine.error]);
        errorsFound = true;
        //When It is not the last line, we add a spacer for blank lines so that
        //The number of lines in the textarea matches the number of lines of code
      } else if(i != lines.length - 1) {
        this.addLine(null);
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
    console.log("in code.clear");
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
    console.log(curLine);
    if(curLine) {

      if(!curLine.execute){
        alert("instruction not valid or implemented");
      } else {
        curLine.execute(memory, registers);
      }
    
      curLineNum++;

      //TODO: seems like breaking our code pattern to put this here but can't think of better;
      updateDisplay();
    }

    if (curLineNum >= codeLines.length) {
      stopped = true;
    }
    
  }



  this.cont = function(speed, fromRun) {
    stopped = false;
    this.stepSlow(speed, fromRun);
  }


  this.stepSlow = function(speed, fromRun) {
    if (!fromRun) {
      var fromRun = false;
    }
    if(stopped) return;
    if(curLineNum < codeLines.length && (!fromRun || !(curLineNum in breakPoints))) {
      fromRun = true;

      var that = this;
      that.step();
      var toRun = function () {
        that.stepSlow(speed, fromRun);
      }
      setTimeout(toRun, speed);
    }
    
  }

  this.run = function(speed) {
    stopped = false;
    curLineNum = 0;
    updateDisplay();
    var t = this;
    var f = function() {t.cont(speed, true);}
    setTimeout(f, speed);
  }

  this.stop = function() {
    stopped = true;
    curLineNum = 0;
    updateDisplay();
  }

  this.pause = function() {
    stopped = true;
    updateDisplay();
  }

  this.getBP = function() {
    return breakPoints;
  }

  this.isStopped = function() {
    return stopped;
  }
}
