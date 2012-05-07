/*
Parameter class
*/
function Parameter() {
  //Private

  //TODO can we make this static?
  var TYPE = {
    INTEGER: 1,
    REGISTER: 2, 
    DISPLACEMENT: 3,
    INDEXED: 4
  };
  
  var type;
  var value; // TODO: decide on contents- string? 

  //Public
  this.init = function (type, value) {
    this.type = paramType;
    this.value = value;
  }
  
  //Must give valid address!
  function setValue(value) {
    this.value = value;
  }
  
  function getValue() {
    return value;
  }
  
  function getType() {
    return type;
  }
}

/* Parses 1-2 arguments and returns an array of Parameter objects */
function parseParameters(paramString) {
    var params = [];
    
    // TODO: error checking for empty args
    
    /* dumb parse - looks for comma */
    var comma = paramString.indexOf(",");
    if (comma == -1) {
        // only one argument 
        params[0] = paramString;    
    } else {
        params[0] = paramString.substring(0,comma).trim();
        params[1] = paramString.substring(comma+1).trim();
    }
    
    alert("parameters:\n" + params[0] + "\n" + params[1]);
 
    return params;
}


//Breaks the line up, figures out which instruction 
//Returns true iff this is a valid instruction
function parseLine(event) {
    line = event.data.param; // necessary because param is bound (see code.js)
    var firstSpace = line.indexOf(" ");
    if (firstSpace == -1) {
        // possibly a label, or an error
        return false;
    } else {
        // instruction parsing
        var instruction = line.substring(0, firstSpace);
        // TODO: isValidInstruction
        if (instruction == "mov") {
            alert("mov instruction typed!");
            movInstruction = new Mov(parseParameters(line.substring(firstSpace+1)));
            
            //movInstruction.execute(memory,registers);
        }
        return true;
    }
}

