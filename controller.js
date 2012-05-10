//jquery for onload
$(function() {
  memory = new Memory();
  registers = new Registers();
  code = new Code();
  //lISTENERS
  $('textarea#mainText').keyup(function(e) {
    if(e.keyCode == 13){
      //might use for parsing on enter
    }
  });

  updateRegs();

  $('button#parseButton').click(parseButton);
  $('button#updateRegsButton').click(updateRegs);
  $('button#runButton').click(runButton);
});

// updates contents of registers
function updateRegs() {
    console.log("updating register contents");
    $("#registers").css("border","3px solid red");
    
    var registerValues = registers.getAll(); 

    for (var reg in registerValues) {
        $("#" + reg).text(registerValues[reg]);
    }
}

function parseButton() {
  code.clear();
  var text = $('textarea#mainText').val();
  var lines = text.split('\n');
  for(var i = 0; i < lines.length ; i++) {
    console.log(lines[i]);
    code.addLine(parseLine(lines[i]));
  }
}

function runButton() {
  parseButton();
  code.run();
}

function updateDisplay() {
  updateRegs();
  updateCurLine();
}

function updateCurLine() {
  $('#lineInfo').text("Current line: " + code.curLineNum());
}

//TODO: need some way to discard blank lines
/*function getLastLine() {
  var text = $('textarea#mainText').val();
  if (text == '') return '';
  var lines = text.split('\n'); 
  console.log(lines);
  if (lines.length <= 1) return '';
  return lines[lines.length - 2];
}*/

/*$('textarea#mainText').keyup(function() {
  console.log('Handler for .keyup() called.');
});*/
