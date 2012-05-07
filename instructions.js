instructionMap = {};
instructionMap['mov'] = Mov;

/* Mov */
Mov.prototype.execute = function(memory, registers) {
    alert("executed mov with params " + this.params[0] + " and " + this.params[1]);    
    registers.setContents(this.params[1],this.params[0]);
}

function Mov(parameters) {
  this.parameters = parameters;
  this.valid = true;
  if(!(this.params && this.params.length == 2))
    this.valid = false;
}

