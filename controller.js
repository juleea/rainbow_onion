MEM_DISPLAY = 100;
//jquery for onload

$(function() {
  memory = new Memory();
  registers = new Registers();
  $("#runSpeedSlider").slider({
    min: 1,
    max: 10,
    step: 1,
    change: updateRunSpeed,
    stop: updateRunSpeed,
    value: 5
  });

  $("#runSpeed").text($("#runSpeedSlider").slider('value'));
  
  // register observers
  registers.contentsUpdated.attach(updateReg);
  memory.contentsUpdated.attach(updateMemory);
  
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

  createRegisters();
  createMemory();
  updateDisplay();

  $('button#runButton').click(runButton);
  $('button#answerButton').click(function(){tutorials.displayAnswer($("#answerText").val())});
  $('#answerText').keyup(function (e) { if(e.keyCode == 13) tutorials.displayAnswer($("#answerText").val());});
  $('button#stepButton').click(stepButton);
  $('button#contButton').click(contButton);
  $('button#parseButton').click(parseButton);
  $('button#stopButton').click(stopButton);
  $('button#nextPageButton').click(tutorials.displayNextPage);
  $('button#prevPageButton').click(tutorials.displayPrevPage);
  $('button#injectCodeButton').click(tutorials.injectCode);

  //$("#error_msg").tooltip({animation:true, trigger: 'hover', title: "our error msgs here"});
  $("#error_alert").hide();
  var pxToInt = function(pxStr) {return Number(pxStr.substr(0, pxStr.length - 2))};
  $("#helpBox").css("height", $("#memoryBox").height() - $("#registers").height() -57);
  createHelpBox("searchBar", "helpTarget", "mov");

});

function updateRunSpeed(event, ui) {
  var dispSpeed = $('#runSpeedSlider').slider('value');
  var maxSpeed = $('#runSpeedSlider').slider('option', 'max');
  if (dispSpeed === maxSpeed) dispSpeed = String.fromCharCode(8734);
  $('#runSpeed').text(dispSpeed);
}

function bpClick(event) {
  var clickedId = event.target.id;
  //cut out the word "line"
  var clickedNum = parseInt(clickedId.substr(4))-1;
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
    for (var i = 0; i < MEM_DISPLAY; i+=4) {
      $('#memoryPane').append('<tr><td>0x' + i.toString(16) + '</td><td id="mem' + i + '">'
       + memory.getContents(i) + '</td></tr>');
    }
}

function parseButton() {
  var text = $('textarea#mainText').val();
  
  if (!code.init(text)) {
    displayCodeErrors();
    return false;
  }
  
  return true;
}

var getSpeed = function (sliderValue) {
  var runSpeed = $("#runSpeedSlider").slider('value');
  var maxRunSpeed = $("#runSpeedSlider").slider('option', 'max');
  if (runSpeed === maxRunSpeed) return 0;
  return 1/runSpeed * 2000;
}

function runButton() {
  parseButton();
  code.run(getSpeed());
}

function stepButton() {
  //TODO: Figure out if somebody added a line, sync with curLineNum
  //or whether that would actually be a nice feature and not confusing...
  parseButton();
  code.step();
}

function contButton() {
  parseButton();
  code.cont(getSpeed());
}

function stopButton() {
  code.stop();
}

function updateDisplay() {
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
        $("#" + updateReg.lastUpdatedReg).animate({backgroundColor: "#f5f5f5"}, 'slow');
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
    $("#" + reg).animate({backgroundColor: "#88dddd"}, 'slow');

    updateReg.lastUpdatedReg = reg;
};

// initalizes register HTML and values
function createRegisters() {    
    var registerValues = registers.getAll();
    for (var reg in registerValues) {
      $('#registersPane').append('<tr><td><span class="regRow">' + reg + '</span></td><td id="' + reg + '">'
       + registerValues[reg] + '</td></tr>');
    }
}

// loops through to update address values and updates
function updateMemValues(address, bytes, color) {
    var newMem = address + bytes+ address%4 + 40;
    for (var i = MEM_DISPLAY; i < newMem; i+=4) {
      $('#memoryPane').append('<tr><td>0x' + i.toString(16) + '</td><td id="mem' + i + '">'
       + memory.getContents(i) + '</td></tr>');
      console.log("adding " + i);
    }
    MEM_DISPLAY = newMem;
    for(var i = address - address%4; i < address + bytes+ address%4; i+=4) {
      $('#mem' + i).text(memory.getContents(i));
    }
}

// loops through memory to change address backgrounds (used for highlighting)
function updateMemColor(address, bytes, color) {
    //console.log(address, bytes, color);
    for(var i = address - address%4; i < address + bytes+ address%4; i+=4) {
      $('#mem' + i).animate({backgroundColor: color}, 'slow');
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

function displayCodeErrors() {
    var errors = code.getCodeErrors();
     // TODO: put these messages into the textbox next to each like error line (like Eclipse)
    /*for (var i in errors) {
        alert("Line " + errors[i][0] + ": " + errors[i][1]);
    }*/
    
    // just show in tooltip for now
    var errorString = "";
    for (var i in errors) {
        if (i != 0) errorString += "<br />";
        var lineNo = errors[i][0];
        var errorMsg = errors[i][1];
        errorString += "Line " + lineNo + ": " + errorMsg;  
        //$("#error_bar").append('<span class="badge badge-important" id="error_msg' + lineNo + '">!</span>');
        //$("#error_msg" + lineNo).tooltip({animation:true, trigger: 'hover', title: errorMsg});  
    }
    $("#error_alert").empty();
    $("#error_alert").append('<div class="alert alert-block alert-error"><a class="close" data-dismiss="alert" href="#">x</a>'
        + '<strong>Error!</strong> There are errors in your code. Please fix them before proceeding:<br /><p style="margin-left: 3em">' + errorString + "</p></div>"); 
    $("#error_alert").show();
    
}