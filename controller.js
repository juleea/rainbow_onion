//jquery for onload
$(function() {
  memory = new Memory();
  alert ("dude i init'ed");
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

function runButton() {
  alert("AWESOME");
}