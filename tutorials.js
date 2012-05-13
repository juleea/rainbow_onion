Tutorials = function() {

  var tutorialFilenames = ['fakename.txt'];
  var allTutorials = [];
  var currTutorialNum = null;
  var currPageNum = 0;
  
  var readTutorials = function() {
    for (file in tutorialFilenames) {
      allTutorials.push(new Tutorial(file));  
    }
  }
  
  readTutorials();
  
  this.displayTutorial = function(tutorialId) {    
    if (tutorialId >= allTutorials.length || tutorialId == currTutorialNum) return;
    currPageNum = 0;
    currTutorialNum = tutorialId;
    allTutorials[tutorialId].displayTutorialPageByNumber(0);

  }
  
  this.displayNextPage = function(tutorialId) {
    var currTutorial = allTutorials[currTutorialNum];
    if (currPageNum < currTutorial.numPages() - 1) {
      currPageNum++;
      allTutorials[currTutorialNum].displayPage(currPageNum);
    } else if (currPageNum == currTutorial.numPages())  {
      displayLastPage();
    } else {
      alert('error in page numbering!');
    }
  }
  
  this.displayAnswer = function() {
    allTutorials[currTutorialNum].displayAnswer(currPageNum);
  }
  
  this.numTutorials = function() {
    return allTutorials.length;
  }
  
}


Tutorial = function(file) {
  var filename = file;
  var tutorialName = "";
  var tutorialPages = [];
  
  this.init = function() {
  
  //TODO: make this actually read in the file
  
    tutorialName = "fake tutorial"
    var fakePage1 = new Page();
    fakePage1.setSubtitle ("page1 of myFakeTutorial");
    fakePage1.setText("page1 content");
    fakePage1.setQuestion("Fill in the blank. Hello, _______.");
    fakePage1.setAnswer("world");
    fakePage1.addInstruction("mov 30, %eax")
    fakePage1.addInstruction("mov %eax, %ecx")
    
    var fakePage2 = new Page();
    fakePage2.setSubtitle("page2 of myFakeTutorial");
    fakePage2.setText("page2 content. there should be no question/answer, and the the code shouldn't change");
    
    var fakePage3 = new Page();
    fakePage3.setSubtitle ("page3 of myFakeTutorial");
    fakePage3.setText ("page3 content. adding new assembly code to the text area!");
    fakePage3.setQuestion ("What year is it?");
    fakePage3.setAnswer ("2012");
    fakePage3.addInstruction("mov 30, %eax");
    fakePage3.addInstruction("mov %eax, %ecx");
    
    tutorialPages.push(fakePage1); 
    tutorialPages.push(fakePage2);
    tutorialPages.push(fakePage3);
        
  }
  
  this.displayTutorialPageByNumber = function(pageNumber) {
    this.displayTutorialPage (tutorialPages[pageNumber]);
  }

  
  this.displayAnswer = function (pageNumber) {
    $('#answer').html(tutorialPages[pageNumber].getAnswer());
  }

  this.numPages = function() {
    return tutorialPages.length;
  }
  
  this.init();
}

Page = function() {
  //if these values are null when the page is displayed, the dom element will be unchanged
  var subtitle = null;
  var text = null;
  var question = ""; // default is to remove the question and answer box
  var answer = "";
  var code = null; // array of strings of code if new code should be displayed
  
  this.setSubtitle = function(subt) {
    subtitle = subt;
  }
  
  this.setText = function(str) {
    text = str;
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
    return "instructionsAsString() is broken";
    var str = "";
    for (line in code) {
      str = str + line + "\n";
    }
    return str;
  }
}



Tutorial.prototype.displayTutorialPage = function(page) {
  if (page.getSubtitle() != null) {
    $('#tutorialPageTitle').html(page.getSubtitle());
  }
  
  if (page.getText() != null) {
    $('#tutorialPageContent').html(page.getText());
  }
  
  if (page.getQuestion() == null || page.getQuestion() == "") {
    $('#questionAnswer').hide();
  } else {
    $('#questionAnswer').show();
    $('#question').html(page.getQuestion());
    $('#answer').html("");      
  }

  if (page.instructionsAsString() !=null) {
    $('textarea#mainText').html(page.instructionsAsString());
  }    
}

Tutorial.prototype.lastPage = new Page();
Tutorial.prototype.lastPage.setSubtitle("Congratulations");
Tutorial.prototype.lastPage.setText("You've completed this activity!")
Tutorial.prototype.displayLastPage = function() {
  this.displayTutorialPage(this.lastPage);
}


