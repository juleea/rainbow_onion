/* parameter types */
var PARAM_TYPE = {
    INTEGER: 1,
    REGISTER: 2,
    REGISTER_ADDRESS: 3,
    DISPLACEMENT: 4,
    INDEXED: 5
};


/*
Parameter class
*/
function Parameter(type) {
  //Private
  
  this.type = type; // why doesn't var type = type work?
  var intVal; // constant integer value
  var register; // string

  //Public
  this.init = function (type) {
    this.type = type;
  }
  
  this.setValue = function(value) {
    switch(this.type) {
        case PARAM_TYPE.INTEGER: this.intVal = value; break;
        case PARAM_TYPE.REGISTER: this.register = value; break;
        default: alert("Tried to set value for param with no type");
    }
  }
  
  this.getValue = function() {
    switch(this.type) {
        case PARAM_TYPE.INTEGER: return this.intVal;
        case PARAM_TYPE.REGISTER: return this.register;
        default: alert("Tried to get value for param with no type");
    }
  }
}



// matches decimal+hex numbers, registers and addresses in register 
//var paramPattern = "([0-9]*)|(0x[0-9a-f]{6})|%(eax|ebx|ecx|edx|esi|edi|esp|ebp)|(\(%(eax|ebx|ecx|edx|esi|edi|esp|ebp)\))";
var paramPattern = "[0-9]+|(eax|ebx|ecx|edx|esi|edi|esp|ebp)";//"(([0-9]+)|(0x[0-9a-f]+)|%(eax|ebx|ecx|edx|esi|edi|esp|ebp)),(([0-9]+)|(0x[0-9a-f]+)|%(eax|ebx|ecx|edx|esi|edi|esp|ebp))"
var paramRegex = new RegExp(paramPattern, 'g');


/* Parses 1-2 arguments and returns an array of Parameter objects */
function parseParameters(paramString) {
    var params = [];
    
    // TODO: error checking for empty args
    
    // matches against integers and registers only right now
    var matches = paramString.match(paramRegex); 
    console.log(matches);
    
    // TODO: check for # of args. right now, assume assigning int to register
    // set param types and values 
    var p1 = new Parameter(PARAM_TYPE.REGISTER);
    p1.setValue(matches[0]);
    var p2 = new Parameter(PARAM_TYPE.REGISTER);
    p2.setValue(matches[1]);
    
    params[0] = p1;
    params[1] = p2;

    alert("parameters:\n" + params[0].getValue() + "\n" + params[1].getValue());
 
    return params;
}


//Breaks the line up, figures out which instruction 
//Returns true iff this is a valid instruction
function parseLine() {
    line = $('input#parseText').val();//event.data.param; // necessary because param is bound (see code.js)
    //console.log(line);
    var firstSpace = line.indexOf(" ");
    if (firstSpace == -1) {
        // possibly a label, or an error
        alert("invalid instruction!");
        return false;
    } else {
        // instruction parsing
        var instruction = line.substring(0, firstSpace);
        // TODO: isValidInstruction
        if (instruction == "mov") {
            alert("mov instruction typed!");
            movInstruction = new Mov(parseParameters(line.substring(firstSpace+1).trim()));
            
            movInstruction.execute(memory,registers);
        }
        return true;
    }
}

