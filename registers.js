goog.require('goog.math.Integer');


function Registers() {
  //Private
  var contents = {
    'eax':goog.math.Integer.fromNumber(0), 
    'ecx':goog.math.Integer.fromNumber(0), 
    'edx':goog.math.Integer.fromNumber(0), 
    'ebx':goog.math.Integer.fromNumber(0), 
    'esi':goog.math.Integer.fromNumber(0), 
    'edi':goog.math.Integer.fromNumber(0), 
    'esp':goog.math.Integer.fromNumber(0), 
    'ebp':goog.math.Integer.fromNumber(0)
  };
  
  //returns true if given string is a valid two byte register
  var isReg2 = function(reg) {
    return 2byteReg.indexOf(reg) > -1;
  }

  function setContents(register, data) {
    //TODO what if not multiple of 4?
    if (contents[reg])
      contents[reg] = goog.math.Integer.fromNumber(data);
    else 
      alert("invalid register!" + reg);
  }


  function getContents(reg) {
//    if (isReg2(reg)) return getContentsHelper(reg, 2);
    if (contents[reg]) return contents[reg];
    alert("invalid register!" + reg);
    return undefined;
  }

  function getAll() {
    return contents;
  }

}
