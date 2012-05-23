//jquery for onload
$(window).load(function() {
 $('.scroll-pane').css('height', '200px').show().jScrollPane();
});

$(function() {
  memory = new Memory();
  registers = new Registers();
  code = new Code();
  tutorials = new Tutorials();
  flags = new Flags();
  var currTutorial = 0;

//number textfield lines
	$('.lined').linedtextarea();

//display tutorial tabs and first first page of first tutorial
//tutorials.displayTabs
  tutorials.displayTutorial(0);

  //lISTENERS
  $('.lineno').click(bpClick);

  $('textarea#mainText').keyup(function(e) {
    if(e.keyCode == 13){
      //might use for parsing on enter
    }
  });

  createMemory();
  updateDisplay();

  $('button#runButton').click(runButton);
  $('button#answerButton').click(function(){tutorials.displayAnswer()});
  $('button#stepButton').click(stepButton);
  $('button#contButton').click(contButton);
  $('button#parseButton').click(parseButton);
  $('button#stopButton').click(stopButton);
  $('button#nextPageButton').click(tutorials.displayNextPage);
  $('button#prevPageButton').click(tutorials.displayPrevPage);
  $('button#injectCodeButton').click(tutorials.injectCode);
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
  var registerValues = registers.getAll(); 

  for (var reg in registerValues) {
      $("#" + reg).text(registerValues[reg]);
  }
}

function updateFlags() {
  var flagValues = flags.getAll(); 
  for (var flag in flagValues) {
    if(flagValues[flag]) {
      $("#" + flag).text("On")
      $("." + flag).addClass("onFlag");
    } else {
      $("#" + flag).text("Off")
      $("." + flag).removeClass("onFlag");
    }
  }
}

function createMemory() {    
    var memoryValues = memory.getAll4Bytes();
    for (var i = 0; i < memoryValues.length; i+=4) {
      $('#memoryPane').append('<tr><td>0x' + i.toString(16) + '</td><td id="mem' + i + '">'
       + memory.getContents(i) + '</td></tr>');
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
  //or whether that would actually be a nice feature and not confusing...
  parseButton();
  code.step();
}

function contButton() {
  parseButton();
  code.cont();
}

function stopButton() {
  code.stop();
}

function updateDisplay() {
  updateRegs();
  updateFlags();
  updateCurLine();
}

function updateCurLine() {
  //clear
  for(var i = 0; i < TEXT_AREA_HEIGHT; i++) {
      $('#line' + i).removeClass('running');
  }
  //lines 1-indexed, code 0-indexed
  $('#line' + (code.curLineNum() + 1)).addClass('running');
}
