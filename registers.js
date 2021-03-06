function Registers() {
    this.contentsUpdated = new Event(this);

  //Private
  var contents = {
    eax:goog.math.Integer.fromNumber(0),
    ecx:goog.math.Integer.fromNumber(0), 
    edx:goog.math.Integer.fromNumber(0), 
    ebx:goog.math.Integer.fromNumber(0), 
    esi:goog.math.Integer.fromNumber(0), 
    edi:goog.math.Integer.fromNumber(0), 
    esp:goog.math.Integer.fromNumber(0), 
    ebp:goog.math.Integer.fromNumber(0),
    eip:goog.math.Integer.fromNumber(0)
  };
  
  // Public

  //returns true if given string is a valid two byte register
  var isReg2 = function(reg) {
    return twoByteReg.indexOf(reg) > -1;
  }

  this.setContents = function(reg, data, noFlash) {
    //TODO what if not multiple of 4?
    if (contents[reg]) {
      contents[reg] = goog.math.Integer.fromNumber(data);
      if(noFlash!=true) {
        this.contentsUpdated.notify({register: reg});
      }
      return true;
    }
    else {
      return false;
    }
  }


  this.getContents = function(reg) {
//    if (isReg2(reg)) return getContentsHelper(reg, 2);
    if (contents[reg]) return contents[reg];
    alert("invalid register!" + reg);
    return undefined;
  }

  this.getAll = function() {
    return contents;
  }

  this.setAll = function(newRegs) {
    for(reg in contents) {
      this.setContents(reg, newRegs.getContents(reg), true);
    }
  }

}
