//jquery for onload
$(function() {
  memory = new Memory();
  registers = new Registers();
  code = new Code();

//number textfield lines
	$('.lined').linedtextarea(
		{selectedLine: 1}
	);

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
  $('button#stepButton').click(stepButton);
});

// updates contents of registers
function updateRegs() {
    $("#registers").css("border","3px solid #ececec");
    
    var registerValues = registers.getAll(); 

    for (var reg in registerValues) {
        $("#" + reg).text(registerValues[reg]);
    }
}

function parseButton() {
  var text = $('textarea#mainText').val();
  code.init(text);
}

function runButton() {
  parseButton();
  code.run();
}

function stepButton() {
  //TODO: Figure out if somebody added a line, sync with curLineNum
  parseButton();
  code.step();
}

function updateDisplay() {
  updateRegs();
  updateCurLine();
}

function updateCurLine() {
  //clear
  for(var i = 0; i < TEXT_AREA_HEIGHT; i++) {
      $('#line' + i).removeClass('running');
  }
  $('#line' + code.curLineNum()).addClass('running');
  $('#lineInfo').text("Current line: " + code.curLineNum());
}

/*$('textarea#mainText').keyup(function() {
  console.log('Handler for .keyup() called.');
});*/
