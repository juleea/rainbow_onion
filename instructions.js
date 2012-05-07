instructionMap = {};
instructionMap['mov'] = Mov;
instructionMap['add'] = Add;


/* Mov */
Mov.prototype.execute = function(memory, registers) {
  alert("executed mov with params " + this.params[0] + " and " + this.params[1]);    
  var src = this.params[0].getValue();
  var dest = this.params[1].getValue();
  registers.setContents(dest, registers.getContents(src));
}

function Mov(parameters) {
  this.parameters = parameters;
  this.valid = true;
  if(!(this.params && this.params.length == 2))
    this.valid = false;
}

Add.prototype.execute = function(memory, registers) {
  alert("executed add with params " + this.params[0] + " and " + this.params[1]);    
  var src = this.params[0].getValue();
  var dest = this.params[1].getValue();
  var sum = registers.getContents(src) + registers.getContents(dest);
  registers.setContents(dest, sum);
}

function Add(parameters) {
  this.parameters = parameters;
  this.valid = true;
  if(!(this.params && this.params.length == 2))
    this.valid = false;
}

