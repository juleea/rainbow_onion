function Flags() {

  //Private
  var contents = {
    CF:false,
    ZF:false, 
    SF:false, 
    OF:false, 
  };
  
  // Public
  this.setContents = function(flag, value) {
    contents[flag] = value;
  }


  this.getContents = function(flag) {
    return contents[flag];
  }

  this.getAll = function() {
    return contents;
  }

  this.clearAll = function() {
    for(var flag in contents) {
      this.setContents(flag, false);
    }
  }
}
