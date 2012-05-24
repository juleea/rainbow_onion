Tutorials = function() {
  var tutorialFilenames = ['fakename.txt'];
  var allTutorials = [];
  var currTutorialNum = null;
  var currPageNum = 0;
  

  var readTutorials = function() {
    var tutNum = 1;
    for (file in tutorialFilenames) {
      var tut = new Tutorial(file);
      allTutorials.push(tut);
      //here tutorials are 1-indexed...
      var newTutorialListing = createNewListing(tutNum, tut);
      tutNum++;
    }
  }
  
  var createNewListing = function(tutNum, tutorial) {
    var tutId = "tutorial" + tutNum;
    var tutTitle = tutNum + ' - ' + tutorial.getName();
    $('#tutorialNav').append('<li id="'+tutId+'" class="tutorial"><a href="#">'+ tutTitle + '</a></li>');
    var t = this;
    $('#'+tutId).onclick = function() {t.displayTutorial(tutNum)};

  }

  readTutorials();
  
  //tutorialIds are 0-indexed
  this.displayTutorial = function(tutorialId) {    
    if (tutorialId >= allTutorials.length || tutorialId === currTutorialNum) return;
    currPageNum = 0;
    currTutorialNum = tutorialId;
    allTutorials[tutorialId].displayTutorialPageByNumber(0);

  }
  
  this.displayNextPage = function() {
    var currTutorial = allTutorials[currTutorialNum];
    if (currPageNum < currTutorial.numPages() - 1) {
      currPageNum++;
      $('textarea#answerText').val("");
      currTutorial.displayTutorialPageByNumber(currPageNum);
    } else if (currPageNum === currTutorial.numPages() - 1)  {
      currPageNum++;
      currTutorial.displayLastPage();
    } else {
      alert('error in page numbering!');
    }
  }
  
  this.displayPrevPage = function() {
    var currTutorial = allTutorials[currTutorialNum];
    $('#injectCodeButton').show();
    if (currPageNum > 0) {
      currPageNum--;
      $('textarea#answerText').html("");
      currTutorial.displayTutorialPageByNumber(currPageNum);      
    } else {
      alert('error in page numbering!');
    }
  }

  this.injectCode = function() {
    allTutorials[currTutorialNum].injectCode(currPageNum);
  }
  
  this.displayAnswer = function() {
    allTutorials[currTutorialNum].displayAnswer(currPageNum);
  }
  
  this.numTutorials = function() {
    return allTutorials.length;
  }
  
  
  
}

Tutorials.prototype.get



Tutorial = function(file) {
  var filename = file;
  var tutorialName = "";
  var tutorialPages = [];
  
  this.init = function() {
  
  //TODO: make this actually read in the file
  
    tutorialName = "mov and addressing"
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
        
    

  }
  
  this.getName = function() {
    return tutorialName;
  }
  
  this.displayTutorialPageByNumber = function(pageNumber) {
    this.displayTutorialPage (tutorialPages[pageNumber], pageNumber);
  }

  
  this.displayAnswer = function (pageNumber) {
    $('#answer').html(tutorialPages[pageNumber].getAnswer());
  }

  this.injectCode = function (pageNumber) {
    var page = tutorialPages[pageNumber];
    if (page.instructionsAsString() !=null) {
      $('textarea#mainText').val(page.instructionsAsString());
    }
  }

  this.numPages = function() {
    return tutorialPages.length;
  }
  
  this.init();
}

Page = function() {
  //if these values are null when the page is displayed, the dom element will be unchanged
  var subtitle = null;
  var text = "";
  var question = ""; // default is to remove the question and answer box
  var answer = "";
  var code = null; // array of strings of code if new code should be displayed
  
  this.setSubtitle = function(subt) {
    subtitle = subt;
  }
  
  this.addLine = function(str) {
    if (text === "") {
      this.addText(str);
    } else {
      this.addText("<br/><br/>" + str);
    }
  }
  
  this.addText = function(str) {
    text = text + "  " + str;
  }

  this.setQuestion = function(str) {
    question = str;
  }
  
  this.setAnswer = function(ans) {
    answer = ans;
  }
  
  this.addInstruction = function(inst) {
    if (code == null) code = [];
    code.push(inst);
  }
  
  this.getSubtitle = function() {
    return subtitle;
  }
  
  this.getText = function() {
    return text;
  }
  
  this.getQuestion = function() {
    return question;
  }
  
  this.getAnswer = function() {
    return answer;
  }
  
  this.instructionsAsString = function() {
    if (code == null) return null;
    var str = "";
    for (var i=0; i<code.length; i++) {
      str = str + code[i] + "\n";
    }
    return str;
  }
}

Tutorial.prototype.displayTutorialPage = function(page, pagenum) {
  if (page == null) {
    alert("error: page is null");
  }
  if (page.getSubtitle() != null) {
    $('#tutorialPageTitle').html(page.getSubtitle());
  }
  
  if (page.getText() != null) {
    $('#tutorialPageContent').html(page.getText());
  }
  
  if (page.getQuestion() == null || page.getQuestion() == "") {
    $('#questionAnswer').hide();
    $('#answerButton').hide();
  } else {
    $('#questionAnswer').show();
    $('#answerButton').show();
    $('#question').html(page.getQuestion());
    $('#answer').html("");      
  }
  
  if (pagenum != null) {
    $('#nextPageButton').show();
    $('#prevPageButton').show();
    if(pagenum != 0) $('#prevPageButton').show();
    else $('#prevPageButton').hide();
  } else {
    pagenum = this.numPages();
    $('#nextPageButton').hide();
  }
  var totalPages = this.numPages() + 1;
  $('#pageNumber').html(pagenum+1 + "/" + totalPages);

  if (page.instructionsAsString() !=null) {
    $('textarea#mainText').val(page.instructionsAsString());
  }    
}

Tutorial.prototype.lastPage = new Page();
Tutorial.prototype.lastPage.setSubtitle("Congratulations");
Tutorial.prototype.lastPage.addLine("You've completed this activity!")
Tutorial.prototype.displayLastPage = function() {
  this.displayTutorialPage(this.lastPage, null);
  $('#injectCodeButton').hide();
}



