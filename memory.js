function Memory() {
    // observers
    this.contentsUpdated = new Event(this);

  //Private
  var contents = [];
  var memory_start = 0;
  var memory_end = 4096;
  //Public
  this.isValidAddress = function (addr) {
    return (addr >= memory_start && addr < memory_end);
  }


  //this takes in a memory object and assigns a copy of mem.contents to this.contents
  this.setAll = function (mem) {
    console.log("before = " + contents);
    contents = mem.getAll().slice(); 
    console.log("after = " + contents);
  }


  //Must give valid address!
  this.setContents = function (address, data, bytes) {
    bytes = bytes||4;
    if(!this.isValidAddress(address)) return undefined;
    if (bytes>4) alert("invalid memory hunk requested: too many bytes");
    var number = data.toInt();
    for(var i = 0; i < bytes; i++) {
      contents[address+i] = number & 0xff;
      number >>>= 8;
    }
    
    this.contentsUpdated.notify({address: address, bytes: bytes});
  }

  
  this.getContents = function(address, bytes) {
    //TODO what if not multiple of 4?
    bytes = bytes||4;
    if(!this.isValidAddress(address)) return undefined;
    var result = 0;
    if (bytes>4) alert("invalid memory hunk requested: too many bytes");
    //x86 little endian
    for(var i = bytes -1; i >=0; i--) {
      result <<= 8;
      result |= 0x0000ff & (contents[address + i] || 0);
    }
    return goog.math.Integer.fromNumber(result);
  }
  this.getAll = function() {return contents;}

  this.getAll4Bytes = function(max) {
    max = max || memory_end;
    var chunkMemory = [];
    for(var i = memory_start; i < max; i+=4){
      chunkMemory[i] = this.getContents(i);
    }
    return chunkMemory;
  }
}