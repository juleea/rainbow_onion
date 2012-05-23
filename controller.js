//jquery for onload
$(window).load(function() {
 $('.scroll-pane').css('height', '200px').show().jScrollPane();
});

$(function() {
  memory = new Memory();
  registers = new Registers();
  
  // register observers
  registers.contentsUpdated.attach(updateReg);
  memory.contentsUpdated.attach(updateMemory);
  
  code = new Code();
  tutorials = new Tutorials();
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

  updateRegs();
  createMemory();

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
  updateCurLine();
}

function updateCurLine() {
  //clear
  for(var i = 0; i < TEXT_AREA_HEIGHT; i++) {
      $('#line' + i).removeClass('running');
  }
  //lines 1-indexed, code 0-indexed
  $('#line' + (code.curLineNum() + 1)).addClass('running');
  $('#lineInfo').text("Current line: " + code.curLineNum());
}


// updates contents of registers
function updateRegs() {    
    var registerValues = registers.getAll(); 

    for (var reg in registerValues) {
        $("#" + reg).text(registerValues[reg]);
    }
}

// uncolors any highlighted registers
function clearRegColors() {
    if (typeof updateReg.lastUpdatedReg != 'undefined') {
        $("#" + updateReg.lastUpdatedReg).css('background-color', 'white');
    }
}

// uncolors any highlighted memory
function clearMemColors() {
    if (typeof updateMemory.lastUpdatedMem != 'undefined') {
        updateMemColor(updateMemory.lastUpdatedMem.address, updateMemory.lastUpdatedMem.bytes, 'white');
    }
}

// highlights any updated regs and resets non-updated regs to white bg
var updateReg = function updateReg(regs, args) {
    clearRegColors();
    clearMemColors();
    
    var reg = args.register;
    $("#" + reg).text(regs.getContents(reg));
    $("#" + reg).css('background-color', '#88dddd');

    updateReg.lastUpdatedReg = reg;
};



// loops through to update address values and updates
function updateMemValues(address, bytes, color) {
    for(var i = address - address%4; i < address + bytes+ address%4; i+=4) {
      $('#mem' + i).text(memory.getContents(i));
    }
}

// loops through memory to change address backgrounds (used for highlighting)
function updateMemColor(address, bytes, color) {
    console.log(address, bytes, color);
    for(var i = address - address%4; i < address + bytes+ address%4; i+=4) {
      $('#mem' + i).css('background-color', color);
    }
}


// highlights and updates changed memory vals. 
var updateMemory = function updateMemory(memory, args) {
    clearRegColors();
    clearMemColors();
     
    updateMemColor(args.address, args.bytes, '#88dddd');
    updateMemValues(args.address, args.bytes);

    updateMemory.lastUpdatedMem = args;
};

function createMemory() {    
    var memoryValues = memory.getAll4Bytes();
    for (var i = 0; i < memoryValues.length; i+=4) {
      $('#memoryPane').append('<tr><td>0x' + i.toString(16) + '</td><td id="mem' + i + '">'
       + memory.getContents(i) + '</td></tr>');
    }
}