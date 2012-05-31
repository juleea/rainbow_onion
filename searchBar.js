function createHelpBox(inputId, outputId, initialValue) {
  //This is a crap hack.  Hopefully we can figure out a better way to do sizing in general
  var inputElem = $("#" + inputId);
  var outputElem = $("#" + outputId);
  

  var keyFunction = function(e) {
    if(e.keyCode == 13){
      var instr = inputElem.val().toLowerCase();
      if(instr in instructionMap) {
        outputElem.html("<b>" + instr + "</b><br />" + instructionMap[instr].form + "<br />" + instructionMap[instr].help);
      }
    }
  }

  inputElem.keyup(keyFunction);
  if(initialValue) {
    inputElem.val(initialValue);
    keyFunction({"keyCode": 13});
  }
}

