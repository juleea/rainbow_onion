function HelpBox(inputId, outputId, initialValue) {
  //This is a crap hack.  Hopefully we can figure out a better way to do sizing in general
  var inputElem = $("#" + inputId);
  var outputElem = $("#" + outputId);
  

  var keyFunction = function(e) {
    if(e.keyCode == 13){
      var instr = inputElem.val().toLowerCase();
      if(instr in instructionMap) {
        outputElem.html("&nbsp;&nbsp;&nbsp;&nbsp;<b>" + instructionMap[instr].form + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + instructionMap[instr].help +"</b>");
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

findLineFromCursor = function() {
  console.log("aiming for finding");
  var cursorIndex = $("#mainText").get(0).selectionStart;
  var text = $("#mainText").val().trim().split("\n");
  var lineStart = 0;
  for(var i = 0; i < text.length; i++) {
    var instr = text[i].split(' ')[0];
    var instrEnd = lineStart + instr.length;
    if (cursorIndex + 1 > lineStart && cursorIndex - 1 < instrEnd) {
      if (instr in instructionMap) helpBox.search(instr);
      return;
    }
    lineStart = lineStart + text[i].length + 1;
  }
}