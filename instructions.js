/*
Instruction class prototype
*/

instructionProt = {};
instructionProt.parse = function(line) {
  alert("Implement parsing!")
};
instructionProt.execute = function(memory, registers) {
  alert("Implement execute!")
};
mov = instructionProt.begetObject();

function Instruction(parameters) {
    this.parameters = parameters;
}

Instruction.prototype.execute = function(memory, registers) {
    alert("Implement execute!");
}

/*** MOV ***/

Mov.prototype = new Instruction;
Mov.prototype.constructor = Mov;

/* Mov constructor */
function Mov(parameters) {
    this.parameters = parameters; // TODO: how do we get Mov to inherit from Instruction?
}

Mov.prototype.execute = function(memory, registers) {
    alert("executed mov with params " + this.parameters[0] + " and " + this.parameters[1]);
    
    
    registers.setContents(this.parameters[1],this.parameters[0]);
}
