Tutorials = function() {
  var tutorialFilenames = [whatIsAssembly];
  var allTutorials = [];
  var currTutorialNum = null;
  var currPageNum = 0;
  

  var readTutorials = function() {
    var tutNum = 1;
    for (var i = 0; i < tutorialFilenames.length; i++) {
      var file = tutorialFilenames[i];
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
    code.stop();
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
    code.stop();
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
  
  this.displayAnswer = function(userAnswer) {
    allTutorials[currTutorialNum].displayAnswer(currPageNum, userAnswer);
  }
  
  this.numTutorials = function() {
    return allTutorials.length;
  }
  
  
  
}

Tutorials.prototype.get


Tutorial = function(initFn) {
  //var filename = file;
  var tutorialName = "";

  
  this.getName = function() {
    return tutorialName;
  }
  
  this.displayTutorialPageByNumber = function(pageNumber) {
    this.displayTutorialPage (tutorialPages[pageNumber], pageNumber);
  }

  
  this.displayAnswer = function (pageNumber, userAnswer) {
    var responseText = "";
    if(tutorialPages[pageNumber].getAnswer().toLowerCase()==userAnswer.toLowerCase()) {
      responseText = "Nice work! Click the arrow to continue.";
      $("#nextPageButton").attr("disabled", false);
      tutorialPages[pageNumber].setAnswered();
    } else {
      responseText = "Try again";
    }
    $('#answer').html(responseText);
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
  
  var tutorialPages = initFn(tutorialName);
}

Page = function() {
  //if these values are null when the page is displayed, the dom element will be unchanged
  var subtitle = null;
  var text = "";
  var question = ""; // default is to remove the question and answer box
  var answer = "";
  var code = null; // array of strings of code if new code should be displayed
  var answered = false; //Has the user correctly answered this question?

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

  this.setAnswered = function() {
    answered = true;
  }
  
  this.answered = function() {
    return answered;
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
    //Don't disable if they previously answered the question
    $("#nextPageButton").attr("disabled", !page.answered());
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



