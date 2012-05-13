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
  $('.lineno').click(bpClick);

  $('textarea#mainText').keyup(function(e) {
    if(e.keyCode == 13){
      //might use for parsing on enter
    }
  });

  updateRegs();

  $('button#runButton').click(runButton);
  $('button#stepButton').click(stepButton);
  $('button#contButton').click(contButton);
  $('button#parseButton').click(parseButton);

});

function bpClick(event) {
  var clickedId = event.srcElement.id;
  //cut out the word "line"
  var clickedNum = parseInt(clickedId.substr(4));
  code.toggleBreakpoint(clickedNum);
  $("#" + clickedId).toggleClass("breakpoint");
}

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
  //or whether that would actually be a nice feature...
  parseButton();
  code.step();
}

function contButton() {
  parseButton();
  code.cont();
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
