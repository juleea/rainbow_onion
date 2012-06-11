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
    mov Src, Dest   <br/>\
    &nbsp;&nbsp;Dest = Src  <br/><br/>  \
    add Src, Dest   <br/> \
    &nbsp;&nbsp;Dest = Dest + Src <br/>    \
    add Src, Dest   <br/>  \
    Dest = Dest + Src   <br/><br/>  \
    sub Src, Dest   <br/>  \
    Dest = Dest - Src   <br/><br/>  \
    imul Src, Dest<br/> \
    Dest = Dest * Src<br/><br/>  \
    sal Src, Dest<br/>  \
    Dest = Dest << Src<br/><br/>  \
    sar Src, Dest<br/>  \
    Dest = Dest >> Src Arithmetic Shift<br/><br/>  \
    shr Src, Dest<br/>  \
    Dest = Dest >> Src Logical Shift<br/><br/>  \
    xor Src, Dest<br/>  \
    Dest = Dest ^ Src<br/><br/>  \
    and Src, Dest<br/>  \
    Dest = Dest & Src<br/><br/>  \
    or Src, Dest<br/>   \
    Dest = Dest | Src<br/><br/>  \
    inc Dest<br/>   \
    Dest = Dest + 1<br/><br/>  \
    dec Dest<br/>   \
    Dest = Dest - 1<br/><br/>  \
    neg Dest<br/>   \
    Dest = -Dest<br/><br/>  \
    not Dest<br/>   \
    Dest = ~Dest<br/><br/>  \
    lea Src, Dest<br/>  \
    Dest = address Src points to<br/><br/>  \
    cmp Src2, Src1<br/> \
    Set flags based on Src1-Src2<br/><br/>  \
    test Src2, Src1<br/>    \
    Set flags based on Src1&Src2<br/><br/>  \
    jmp label<br/>  \
    run code at label<br/><br/>\
    je label<br/>   \
    jump if compared values were equal (ZF on)<br/><br/>    \
    jne label<br/>  \
    jump if compared values were not equal (ZF off)<br/><br/>   \
    js label<br/>   \
    jump if comparison negative (SF on)<br/><br/>   \
    jns label<br/>  \
    jump if comparison non-negative (SF off)<br/><br/>  \
    jg label<br/>   \
    jump if second value greater<br/><br/>  \
    jge label<br/>  \
    jump if second value greater or equal<br/><br/> \
    jle label<br/>  \
    jump if second value less<br/><br/> \
    jle label<br/>  \
    jump if second value less or equal<br/><br/>    \
    ja label<br/>   \
    jump if second above first (unsigned greater)<br/><br/> \
    jb label<br/>   \
    jump if second below first (unsigned less)<br/><br/>    \
    push Src<br/>   \
    Put contents of Src in Mem[%esp] and esp-=4<br/><br />  \
    pop Src<br/>    \
    Put contents of Mem[%esp] in Src and esp+=4<br/>";