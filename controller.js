//jquery for onload
$(function() {
  memory = new Memory();
  //registers = new Registers();

  //lISTENERS
  $('textarea#mainText').keyup(function(e) {
    if(e.keyCode == 13){
      newLine = getLastLine();
      if(!parseLine(newLine)) {
        //TODO: display error message--oh but parseLine knows the error...
        //maybe it will return that instead of true eh
      }
    }
  });

  $('button#runButton').click(runButton);
  $('button#updateRegsButton').click(updateRegs);

});

// updates contents of registers
function updateRegs() {
    console.log("updating register contents");
    $("#registers").css("border","3px solid red");
    
    // dummy object until I can getContents
    var registerValues = Object();
    registerValues.eax = 3;
    registerValues.ebx = 2;
    registerValues.ecx = 1;
    registerValues.edx = 0;
    registerValues.esi = 4;
    registerValues.edi = 31;
    registerValues.esp = 3;
    registerValues.ebp = 3;
    registerValues.eip = 4;
    
    for (var reg in registerValues) {
        $("#" + reg).text(registerValues[reg]);
        console.log("#" + reg);
    }
    
}

//TODO: need some way to discard blank lines
function getLastLine() {
  var text = $('textarea#mainText').val();
  if (text == '') return '';
  var lines = text.split('/n');
  return lines[lines.length - 1];
}

function runButton() {
  alert($('textarea#mainText').val());
}

function textAreaEnter() {

}

$('textarea#mainText').keyup(function() {
  console.log('Handler for .keyup() called.');
});