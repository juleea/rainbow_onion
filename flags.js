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
    if (contents[flag]) return contents[flag];
    alert("invalid flag!" + flag);
    return undefined;
  }

  this.getAll = function() {
    return contents;
  }
}
