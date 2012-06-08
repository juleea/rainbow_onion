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