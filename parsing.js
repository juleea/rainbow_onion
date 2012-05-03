/*
Parameters class
*/

/*
Instruction class (holds instruction, parameters, execute functions */
*/

//Breaks the line up, figures out which instruction should parse it
//Returns true iff this is a valid instruction
function parseLine(line) {
    var firstSpace = line.indexOf(" ");
    if (firstSpace == -1) {
        // possibly a label, or an error
        alert("invalid instruction!");
        return false;
    } else {
        // instruction parsing
        var instruction = line.substring(0, firstSpace);
        // TODO: isValidInstruction
        if (instruction == "mov") {
            alert("mov instruction typed!");
        }
        return true;
    }
}

// TODO: parseParameters
