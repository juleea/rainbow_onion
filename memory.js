function Memory() {
  //Private
  var contents = [];
  var memory_start = 0;
  var memory_end = 4096;
  //Public
  this.init = function () { 
  }

  //Must give valid address!
  this.setContents = function(address, bytes, data) {
    //TODO what if not multiple of 4?
    contents[address] = data;
  }
  
  this.getContents = function(address, bytes) {
    //TODO what if not multiple of 4?
    return contents[address];
  }
}
