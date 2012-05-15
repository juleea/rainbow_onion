instructionMap = {};
instructionMap['mov'] = Mov;
instructionMap['add'] = Add;
instructionMap['sub'] = Sub;
instructionMap['imul'] = Imul;
instructionMap['sal'] = Sal;
instructionMap['shr'] = Shr;
instructionMap['xor'] = Xor;
instructionMap['and'] = And;
instructionMap['or'] = Or;
instructionMap['inc'] = Inc;
instructionMap['dec'] = Dec;

instructionArgumentMap = {'mov': 2, 'add': 2, 'inc': 1};


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

function Arithmetic(parameters, arithFn)
{
  this.parameters = parameters;
  this.valid = true;
  if(!(this.parameters && this.parameters.length == 2))
    this.valid = false;
  this.arithFn = arithFn;
}

Arithmetic.prototype.execute = function(memory, registers) { 
  var src = this.parameters[0].getValue(memory, registers);
  var dest = this.parameters[1].getValue(memory, registers);
  var result = this.arithFn.call(dest, src);
  
  // TODO: check whether dest is register or memory
  dest = this.parameters[1].getLocation(registers);
  registers.setContents(dest, result);
}

Add.prototype = new Arithmetic();

function Add(parameters) {
  Arithmetic.call(this, parameters, goog.math.Integer.prototype.add);
} 

Sub.prototype = new Arithmetic();

function Sub(parameters) {
  Arithmetic.call(this, parameters, goog.math.Integer.prototype.subtract);
} 

Imul.prototype = new Arithmetic();

function Imul(parameters) {
  Arithmetic.call(this, parameters, goog.math.Integer.prototype.multiply);
}


function OneIntOp(parameters, opFn) {
  Arithmetic.call(this, parameters, opFn);
}

/* These are functions that take an Integer as the first param and javascript number as the second */
OneIntOp.prototype.execute = function(memory, registers) { 
  var src = this.parameters[0].getValue();
  var dest = this.parameters[1].getValue();
  var result = this.arithFn.call(registers.getContents(dest), registers.getContents(src).toInt());
  registers.setContents(dest, result);
}

Sal.prototype = new OneIntOp();

function Sal(parameters) {
  OneIntOp.call(this, parameters, goog.math.Integer.prototype.shiftLeft);
}

Shr.prototype = new OneIntOp();

function Shr(parameters) {
  OneIntOp.call(this, parameters, goog.math.Integer.prototype.shiftRight);
}

Xor.prototype = new Arithmetic();

function Xor(parameters) {
  OneIntOp.call(this, parameters, goog.math.Integer.prototype.xor);
}

And.prototype = new Arithmetic();

function And(parameters) {
  OneIntOp.call(this, parameters, goog.math.Integer.prototype.and);
}

Or.prototype = new Arithmetic();

function Or(parameters) {
  OneIntOp.call(this, parameters, goog.math.Integer.prototype.or);
}

//Will work with Constance's new fn names
Inc.prototype = new Arithmetic();

function Inc(parameters) {
  parameters[1] = parameters[0];
  parameters[0] = { getValue: 
    function() { return goog.math.Integer.fromInt(1); } 
    };
  Add.call(this, parameters);
}

Dec.prototype = new Arithmetic();

function Dec(parameters) {
  parameters[1] = parameters[0];
  parameters[0] = { getValue: 
    function() { return goog.math.Integer.fromInt(-1); } 
    };
  Add.call(this, parameters);
}
