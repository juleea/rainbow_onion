MEM_DISPLAY = 64;
MEM_MODE = 10;
REG_MODE = 10
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
  tutorials.displayTutorial(0);

  //lISTENERS
  $('.lineno').click(bpClick);

  $('textarea#mainText').keyup(function(e) {
    var contents = $('textarea#mainText').val().trim().split("\n");
    if(contents[contents.length - 1] in instructionMap) {
      helpBox.search(contents[contents.length - 1]);
    }
  });

  createRegisters();
  createMemory();
  updateDisplay();
  showPlayButton();

  $('button#restartButton').click(restartButton);
  $('button#answerButton').click(function(){tutorials.displayAnswer($("#answerText").val())});
  $('#answerText').keyup(function (e) { if(e.keyCode == 13) tutorials.displayAnswer($("#answerText").val());});
  $('button#stepButton').click(stepButton);
  //$('button#contButton').click(contButton);
  //$('button#pauseButton').click(pauseButton);
  $('button#parseButton').click(parseButton);
  $('button#resetButton').click(resetButton);
  $('button#nextPageButton').click(tutorials.displayNextPage);
  $('button#prevPageButton').click(tutorials.displayPrevPage);
  $('button#injectCodeButton').click(tutorials.injectCode);


  $("#bin").click(function() {MEM_MODE = 2; createMemory();});
  $("#dec").click(function() {MEM_MODE = 10; createMemory();});
  $("#hex").click(function() {MEM_MODE = 16; createMemory();});
  $("#dec").button('toggle');

  $("#regbin").click(function() {REG_MODE = 2; updateRegs();});
  $("#regdec").click(function() {REG_MODE = 10; updateRegs();});
  $("#reghex").click(function() {REG_MODE = 16; updateRegs();});
  $("#regdec").button('toggle');

  add_help_tooltips();
  
  // Errors
  $("#error_alert").hide();
  
  // 
  var pxToInt = function(pxStr) {return Number(pxStr.substr(0, pxStr.length - 2))};
  helpBox = new HelpBox("searchBar", "helpTarget");
  
  if(document.cookie == "") {
    $('#first_time_here').modal();
    document.cookie = "visited=true";
  } else {
    $('#first_time_here').hide();
  }
  $('#searchBar').hide();
  $("#mainText").get(0).onclick = findLineFromCursor;
});


function add_help_tooltips() {
  $("#registers-help").tooltip({animation:true, trigger: 'hover', title: register_help_text, placement: 'bottom'});
  $("#memory-help").tooltip({animation:true, trigger: 'hover', title: memory_help_text, placement: 'bottom'});
  $("#flags-help").tooltip({animation:true, trigger: 'hover', title: flags_help_text});
  
  // registers
  $("#eax_label").tooltip({animation:true, trigger: 'hover', title: eax_help_text});
  $("#eip_label").tooltip({animation:true, trigger: 'hover', title: eip_help_text});
  $("#ecx_label").tooltip({animation:true, trigger: 'hover', title: ecx_help_text});
  $("#edx_label").tooltip({animation:true, trigger: 'hover', title: edx_help_text});
  $("#ebx_label").tooltip({animation:true, trigger: 'hover', title: ebx_help_text});
  $("#edi_label").tooltip({animation:true, trigger: 'hover', title: edi_help_text});
  $("#esp_label").tooltip({animation:true, trigger: 'hover', title: esp_help_text});
  $("#ebp_label").tooltip({animation:true, trigger: 'hover', title: ebp_help_text});
  $("#esi_label").tooltip({animation:true, trigger: 'hover', title: esi_help_text});
  
  // flags
  $("#CF_cell").tooltip({animation:true, trigger: 'hover', title: cf_help_text});
  $("#ZF_cell").tooltip({animation:true, trigger: 'hover', title: zf_help_text});
  $("#SF_cell").tooltip({animation:true, trigger: 'hover', title: sf_help_text});
  $("#OF_cell").tooltip({animation:true, trigger: 'hover', title: of_help_text});
  
  $("#instruction_set").popover({animation: true, trigger: 'hover', placement: 'bottom', title: instruction_help_title, content: instruction_help_text});
}

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
      $("#" + reg).text(numString(registerValues[reg], REG_MODE));
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
  $('#memoryPane tr').remove();   
  for (var i = 0; i < MEM_DISPLAY; i+=4) {
    $('#memoryPane').append('<tr><td>0x' + padZeros(i.toString(16)) + '</td><td id="mem' + i + '">'
     + numString(memory.getContents(i), MEM_MODE) + '</td></tr>');
  }
}

//Takes a number and returns its representation in the given base: 0x stuff for hex, regular for binary and decimal
function numString(num, mode) {
  var str = num.toString(mode);
  if(mode == 16){
    str = '0x' + padZeros(str);
  }
  return str;
}

function padZeros(str, len) {
  len = len || 8;
  while(str.length < len) {
    str = "0" + str;
  }
  return str;
}

function parseButton() {
  var text = $('textarea#mainText').val();
  
  if (!code.init(text)) {
    displayCodeErrors();
    return false;
  }

  displayCodeErrors();
  return true;
}

var getSpeed = function (sliderValue) {
  var runSpeed = $("#runSpeedSlider").slider('value');
  var maxRunSpeed = $("#runSpeedSlider").slider('option', 'max');
  if (runSpeed === maxRunSpeed) return 0;
  return 1/runSpeed * 2000;
}

function restartButton() {
  showPlayButton();
  parseButton();
  code.stop();

}

function showPauseButton() {
  $('button#pauseButton').remove();
  $('button#contButton').remove();
  var pauseBtnHTML = "<button class='topButtons btn' id='pauseButton'><abbr title='Pause code'><i class='icon-pause'></i>&nbsp;Pause</abbr></button>";
  var pauseBtn = $(pauseBtnHTML);
  pauseBtn.click(pauseButton);
  $('#topBtns').prepend(pauseBtn);
}

function showPlayButton() {
  $('button#pauseButton').remove();
  $('button#contButton').remove();
  var playBtnHTML = "<button class='topButtons btn' id='contButton'><abbr title='Run code'><i class='icon-play'></i>&nbsp;Play</abbr></button>";
  var playBtn = $(playBtnHTML);
  playBtn.click(contButton);
  $('#topBtns').prepend(playBtn);
}

function stepButton() {
  if (parseButton()) code.step();
}

function pauseButton() {
  code.pause();
  showPlayButton();
}

function contButton() {
  if(parseButton()) {
    showPauseButton();
    code.cont(getSpeed());
  }
}

function resetButton() {
  console.log("reset button");
  showPlayButton();
  tutorials.refresh();
}

function updateDisplay() {
  updateFlags();
  updateCurLine();
  if (code.isStopped()) {
    showPlayButton();
//    $('button#pauseButton').hide();
//    $('button#contButton').show();
  }
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
        $("#" + reg).text(numString(registerValues[reg], REG_MODE));
    }
}

// uncolors any highlighted registers
function clearRegColors() {
    if (typeof updateReg.lastUpdatedReg != 'undefined') {
        $("#" + updateReg.lastUpdatedReg).animate({backgroundColor: "#99cccc"}, 'slow');
    }
}

// uncolors any highlighted memory
function clearMemColors() {
    if (typeof updateMemory.lastUpdatedMem != 'undefined') {
        updateMemColor(updateMemory.lastUpdatedMem.address, updateMemory.lastUpdatedMem.bytes, '#99cccc');
    }
}

// highlights any updated regs and resets non-updated regs to white bg
var updateReg = function updateReg(regs, args) {
    clearRegColors();
    clearMemColors();
    
    var reg = args.register;
    $("#" + reg).text(numString(regs.getContents(reg), REG_MODE));
    $("#" + reg).animate({backgroundColor: "#cce6e6"}, 'slow');

    updateReg.lastUpdatedReg = reg;
};

// initalizes register HTML and values
function createRegisters() {    
    var registerValues = registers.getAll();
    for (var reg in registerValues) {
      $('#registersPane').append('<tr><td id="' + reg + '_label"><span class="regRow">' + reg + '</span></td><td id="' + reg + '">'
       + numString(registerValues[reg], REG_MODE) + '</td></tr>');
    }
}

// loops through to update address values and updates
function updateMemValues(address, bytes, color) {
    var newMem = address + bytes+ address%4 + 40;
    for (var i = MEM_DISPLAY; i < newMem; i+=4) {
      $('#memoryPane').append('<tr><td>0x' + i.toString(16) + '</td><td id="mem' + i + '">'
       + numString(memory.getContents(i), MEM_MODE) + '</td></tr>');
    }
    MEM_DISPLAY = newMem;
    for(var i = address - address%4; i < address + bytes+ address%4; i+=4) {
      $('#mem' + i).text(numString(memory.getContents(i), MEM_MODE));
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
     
    updateMemColor(args.address, args.bytes, '#cce6e6');
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
    if (errors.length > 0) {
        $("#error_alert").show();
        $("#error_alert").append('<div class="alert alert-block alert-error"><a class="close" data-dismiss="alert" href="#">x</a>'
        + '<strong>Error!</strong> There are errors in your code. Please fix them before proceeding:<br /><p style="margin-left: 3em">' + errorString + "</p></div>"); 
    }
    
}