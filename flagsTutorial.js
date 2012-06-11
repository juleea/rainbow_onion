
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

JMP_TUTORIAL = {
  "Name": "Skipping around in code: the jump instructions",
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
      "Question":   "What value is in %eax after the code runs?",
      "Answer"  :   "0",
      "Registers":  {"eax": 10, "ebx" : 10, "ecx": 0},//If you want to specify any starting register values
                                            // Do so here. Remove this line if not.
    },
    { 
      "Title"   :   "Comparison-jump pattern",
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
      "Title"   :   "For loop with cmp and jumps",
      "Text"    :   ["Let's see how you can make a for loop with assembly. Consider the following C code:",
                    "<pre>int result = 1; for(int i = 0; i < exponent; i++) {\n\tresult*=base;\n}</pre>",
                    "You make recognize this as code that raises the number in base to the power in exponent.",
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
                    "Consider the C code <b> 4=4 </b> The comparison works by subtracting the first value from the second then setting flags based on the difference.",
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
                    "Remember that with <a href=\"http://en.wikipedia.org/wiki/Two's_complement\">two's compliment</a> arithmatic, one bit represents the sign.  When you add two really big numbers, the sign bit might flip and flow over to the negative end of the spectrum.  When this happens, or when a number is so small that it becomes positive, the <b>overflow flag</b> goes on. This flag can be used to check for overflow.",
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
      "Question":   "What value will %eax hold after this code is executed?",
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
      "Question":   "What value will be in %edx after you run the code?",
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
      "Question":   "What is in %eax after you run the code?",
      "Answer"  :   "30",
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
