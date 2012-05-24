/* Type clarifications:
Here's my standardization that I've put in the code, but haven't checked to make sure its consistent everywhere:
locations are are Numbers (or registers) and contents are Integers. 

to be precise:
  parameters.getValue should return google Integers
  parameters.getLocation should return js Numbers (or a register)
  setContents, memory.setContents should be passed
  (location, value) as (Number, google Integer)
  memory.getContents(Number) and registers.getContents(register) return google Integers

*/

instructionMap = {};
instructionMap['mov'] = Mov;
instructionMap['add'] = Add;
instructionMap['sub'] = Sub;
instructionMap['imul'] = Imul;
instructionMap['sal'] = Sal;
instructionMap['shr'] = Shr;
instructionMap['sar'] = Sar;
instructionMap['xor'] = Xor;
instructionMap['and'] = And;
instructionMap['or'] = Or;
instructionMap['not'] = Not;
instructionMap['inc'] = Inc;
instructionMap['dec'] = Dec;
instructionMap['jmp'] = Jmp;
instructionMap['neg'] = Neg;
instructionMap['cmp'] = Cmp;
instructionMap['test'] = Test;
instructionMap['jne'] = Jne;
instructionMap['je'] = Je;
instructionMap['jns'] = Jns;
instructionMap['js'] = Js;
instructionMap['jb'] = Jb;
instructionMap['ja'] = Ja;
instructionMap['jge'] = Jge;
instructionMap['jg'] = Jg;
instructionMap['jle'] = Jle;
instructionMap['jl'] = Jl;
instructionMap['lea'] = Lea;

MAX_INT = goog.math.Integer.fromInt(214783647);
MIN_INT = goog.math.Integer.fromInt(-214783648);

instructionArgumentMap = {'mov': 2, 'lea': 2, 'add': 2, 'inc': 1, 'sub': 2, 
  'sal': 2, 'sar': 2, 'shr': 2, 'xor': 2, 'and': 2, 'or': 2, 'not':1, 'dec':1, 
  'jmp':1, 'neg': 1, 'cmp': 2, 'test':2, 'jne':1, 'je':2};
jmpInstructions = {'jmp':true, 'je':true, 'jne':true, 'ja':true, 
'jb':true,'jle':true, 'jl': true, 'jg':true, 'jge': true, 'js':true, 
  'jns':true} //should we parse this like a jmp?

function createLabel(label) {
  var toReturn = {};
  toReturn.execute = function () {};
  toReturn.label = label;
  toReturn.valid = true;
  return toReturn;
}

function setContents(location,value) {
  if(!registers.setContents(location, value)) {
    memory.setContents(location, value);
  }
}

/* Mov */
Mov.prototype.execute = function(memory, registers) {
  var src = this.parameters[0].getValue(memory, registers);
  var dest = this.parameters[1].getLocation(registers);
  setContents(dest, src);
}

function Mov(parameters) {
  this.parameters = parameters;
  this.valid = true;
  if(!(this.parameters && this.parameters.length == 2))
    this.valid = false;
}

//TODO: this won't work if src is just a register!?
Lea.prototype.execute = function(memory, registers) {
  var src = goog.math.Integer.fromInt(this.parameters[0].getLocation(memory, registers));
  var dest = this.parameters[1].getLocation(registers);
  setContents(dest, src);
}

function Lea(parameters) {
  this.parameters = parameters;
  this.valid = true;
  if(!(this.parameters && this.parameters.length == 2))
    this.valid = false;
}


Arithmetic.prototype.execute = function(memory, registers) { 
  var src = this.parameters[0].getValue(memory, registers);
  var dest = this.parameters[1].getValue(memory, registers);
  var result = this.arithFn.call(dest, src);
  
  // TODO: check whether dest is register or memory
  dest = this.parameters[1].getLocation(registers);
  setContents(dest, result);
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
  setContents(dest, result);
}

function Arithmetic(parameters, arithFn)
{
  this.parameters = parameters;
  this.valid = true;
  if(!(this.parameters && this.parameters.length == 2))
    this.valid = false;
  this.arithFn = arithFn;
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
  var srcVal = this.parameters[0].getValue(memory, registers);
  var destVal = this.parameters[1].getValue(memory, registers);
  var destLoc = this.parameters[1].getLocation(registers);
  var result = this.arithFn.call(srcVal, destVal);
  setContents(destLoc, result);
}

Sal.prototype = new OneIntOp();

function Sal(parameters) {
  OneIntOp.call(this, parameters, goog.math.Integer.prototype.shiftLeft);
}

Sar.prototype = new OneIntOp();

function Sar(parameters) {
  OneIntOp.call(this, parameters, goog.math.Integer.prototype.shiftRight);
}

Shr.prototype.execute = function (memory, registers) {
  var srcVal = this.parameters[0].getValue(memory, registers);
  var destVal = this.parameters[1].getValue(memory, registers);
  var destLoc = this.parameters[1].getLocation(registers);
  var resultInt = srcVal.toInt() >>> destVal.toInt();
  setContents(destLoc, goog.math.Integer.fromInt(resultInt));
}

function Shr(parameters) {
  this.parameters = parameters;
  if(this.parameters.length == 2) this.valid = true;
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

Not.prototype.execute = function() {
  var srcVal = this.parameters[0].getValue(memory, registers);
  var destLoc = this.parameters[0].getLocation(registers);
  setContents(destLoc, srcVal.not());
}

function Not(parameters) {
  this.parameters = parameters;
  if(parameters&&parameters.length == 1) this.valid = true;
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

Neg.prototype = new Arithmetic();

function Neg(parameters) {
  parameters[1] = parameters[0];
  parameters[0] = { getValue: 
    function() { return goog.math.Integer.fromInt(-1); } 
    };
  Imul.call(this, parameters);
}

Jmp.prototype.execute = function() {
  code.setLabelLine(this.targetLabel);
}

function Jmp(labelParam) {
  this.targetLabel = labelParam;
  this.valid = labelParam;
}

OneFlagJmp.prototype.execute = function() {
  if(flags.getContents(this.flag)==this.flagValue)
    code.setLabelLine(this.targetLabel);
}

function OneFlagJmp (labelParam) {
  this.targetLabel = labelParam;
  this.valid = labelParam;
}

Jne.prototype = new OneFlagJmp();

function Jne(labelParam) {
  this.flag = 'ZF';
  this.flagValue = false;
  OneFlagJmp.call(this, labelParam);
}

Jne.prototype = new OneFlagJmp();

function Je(labelParam) {
  this.flag = 'ZF';
  this.flagValue = true;
  OneFlagJmp.call(this, labelParam);
}

Js.prototype = new OneFlagJmp();

function Js(labelParam) {
  this.flag = 'SF';
  this.flagValue = true;
  OneFlagJmp.call(this, labelParam);
}

Jns.prototype = new OneFlagJmp();

function Jns(labelParam) {
  this.flag = 'SF';
  this.flagValue = false;
  OneFlagJmp.call(this, labelParam);
}

Jb.prototype = new OneFlagJmp();

function Jb(labelParam) {
  this.flag = 'CF';
  this.flagValue = true;
  OneFlagJmp.call(this, labelParam);
}

Ja.prototype.execute = function() {
  if(!flags.getContents('CF') && !flags.getContents('ZF'))
    code.setLabelLine(this.targetLabel);
}

function Ja(labelParam) {
  this.targetLabel = labelParam;
  this.valid = labelParam;
}

Jg.prototype.execute = function() {
  if(!flags.getContents('ZF') && (flags.getContents('SF') == flags.getContents('OF')))
    code.setLabelLine(this.targetLabel);
}

function Jg(labelParam) {
  this.targetLabel = labelParam;
  this.valid = labelParam;
}

Jge.prototype.execute = function() {
  if(flags.getContents('SF') == flags.getContents('OF'))
    code.setLabelLine(this.targetLabel);
}

function Jge(labelParam) {
  this.targetLabel = labelParam;
  this.valid = labelParam;
}

Jle.prototype.execute = function() {
  if(flags.getContents('SF') != flags.getContents('OF'))
    code.setLabelLine(this.targetLabel);
}

function Jle(labelParam) {
  this.targetLabel = labelParam;
  this.valid = labelParam;
}

Jl.prototype.execute = function() {
  if(flags.getContents('SF') != flags.getContents('OF') || flags.getContents('ZF'))
    code.setLabelLine(this.targetLabel);
}

function Jl(labelParam) {
  this.targetLabel = labelParam;
  this.valid = labelParam;
}

Test.prototype.execute = function() {
  var src2 = this.parameters[0].getValue(memory, registers);
  var src1 = this.parameters[1].getValue(memory, registers);
  var result = src1.and(src2);
  flags.setContents("SF", result.isNegative());
  flags.setContents("ZF", result.equals(goog.math.Integer.fromInt(0)));
  flags.setContents("OF", false);
  flags.setContents("CF", false);
}

function Test(parameters) {
  this.valid = parameters.length == 2;
  this.parameters = parameters;
}

Cmp.prototype.execute = function() {
  var src2 = this.parameters[0].getValue(memory, registers);
  var src1 = this.parameters[1].getValue(memory, registers);
  var result = src1.subtract(src2);
  flags.setContents("SF", result.isNegative());
  flags.setContents("ZF", result.equals(goog.math.Integer.fromInt(0)));
  var overflow = result.greaterThan(MAX_INT) || result.lessThan(MIN_INT);
  flags.setContents("OF", overflow);
  flags.setContents("CF", overflow);
}

function Cmp(parameters) {
  this.valid = parameters.length == 2;
  this.parameters = parameters;
}