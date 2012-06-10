Mov.form = "mov Src, Dest"
Mov.help = "Dest = Src"

Add.form = "add Src, Dest"
Add.help = "Dest = Dest + Src"

Add.form = "add Src, Dest"
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
Push.help = "Put contents of Mem[%esp] in Src and esp+=4"