/* parameter types */
var PARAM_TYPE = {
    INTEGER: 1,
    REGISTER: 2,
    DISPLACEMENT: 3,
    INDEXED: 4
};


/*
Parameter class
*/
function Parameter(type) {
  //Private
  
  this.type = type;
  
  // parameter values
  var literal; // constant integer value
  var register; // string
  var displacement; 
  
  // following only used by INDEXED parameter type
  var base_register;
  var index_register;
  var scale;
  

  //Public
  this.init = function (type) {
    this.type = type;
  }
  
  // Overloaded setValue functions for assigning param values
  this.setValue = function(value) {
    switch(this.type) {
        // TODO: convert value to decimal (might be hex)
        case PARAM_TYPE.INTEGER: this.literal = goog.math.Integer.fromNumber(Number(value)); break;
        case PARAM_TYPE.REGISTER: this.register = value; break;
        default: break;//alert("Tried to set value for param with no type");
    }
  }
  
  this.setDisplacementValue = function(displacement, register) {
    /*if (this.type != PARAM_TYPE.DISPLACEMENT) {
        alert("Tried to use displacement addressing for non-displacement param type");
    }*/
    
    this.register = register;
    this.displacement = (displacement == "") ? 0 : Number(displacement);
  }
  
  this.setIndexedValue = function(displacement, base_register, index_register, scale) {
   /*if (this.type != PARAM_TYPE.INDEXED) {
        alert("Tried to use indexed addressing for non-indexed param type");
    }*/

    this.displacement = (displacement == "") ? 0 : Number(displacement);
    this.base_register = base_register;
    this.index_register = index_register;
    this.scale = Number(scale);
    
  }
  
  /*
   * returns the register or memory address represented by this parameter
   */
  this.getLocation = function(registers) {
    switch(this.type) {
        case PARAM_TYPE.INTEGER: break;//alert("Cannot get location for integer parameter"); break;
        case PARAM_TYPE.REGISTER: return this.register; 
        
        // the following two return memory addresses
        case PARAM_TYPE.DISPLACEMENT: return Number(registers.getContents(this.register)) + this.displacement;
        case PARAM_TYPE.INDEXED: return Number(registers.getContents(this.base_register)) + this.scale * Number(registers.getContents(this.index_register)) + this.displacement;
        default: break;// alert("Tried to get location for param with no type");
    }
  }
  
  /* returns the integer value contained at this param's register/address, or
   * the param itself if it is a literal
   */
  this.getValue = function(memory, registers) {
    switch(this.type) {
        case PARAM_TYPE.INTEGER: return this.literal;
        case PARAM_TYPE.REGISTER: return registers.getContents(this.register);
        case PARAM_TYPE.DISPLACEMENT: 
        case PARAM_TYPE.INDEXED: return memory.getContents(this.getLocation(registers)); 
        default: break;//alert("Tried to get value for param with no type");
    }
  }

  this.getType = function() {
    return this.type;
  }

}


/* This function purely verifies the number of arguments within an argument string 
 * and does close to no error checking for argument validity (checks that there is
 * at most one set of outer open/close parens
 * Returns true if valid */

function verifyNumArgs(paramString, numExpectedArgs) {
    if (numExpectedArgs == 1) {
        var matches = paramString.match(/^([-0-9a-z%$]*(?:\([0-9a-z%, ]*\))?)/);
        //console.log(matches);
        // the entire paramString should contain only the sole argument
        return (matches[0].length == paramString.length);
    } else if (numExpectedArgs == 2) {
        var matches = paramString.match(/^([-0-9a-z%$]*(?:\([0-9a-z%, ]*\))?) *, *([0-9a-z%$]*(?:\([0-9a-z%, ]*\))?)$/);
        //console.log(matches);
        // the entire paramString should contain only the sole argument
        if (matches == null) 
            return false;
        else 
            // make sure the entire string is matched + arguments are of at least length 1
            return (matches[0].length == paramString.length && matches[1].length > 0 && matches[2].length > 0);
    }
    
    // we should only ever get 1-2 args 
    return false; 
}

/* Given a string, parses a single argument from the index given - greedy search, returns first argument found 
    Returns an array [Parameter object, matched string] */
function parseSingleArgument(paramString) {
        var parameter = null;
        
        // match for indexed addressing mode: displacement must be 1, or a multiple or 2
        var matches = paramString.match(/^(-?0x[0-9a-f]{1,6}|-?[0-9]+|)\((?:%(eax|ebx|ecx|edx|esi|edi|esp|ebp)|) *, *%(eax|ebx|ecx|edx|esi|edi|ebp) *, *(0x0*1|0x0*2|0x0*4|0x0*8|[1248])\)/);
        //console.log("indexed: " + matches);
        if (matches != null) {
            if (Number(matches[1]) != 1 && Number(matches[1]) % 2 == 1) {
                // TODO: return parseerror
                parseLine.error = "Displacement must be 0, 1 or a multiple of 2.";
                return [parameter, ""];
            }
            parameter = new Parameter(PARAM_TYPE.INDEXED);
            parameter.setIndexedValue(matches[1], matches[2], matches[3], matches[4]);
            return [parameter, matches[0]];
        }
        
        // match for displacement addressing mode + normal (displacement = 0) addressing mode
        // TODO: look into are there restrictions for displacement value?
        matches = paramString.match(/^(-?0x[0-9a-f]{1,6}|-?[0-9]+|)\(%(eax|ebx|ecx|edx|esi|edi|esp|ebp)\)/);
        //console.log("displacement: " + matches);
        if (matches != null) {
            if (Number(matches[1]) != 1 && Number(matches[1]) % 2 == 1) {
                // TODO: return parseerror
                parseLine.error = "Displacement must be 0, 1 or a multiple of 2.";
                return [parameter, ""];
            }
            parameter = new Parameter(PARAM_TYPE.DISPLACEMENT);
            parameter.setDisplacementValue(matches[1], matches[2]);
            return [parameter, matches[0]];
        }
        
        // match for register addressing mode, e.g. %eax
        matches = paramString.match(/^%(eax|ebx|ecx|edx|esi|edi|esp|ebp)/);
        //console.log("reg: " + matches);
        if (matches != null) {
            parameter = new Parameter(PARAM_TYPE.REGISTER);
            parameter.setValue(matches[1]);
            return [parameter, matches[0]];
        }
        
        // match for immediate addressing mode, e.g. 9 or 0x100
        matches = paramString.match(/^\$(-?0x[0-9a-f]{1,6}|-?[0-9]+)/); 
        //console.log("literal: " + matches);
        if (matches != null) {
            parameter = new Parameter(PARAM_TYPE.INTEGER);
            parameter.setValue(matches[1]);
            return [parameter, matches[0]];
        }
        
        parseLine.error = "Please check your syntax.";
        return [parameter, ""];
}


/* Parses 1-2 arguments and returns an array of Parameter objects */
function parseParameters(paramString, numExpectedArgs) {
    var params = [];
    
    var hasValidNumArgs = verifyNumArgs(paramString, numExpectedArgs);
    if (hasValidNumArgs) {
        var matchedParam = parseSingleArgument(paramString);
        if (matchedParam[0] == null) {
            parseLine.error = "Error in parsing argument 1. " + parseLine.error;
            return params;
        } 
        
        params[0] = matchedParam[0];
        if (numExpectedArgs == 2) {
            var nextIndex = paramString.indexOf(matchedParam[1]) + matchedParam[1].length;
            nextIndex = paramString.indexOf(",", nextIndex);
            matchedParam = parseSingleArgument(paramString.substring(nextIndex+1).trim());
            
            if (matchedParam[0] == null) {
                parseLine.error = "Error parsing argument 2. " + parseLine.error;
                params.length = 0; //clear contents
                return params;
            } // TODO: Check that "dest" value is NEVER an integer!g
        
            params[1] = matchedParam[0];
        }
    } else {
        if(numExpectedArgs > 1 && paramString.indexOf(',') == -1 && paramString.indexOf(' ') != -1 ) {
           parseLine.error = "Missing comma between arguments."; 
        } else {
           parseLine.error = "Instruction requires " + numExpectedArgs + " arguments.";
        }
    }
    
    return params;
}

function parseJmp(labaelStr) {
//TODO: give errors to users
  if(labaelStr.indexOf(" ") != -1) {
    parseLine.error = "Invalid space found in jmp instruction";
    //console.log("can't have space in jmp");
  } else if(labaelStr.indexOf(":") != -1) {
    parseLine.error = "Invalid colon found in jmp instruction";
    //console.log("can't have colon in jmp");
  } else if(labaelStr.indexOf(",") != -1) {
    parseLine.error = "Invalid comma found in jmp instruction";
    //console.log("can't have comma in jmp");
  } else {
    return labaelStr;
  }
  return null;
}

//Breaks the line up, figures out which instruction 
//Returns true iff this is a valid instruction
function parseLine(line) {
    if(!line) return null;
    var firstSpace = line.indexOf(" ");
    if (firstSpace == -1) {
        var colon = line.indexOf(":");
        if(colon == -1) {
            // TODO: this returns Invalid syntax: jmp right now if we just type jmp, which is a bit confusing
            parseLine.error = "Invalid syntax: " + line;
            //alert("invalid syntax: " + line);
            return null;
        } else {
            //LABEL
            return createLabel(line.substring(0, colon));
        }
    }
    // instruction parsing
    var instructionStr = line.substring(0, firstSpace);
    
    var instruction = null;
    var parsedParams = undefined;
    var paramStr = line.substring(firstSpace+1).trim();
    if(instructionStr in instructionMap) {
        if(jmpInstructions[instructionStr]) parsedParams = parseJmp(paramStr);
        else parsedParams = parseParameters(paramStr, instructionArgumentMap[instructionStr]);
        
        if (parsedParams.length == 0) {
            parseLine.error = instructionStr + ": " + parseLine.error;
        } else {
            instruction = new instructionMap[instructionStr](parsedParams);
            if(!instruction.valid) {
                parseLine.error = "Invalid params for instruction";
                //alert("invalid params for instruction");
                instruction = null;
            }
        }
    } else {
        parseLine.error = instructionStr + " is not a valid instruction.";
    }
    return instruction;
}

