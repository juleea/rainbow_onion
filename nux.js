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
var instruction_help_text = " <table width=100%><tr><td>   \
    mov<br/>    \
    add<br/>    \
    sub<br/>    \
    imul<br/>   \
    sal<br/>    \
    shr<br/>    \
    sar<br/>    \
    xor<br/>    \
    and<br/>    \
    or<br/> \
    not<br/>    \
    inc<br/>    \
    dec<br/>    \
    jmp<br/>    \
    neg<br/>    \
    </td><td>   \
    cmp<br/>    \
    test<br/>   \
    jne<br/>    \
    je<br/> \
    jns<br/>    \
    js<br/> \
    jb<br/> \
    ja<br/> \
    jge<br/>    \
    jg<br/> \
    jle<br/>    \
    jl<br/> \
    lea<br/>    \
    push<br/>   \
    pop<br/>    \
    </td></tr></table>";