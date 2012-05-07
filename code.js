

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