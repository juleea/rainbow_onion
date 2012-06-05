movAndAddressing = function(tutorialName) {
  
  //TODO: make this actually read in the file
    var tutorialPages = [];
    var fakePage1 = new Page();
    fakePage1.setSubtitle ("Mov and Addressing");
    fakePage1.addLine("<b>mov src, dest</b>")
    fakePage1.addLine("The 'mov' instruction is used to copy a source value to a register. Source values can be specified in a number of ways.");
    fakePage1.addLine("1) Immediate values: <br/>   Source values can be as simple as constant integer values preceded by a $.");
    fakePage1.addLine("<i>Click 'Step' to store 30 in the %eax register.</i>");
    fakePage1.addLine("2) Register values: <br/>  The source can be a register, and mov will copy that register's value into the destination register.");

    fakePage1.setQuestion("What value will %eax hold after this code is executed?");
    fakePage1.setAnswer("42");
    fakePage1.addInstruction("mov $30, %eax");
    fakePage1.addInstruction(""); // TODO: add breakpoint
    fakePage1.addInstruction("mov $42, %edx");
    fakePage1.addInstruction("mov $15, %ecx");
    fakePage1.addInstruction("mov %ecx, %ebx");
    fakePage1.addInstruction("mov %edx, %ecx");
    fakePage1.addInstruction("mov $19, %edx");
    fakePage1.addInstruction("mov %ecx, %eax");        

    
    var fakePage3 = new Page();
    fakePage3.setSubtitle ("Addressing Modes");
    fakePage3.addLine("The source can also be specified using a register to index into memory.");
    fakePage3.addLine("1) Register R contains a memory address: <br/> <b>mov (R), %eax</b> will copy the value at address in r into %eax.");
    fakePage3.addLine("2) Displacement from an address: <br/>  <b>mov D(R), %ecx</b> will add D bytes to the address in r before indexing into memory for a source value.");
    fakePage3.addLine("3) D(Rb,Ri,S): <br/>In this mode, the source value is at the address Reg[Rb]+S*Reg[Ri]+D.");

    fakePage3.addInstruction("mov $1, %eax");
    fakePage3.addInstruction("mov $5, %edx");
    fakePage3.addInstruction("mov (%eax), %ebx");
    fakePage3.addInstruction("mov 4(%ebx), %ecx");
    fakePage3.addInstruction("mov 4(%ecx, %eax, 2), %edx");
    fakePage3.setQuestion ("What value will be in %edx?");
    fakePage3.setAnswer ("0");


    tutorialPages.push(fakePage1); 
//    tutorialPages.push(fakePage2);
    tutorialPages.push(fakePage3);
    tutorialPages.push(Tutorial.lastPage);
    console.log(Tutorial.lastPage);

    return tutorialPages;
}
movAndAddressing.tutorialName = "Mov and Addressing";

whatIsAssembly = function(tutorialName) {
    var tutorialPages = [];
    var fakePage1 = new Page();
    fakePage1.setSubtitle ("Registers");
    fakePage1.addLine("<b>mov src, dest</b>")
    fakePage1.addLine("Deep down, your computer uses what we call <i>Registers</i> as scratch paper.");
    fakePage1.addLine("(You can see the registers on the right of the page. They have funny names.)");
    fakePage1.addLine("It uses some simple instructions to move things around on the scratch paper.");
    fakePage1.addLine("This scratch work is what powers your computer!");
    fakePage1.addLine("Let's see how these simple instructions work.");

    fakePage1.setQuestion("What is the name of the first register?");
    fakePage1.setAnswer("eax");


    var regs = new Registers();
    regs.setContents('eax', 10);
    fakePage1.setRegisters(regs);

    var mem = new Memory();
    mem.setContents(0, goog.math.Integer.fromNumber(30), 4);
    fakePage1.setMemory(mem);


    var fakePage2 = new Page();
    fakePage2.setSubtitle ("Moving things around: <i>mov</i>");
    fakePage2.addLine("The simplest thing the computer can do is move things around.");
    fakePage2.addLine("Take a look at the code to the right. Do you see where it says <i>mov $30, %eax</i>?");
    fakePage2.addLine("Click the run button to see what this does!");

    fakePage2.addInstruction("mov $30, %eax");
    fakePage2.setQuestion ("What value is in %eax after you run the code?");
    fakePage2.setAnswer ("30");
    
    var regs2 = new Registers();
    regs.setContents('eax', 13);
    fakePage1.setRegisters(regs);

    var fakePage3 = new Page();
    fakePage3.setSubtitle ("Moving Between Registers");
    fakePage3.addLine("You can also move things from one register to another.");
    fakePage3.addLine("Check out the code on the right.");
    fakePage3.addInstruction("mov $15, %eax");
    fakePage3.addInstruction("mov %eax, %ebx");
    fakePage3.setQuestion ("What value is in %ebx after you run the code?");
    fakePage3.setAnswer ("15");


    tutorialPages.push(fakePage1); 
    tutorialPages.push(fakePage2);
    tutorialPages.push(fakePage3);
    tutorialPages.push(Tutorial.prototype.lastPage);
    console.log(Tutorial.prototype.lastPage);
    return tutorialPages;
}
whatIsAssembly.tutorialName = "What is Assembly?"
