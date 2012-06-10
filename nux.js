var register_help_text = "32-bit registers are used by x86 processors to store binary data. Though registers are general purpose, each also has its own specific purpose. Hover over each register's name for more details.";
var memory_help_text = "Memory is where instruction code and program data are stored. Displayed below is the program data. Each memory address is 4 bytes (32-bits) wide.";
var flags_help_text = "Flags are contained in a flags register, where each flag is represented by a single-bit. Flags are set and checked by instructions. They can be tested using conditional jump instructions. Hover over each flag for more details.";

// registers
var eax_help_text = "Accumulator: used for arithmetic operations";
var ebx_help_text = "Base register";
var ecx_help_text = "Count register";
var edx_help_text = "Double-precision register";
var esi_help_text = "Source index register";
var edi_help_text = "Destination index register";
var ebp_help_text = "Base pointer register";
var esp_help_text = "Stack pointer register";
var eip_help_text = "Instruction pointer register: contains the memory offset of the next instruction. It cannot be accessed by the programmer directly.";

// flags
var cf_help_text = "Carry flag: indicates when an arithmetic carry or borrow has been generated";
var zf_help_text = "Zero flag: used to result of an arithmetic operation, including bitwise logical instructions. Set if an arithmetic result is zero";
var sf_help_text = "Sign flag: indicates whether result of last mathematic operation (including logical and compare operations) was negative";
var of_help_text = "Overflow flag: indicates whether an arithmetic overflow occurred in an operation";


var instruction_help_title = "Instructions";

// work in progress
var instruction_help_text = "\
    mov Src, Dest   <BR/>\
    &nbsp;&nbsp;Dest = Src  <BR/><BR/>\
    add Src, Dest   <BR /> \
    &nbsp;&nbsp;Dest = Dest + Src";

/*Add.form = "add Src, Dest"
Add.help = "Dest = Dest + Src"

Sub.form = "sub Src, Dest"
Sub.help = "Dest = Dest - Src"

Imul.form = "imul Src, Dest"
Imul.help = "Dest = Dest * Src"

Sal.form = "sal Src, Dest"
Sal.help = "Dest = Dest << Src"

Sar.form = "sar Src, Dest"
Sar.help = "Dest = Dest >> Src Arithmetic Shift"

Shr.form = "shr Src, Dest"
Shr.help = "Dest = Dest >> Src Logical Shift"

Xor.form = "xor Src, Dest"
Xor.help = "Dest = Dest ^ Src"

And.form = "and Src, Dest"
And.help = "Dest = Dest & Src"

Or.form = "or Src, Dest"
Or.help = "Dest = Dest | Src"

Inc.form = "inc Dest"
Inc.help = "Dest = Dest + 1"

Dec.form = "dec Dest"
Dec.help = "Dest = Dest - 1"

Neg.form = "neg Dest"
Neg.help = "Dest = -Dest"

Not.form = "not Dest"
Not.help = "Dest = ~Dest"

Lea.form = "lea Src, Dest"
Lea.help = "Dest = address Src points to"

Cmp.form = "cmp Src2, Src1"
Cmp.help = "Set flags based on Src1-Src2"

Test.form = "test Src2, Src1"
Test.help = "Set flags based on Src1&Src2"

Jmp.form = "jmp label"
Jmp.help = "run code at label"

Je.form = "je label"
Je.help = "jump if compared values were equal (ZF on)"

Jne.form = "jne label"
Jne.help = "jump if compared values were not equal (ZF off)"

Js.form = "js label"
Js.help = "jump if comparison negative (SF on)"

Jns.form = "jns label"
Jns.help = "jump if comparison non-negative (SF off)"

Jg.form = "jg label"
Jg.help = "jump if second value greater"

Jge.form = "jge label"
Jge.help = "jump if second value greater or equal"

Jle.form = "jle label"
Jle.help = "jump if second value less"

Jle.form = "jle label"
Jle.help = "jump if second value less or equal"

Ja.form = "ja label"
Ja.help = "jump if second above first (unsigned greater)"

Jb.form = "jb label"
Jb.help = "jump if second below first (unsigned less)"

Push.form = "push Src"
Push.help = "Put contents of Src in Mem[%esp] and esp-=4"

Push.form = "pop Src"
Push.help = "Put contents of Mem[%esp] in Src and esp+=4"*/