
/* Here is the format for a new tutorial.  To add a tutorial, copy and paste this template then fill
in the areas below.  When you're done, go to tutorials.js and add the name of your tutorial to line 3
below the comment "  //INSERT NEW TUTORIAL NAMES HERE"
*/
PUT_NAME_IN_CAPS_HERE = {
  "Name": "Name Here",
  "Pages": [ //Array of pages.  Each page must have a title, it can optionally have Text, Code, Question, Answer, Registers, and Memory
    {
      "Title"   :   "My first page",
      "Text"    :   ["Put each paragraph of text on a separate line in its own quotes.",
                    "Separate the lines by commas.",
                    ],
      "Code"    :   ["mov $30, %eax", //Add code that you want students to see here
                    "mov $15, %ecx",  //This section is optional
                    "mov %ecx, %ebx",
                    "mov %edx, %ecx",
                    "mov $19, %edx",
                    "mov %ecx, %eax",
                    ],
      "Question":   "Put optional question here?", //Question and Answer are optional
      "Answer"  :   "Optional answer here! Though if you have a question, it must have an answer",
      "Registers":  {"eax": 15, "ebx" : 12},//If you want to specify any starting register values
                                            // Do so here. Remove this line if not.
      "Memory"  :   {"0": 15, "16": 14}     //Put the memory addresses and values here. Memory values optional.
    },
    { 
      "Title"   :   "Page 2.  You can have as many or few pages as you like",
      "Text"    :   ["The simplest thing the computer can do is move things around.",
                    "Take a look at the code to the right. Do you see where it says <i>mov $30, %eax</i>?",
                    "Click the run button to see what this does!",
                    ],
      "Code"    :   ["mov $30, %eax",
                    ],
      "Question":   "What is in %eax after you run the code?",
      "Answer"  :   "30",
            "Memory"  :   {"0": 20, "16": 21}     //Put the memory addresses and values here. Memory values optional.

    },
    {
      "Title"   :   "Moving Between Registers",
      "Text"    :   ["You can also move things from one register to another.",
                    "Check out the code on the right.",
                    ],
      "Code"    :   [ "mov %eax, %ebx"],
      "Registers":  {"eax": 15},
      "Question":   "What value is in %ebx after you run the code?",
      "Answer":     "15"
    }
  ]
}

LOGICAL_TUTORIAL = {
  "Name": "Logical Instructions",
  "Pages": [
    {
      "Title"   :   "Introduction to Logical Operators",
      "Text"    :   ["The following instructions perform logical bitwise operations using values in registers and memory:",
                    "<b>xor</b> src, dest: dest = dest ^ src" +
                    "<br/><b>and</b> src, dest: dest = dest & src" +
                    "<br/><b>or</b> src, dest: dest = dest | src" + 
                    "<br/><b>not</b> dest: dest = ~dest",
                    "Note that the and, or, and xor instructions each take two operands, while the not instruction takes one.",
                    "Set the register display mode to binary!",
                    ],
      "Code"    :   ["mov $4, %eax",
                    "not %eax"
                    ],
        "Registers":  {"eax": 76, "ebx" : 45, "ecx": 24},
      "Question":   "What is the binary value of register %ecx, which contains decimal value 24?",
      "Answer"  :   "11000",
    },
    { 
      "Title"   :   "and, or, xor",
      "Text"    :   ["The result of bitwise operations with two operands is obtained by performing the logical operation on each pair of corresponding bits in the two operands.",
                    "<b>and</b>: the result in a position is 1 if both bits are 1, and 0 otherwise" +
                    "<br/><b>or</b>: the result in a position is 1 if at least one of the two bits is 1, and 0 otherwise" + 
                    "<br/><b>xor</b> (exclusive or): the result in a position is 1 if only one of two bits is 1, and 0 if the two bits are both 0 or both 1",
                    "Let's take a closer look at the 'and' and 'or' instructions. Step through the code, which will 'and' and 'or' values in %eax and %ebx. Feel free to restart it to get a closer look at the bits!",
                    ],
      "Code"    :   ["mov $43, %eax",
                    "mov $56, %ebx",
                    "and %eax, %ebx",
                    "mov $43, %eax",
                    "mov $56, %ebx",
                    "or %eax, %ebx",
                    ],
      "Question":   "What is the binary value in %ebx after you execute these instructions (thorough the or operation)?",
      "Answer"  :   "111011",
    },
    { 
      "Title"   :   "xor",
      "Text"    :   ["As a reminder, with <b>xor</b> (exclusive or), the result in a position is 1 if only one of two bits is 1, and 0 if the two bits are both 0 or both 1.",
                    "xor is also an instruction that can affect the flags (can you see why?).",
                    "xor can be used to swap two register values without using a third register. Switch the display to decimal mode and run the code to see register values in %eax and %edx swapped!"
                    ],
      "Code"    :   ["mov $25, %eax",
                    "mov $119, %edx",
                    "xor %eax, %edx",
                    "xor %edx, %eax",
                    "xor %eax, %edx"
                    ],
      "Question":   "What do you expect the value to be if you execute 'xor %eax, %eax'?",
      "Answer"  :   "0",
    },
    {
      "Title"   :   "not",
      "Text"    :   ["Lastly, <b>not</b> takes one operand, and flips all its bits.",
                    "Make sure you're still in binary mode, and step through the code!",
                    ],
      "Code"    :   [ "mov $76, %eax",
                        "not %eax"],
      "Question":   "What *binary* value will be in %eax after you execute these instructions?",
      "Answer":     "10110011"
    }
  ]
}


ARITHMETIC_TUTORIAL = {
  "Name": "Arithmetic Instructions",
  "Pages": [ //Array of pages.  Each page must have a title, it can optionally have Text, Code, Question, Answer, Registers, and Memory
    {
      "Title"   :   "Introduction to Arithmetic Instructions",
      "Text"    :   ["The following assembly instructions perform arithmetic operations using values in registers and in memory",
                     "<b>add</b> performs addition" +
                     "<br/><b>sub</b> performs subtraction" +
                     "<br/><b>imul</b> performs multiplication" +
                     "<br/><b>inc</b> increments by 1" +
                     "<br/><b>dec</b> decrements by 1" +
                     "<br/><b>neg</b> performs negation",

                     "Go to the next page to learn more!"

                    ],
      "Code"    :   ["",
                    ],
      "Registers":  {},//If you want to specify any starting register values
                                            // Do so here. Remove this line if not.
      "Memory"  :   {}     //Put the memory addresses and values here. Memory values optional.
    },
    { 
      "Title"   :   "add, sub, and imul",
      "Text"    :   ["add, sub, and imul each take 2 parameters -- a source and a destination -- and performs the following operations:",
                     "<b>add</b> dest = dest + src<br/>" +
                     "<b>sub</b> dest = dest - src<br/>" +
                     "<b>imul</b> dest = dest * src",

                     "as with <b>mov</b>, at least one parameter must be a register. The other values can be registers and addresses and sources can immediate values.",
                    "The code to the right contains a variety of source and destination types. See if you can calculate the value that will be in %eax at the end and check your answer by running the code!",
                    
                    ],
      "Registers":  {"eax":4, "ecx":8, "edx":4, "ebx":1},
      "Code"    :   ["add %eax, %ecx",
                     "add $24, %eax",
                     "sub %ecx, %eax",
                     "add 4(%edx, %ecx, 2), %edx",
                     "imul %edx, %eax",
                     "imul $2, %eax"
                    ],
      "Question":   "What value will %eax hold after all these instructions execute?",
      "Answer"  :   "464",
      "Memory"  :   {"32": 42, "16": 21}     //Put the memory addresses and values here. Memory values optional.

    },
    {
      "Title"   :   "inc, dec, and neg",
      "Text"    :   ["<b>inc</b> and <b>dec</b> add and subtract 1, respectively, to the single register or memory address parameter.",
                      "Both instructions can be implemented with <b>add</b> and <b>sub</b>, but <b>inc</b> and <b>dec</b> do so more efficiently.",
                    "<b>neg</b> negates the value in a given register or memory address.",
                    "As you step through the code, notice that arithmetic operations also affect condition flags."
                    ],
      "Code"    :   [ "inc %ecx",
                      "dec %ebx",
                      "neg %ebx",
                      "add %ebx, %ecx",
                      "dec %ecx",
                      "imul %ecx, %edx",
                      "inc %edx",
                      "sub $55, %edx",
                      "imul %ebx, %edx"],
      "Registers":  {"eax": 10, "ecx":12, "edx":20, "ebx":5},
      "Question":   "What value will be in %ebx after all these instructions are executed?",
      "Answer":     "-424"
    }
  ]
}

JMP_TUTORIAL = {
  "Name": "Jump, if statements, and for loops",
  "Pages": [
    {
      "Title"   :   "Jmp and labels",
      "Text"    :   ["When you want to repeat code or skip code, it's nice to be able to execute from a specific spot.",
                    "In x86, you can give a line of code a label.  Then, when you jump to the label, you skip right too it, no matter where it is in the code.",
                    "Try playing the code. You might want to slow it down or step through so you see exactly what is happening.",
                    ],
      "Code"    :   ["mov $0, %eax",
                    "mov $0, %ebx",
                    "jmp myLabel",
                    "inc %eax",
                    "myLabel:",
                    "inc %ebx",
                    ],
      "Question":   "What value will be in %eax after these instructions all execute?",
      "Answer"  :   "0",
      "Registers":  {"eax": 10, "ebx" : 10, "ecx": 0},//If you want to specify any starting register values
                                            // Do so here. Remove this line if not.
    },
    { 
      "Title"   :   "Making an if statement",
      "Text"    :   ["While jumping alone happens from time to time, usually a jump instruction is preceeded by a comparison or test. <i>(See the flags tutorial for more on cmp before you continue)</i>.",
                    '<pre>if(x==y) x = x + y;\nelse y = y * 2;\nx++</pre>',
                    "This code might be compiled to the assembly displayed to the left.  Jne means jump if the compared values are not equal.  That means jump when the zero flag is not on.",
                    "In this code, x is in eax and y in ebx.  Feel free to play with their values and rerun the code. Try changing jne to je: jump if equal."
                    ],
      "Code"    :   ["cmp %eax, %ebx",
                    "jne notEqualLabel",
                    "add %ebx, %eax",
                    "jmp endIf",
                    "notEqualLabel:",
                    "imul $2, %ebx",
                    "endIf:",
                    "inc %eax"
                    ],
      "Question":   "Which label represents the <i>else</i> part?",
      "Answer"  :   "notEqualLabel",
      "Registers":  {"eax":7, "ebx":4}
    },
    {
      "Title"   :   "Making a for loop",
      "Text"    :   ["Let's see how you can make a for loop with assembly. Consider the following C code:",
                    "<pre>int result = 1;<br/>for(int i = 0; i < exponent; i++) {\n\tresult*=base;\n}</pre>",
                    "You migth recognize this as code that raises the number in base to the power in exponent.",
                    "In this code, base is in eax, exponent is in ecx, and result is in edx."
                    ],
      "Code"    :   [ "mov $1, %edx",  //eax is base, ecx is exp, edx is result, ebx is i
                      "mov $0, %ebx",
                      "loopStart:",
                      "cmp %ecx, %ebx",
                      "jge loopEnd",
                      "imul %eax, %edx",
                      "inc %ebx",
                      "jmp loopStart",
                      "loopEnd:",
                    ],
      "Registers":  {"eax": 3, "ecx": 4},

      "Question":   "Which register represents <i>i</i>?",
      "Answer":     "ebx"
    }
  ]
}



TUTORIAL_FLAGS = {
  "Name": "Condition Flags",
  "Pages": [
    {
      "Title"   :   "Flags",
      "Text"    :   [ "Condition flags allow the processor to store state about the previous instructions. This can be very useful for if statements.",
                    "Consider the C code <pre> if(4==4) </pre>. How will the code know whether they're equal? The if statement causes a comparison instruction: cmp. The comparison works by subtracting the first value from the second then setting flags based on the difference.",
                    "While many instructions set flags, we will focus on the cmp statement for this tutorial.",
                    "You will learn 4 flags: Carry Flag (CF), Zero Flag (ZF), Sign Flag (SF), and Overflow Flag (OF)."
                    ],
      "Code"    :   ["mov $4, %eax",
                    "mov $4, %ebx",
                    "cmp %eax, %ebx",
                    ],
      "Question":   "Run the code to the right. Which flag goes on?",
      "Answer"  :   "ZF",
    },
    { 
      "Title"   :   "Zero Flag and Sign Flag",
      "Text"    :   [ "Right, the <b>zero flag</b> went on.  That's because 4 - 4 is 0. The zero flag is good for measuring equality.",
                    "The <b>sign flag</b> tells you the sign of the result.",
                    "Step through the instructions at the right to see how the flags change on the each comparison. Move on when you understand each one.",
                    ],
      "Code"    :   ["cmp $4, $7",
                    "cmp $8, $3",
                    "cmp $2, $2",
                    "cmp $2, $0"
                    ],
    },
    {
      "Title"   :   "Carry Flag and Overflow Flag",
      "Text"    :   ["The <b>overflow flag</b> and <b>carry flag</b> are for very large or very small numbers.",
                    "Remember that with <a href=\"http://en.wikipedia.org/wiki/Two's_complement\">two's complement</a> arithmetic, one bit represents the sign.  When you add two really big numbers, the sign bit might flip and flow over to the negative end of the spectrum.  When this happens, or when a number is so small that it becomes positive, the <b>overflow flag</b> goes on. This flag can be used to check for overflow.",
                    "The <b>carry flag</b> is similar but has a subtle difference.  If you are adding to positive numbers, you sometimes need to carry to the next slot: 50 + 50 = 100.  The first two are two digits, but the sum is three. The x86 we're studying can only hold 32 binary digits.  Sometimes adding two 32-bit numbers results in a 33-bit number. Since x86 can only fit 32 bits, the new one get tossed out and the <b>carry flag</b> goes on.",
                    "Notice the overflow flag has meaning for signed numbers and the carry flag has meaning for unsigned numbers.",
                    "Play around with cmp instructions to see which flags go on.",
                    ],
      "Code"    :   ["cmp %eax, %ecx"],
      "Registers":  {
          "eax"   :   4294967295,
          "ecx"   :   0,
          "edx"   :   -4294967295,
                    },
    }
  ]
}

MOV_TUTORIAL = {
  "Name": "Mov and Addressing",
  "Pages": [
    {
      "Title"   :   "Mov and Addressing",
      "Text"    :   [ "<b>mov src, dest</b>",
                    "The 'mov' instruction is used to copy a source value to a register. Source values can be specified in a number of ways.",
                    "1) Immediate values: <br/>   Source values can be as simple as constant postive integer values preceded by a $.",
                    "<i>Click 'Step' to store 30 in the %eax register.</i>",
                    "2) Register values: <br/>  The source can be a register, and mov will copy that register's value into the destination register.",
                    ],
      "Code"    :   ["mov $30, %eax",
                    "mov $42, %edx",
                    "mov $15, %ecx",
                    "mov %ecx, %ebx",
                    "mov %edx, %ecx",
                    "mov $19, %edx",
                    "mov %ecx, %eax",
                    ],
      "Question":   "What value will %eax hold after these instructions all execute?",
      "Answer"  :   "42",
    },
    { 
      "Title"   :   "Addressing Modes",
      "Text"    :   [ "The source can also be specified using a register to index into memory.",
                    "1) Register R contains a memory address: <br/> <b>mov (R), %eax</b> will copy the value at address in r into %eax.",
                    "2) Displacement from an address: <br/>  <b>mov D(R), %ecx</b> will add D bytes to the address in r before indexing into memory for a source value.",
                    "3) D(Rb,Ri,S): <br/>In this mode, the source value is at the address Reg[Rb]+S*Reg[Ri]+D."
                    ],
      "Code"    :   ["mov $1, %eax",
                    "mov $5, %edx",
                    "mov (%eax), %ebx",
                    "mov 4(%ebx), %ecx",
                    "mov 4(%ecx, %eax, 2), %edx",
                    ],
      "Question":   "What value will %edx hold after all instructions are executed?",
      "Answer"  :   "0",
    }
  ]
}


REG_TUTORIAL = {
  "Name": "What is Assembly?",
  "Pages": [
    {
      "Title"   :   "Registers",
      "Text"    :   ["Deep down, your computer uses what we call <i>Registers</i> as scratch paper.",
                    "(You can see the registers on the right of the page. They have funny names.)",
                    "It uses some simple instructions to move things around on the scratch paper.",
                    "This scratch work is what powers your computer!",
                    "Let's see how these simple instructions work.",
                    ],
      "Code"    :   ["mov $30, %eax",
                    "mov $15, %ecx",
                    "mov %ecx, %ebx",
                    "mov %edx, %ecx",
                    "mov $19, %edx",
                    "mov %ecx, %eax",
                    ],
      "Question":   "What is the name of the first register?",
      "Answer"  :   "eax",
    },
    { 
      "Title"   :   "Moving things around: <i>mov</i>",
      "Text"    :   ["The simplest thing the computer can do is move things around.",
                    "Take a look at the code to the right. Do you see where it says <i>mov $30, %eax</i>?",
                    "Click the 'Play' button to see what this does!",
                    ],
      "Code"    :   ["mov $30, %eax",
                    ],
      "Question":   "What is in %eax after you execute this instruction?",
      "Answer"  :   "30",
    },
    {
      "Title"   :   "Moving Between Registers",
      "Text"    :   ["You can also move things from one register to another.",
                    "Check out the code on the right.",
                    ],
      "Code"    :   [ "mov %eax, %ebx"],
      "Registers":  {"eax": 15},
      "Question":   "What value will %ebx hold after you execute this instruction?",
      "Answer":     "15"
    }
  ]
}
