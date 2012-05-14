instructionMap = {};
instructionMap['mov'] = Mov;
instructionMap['add'] = Add;

instructionArgumentMap = {'mov': 2, 'add': 2, 'incl': 1};


/* Mov */
Mov.prototype.execute = function(memory, registers) {
  var src = this.parameters[0].getValue(memory, registers);
  var dest = this.parameters[1].getLocation(registers);
  registers.setContents(dest, src);
}

function Mov(parameters) {
  this.parameters = parameters;
  this.valid = true;
  if(!(this.parameters && this.parameters.length == 2))
    this.valid = false;
}

Add.prototype.execute = function(memory, registers) { 
  var src = this.parameters[0].getValue(memory, registers);
  var dest = this.parameters[1].getValue(memory, registers);
  var sum = src + dest;
  console.log(src + " + " + dest + " = " + sum);
  dest = this.parameters[1].getLocation(registers);
  // TODO: determine whether getLocation returns memory address or register
  registers.setContents(dest, sum);
}

function Add(parameters) {
  this.parameters = parameters;
  this.valid = true;
  if(!(this.parameters && this.parameters.length == 2))
    this.valid = false;
}

