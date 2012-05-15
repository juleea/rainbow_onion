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
      var tutId = "tutorial" + tutNum;
      var tutTitle = tutNum + ' - ' + tut.getName();
      $('#tutorialNav').append('<li id="'+tutId+'" class="tutorial"><a href="#">'+ tutTitle + '</a></li>');
      tutNum++;
    }
  }
  
  readTutorials();
  
  this.displayTutorial = function(tutorialId) {    
    if (tutorialId >= allTutorials.length || tutorialId == currTutorialNum) return;
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
    } else if (currPageNum == currTutorial.numPages() - 1)  {
      currPageNum++;
      currTutorial.displayLastPage();
    } else {
      alert('error in page numbering!');
    }
  }
  
  this.displayPrevPage = function() {
    var currTutorial = allTutorials[currTutorialNum];
    if (currPageNum > 0) {
      currPageNum--;
      $('textarea#answerText').html("");
      currTutorial.displayTutorialPageByNumber(currPageNum);      
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
    fakePage1.setSubtitle ("Welcome to myFakeTutorial");
    fakePage1.setText("This tutorial is about nothing in particular.");
    fakePage1.setQuestion("Fill in the blank. Hello, _______.");
    fakePage1.setAnswer("world");
    fakePage1.addInstruction("mov $30, %eax");
    fakePage1.addInstruction("mov %eax, %ecx");
    fakePage1.addInstruction("mov %ecx, %ecx");
    fakePage1.addInstruction("mov %eax, %ecx");
    
    var fakePage2 = new Page();
    fakePage2.setSubtitle("myFakeTutorial");
    fakePage2.setText("Note there should be no question/answer area, and the the code shouldn't change");
    
    var fakePage3 = new Page();
    fakePage3.setSubtitle ("myFakeTutorial");
    fakePage3.setText ("new assembly code to the text area!");
    fakePage3.setQuestion ("What value will be in %ebp?");
    fakePage3.setAnswer ("15");
    fakePage3.addInstruction("mov $15, %eax");
    fakePage3.addInstruction("mov %eax, %ebp");
    
    tutorialPages.push(fakePage1); 
    tutorialPages.push(fakePage2);
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
  } else {
    $('#questionAnswer').show();
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
Tutorial.prototype.lastPage.setText("You've completed this activity!")
Tutorial.prototype.displayLastPage = function() {
  this.displayTutorialPage(this.lastPage, null);
}


