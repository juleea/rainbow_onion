function HelpBox(inputId, outputId, initialValue) {
  //This is a crap hack.  Hopefully we can figure out a better way to do sizing in general
  var inputElem = $("#" + inputId);
  var outputElem = $("#" + outputId);
  

  var keyFunction = function(e) {
    if(e.keyCode == 13){
      var instr = inputElem.val().toLowerCase();
      if(instr in instructionMap) {
        outputElem.html("&nbsp;&nbsp;&nbsp;&nbsp; " + instructionMap[instr].form + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + instructionMap[instr].help);
      } else {
        outputElem.html("Instruction not found")
      }
    }
  }
  inputElem.keyup(keyFunction);
  if(initialValue) {
    inputElem.val(initialValue);
    keyFunction({"keyCode": 13});
  }
  this.search = function(word) {
    inputElem.val(word);
    keyFunction({"keyCode": 13});
  }
}

