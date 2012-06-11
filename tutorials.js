Tutorials = function() {
  //INSERT NEW TUTORIAL NAMES HERE
  var tutorialFilenames = [REG_TUTORIAL, MOV_TUTORIAL, TUTORIAL_FLAGS, JMP_TUTORIAL, ARITHMETIC_TUTORIAL, LOGICAL_TUTORIAL];
  var allTutorials = [];
  var currTutorialNum = null;
  var currPageNum = 0;
  var t = this;
  

  var readTutorials = function() {
    var tutNum = 0;
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
    var tutTitle = (tutNum+1) + ' - ' + tutorial.getName();
    $('#tutorialNav').append('<li id="'+tutId+'" class="tutorial" ><a href="#">'+ tutTitle + '</a></li>');
    $('#'+tutId).click(function() {t.displayTutorial(tutNum)});
  }

  readTutorials();
  
  //tutorialIds are 0-indexed
  this.displayTutorial = function(tutorialId) {   
    console.log("display tutorial");
    if (tutorialId >= allTutorials.length || tutorialId === currTutorialNum) return;
    currPageNum = 0;
    currTutorialNum = tutorialId;
    this.createPaginationBtns(tutorialId, 0);
    var currPage = allTutorials[tutorialId].displayTutorialPageByNumber(0);
  }

  this.createPaginationBtns = function(tutorialId, activePageNum) {
    $('#tutorialPageNav').empty();
    $('#tutorialPageNav').append('<li id="prevPage" class="pageNav"><a href="#"> < </a></li>');
    $('#prevPage').click(t.displayPrevPage);

    var numPages = allTutorials[tutorialId].numPages();
    for (var pageNum=0; pageNum<numPages; pageNum++) {
      var dispNum = pageNum + 1;
      $('#tutorialPageNav').append('<li id="page'+pageNum+'" class="pageNav"> <a href="#">'+ dispNum + '</a></li>');
      if (pageNum === activePageNum) {
        $('#page'+pageNum).addClass('active');
      } else {
        $('#page'+pageNum).addClass('disabled');
      }
      $('#page'+pageNum).click(
        (function(pn) { return function() { 
          allTutorials[tutorialId].displayTutorialPageByNumber(pn); 
          currPageNum = pn; 
          }})(pageNum));
    }
    $('#tutorialPageNav').append('<li id="nextPage" class="pageNav"><a href="#"> > </a></li>');
    $('#nextPage').click(t.displayNextPage);
  }

  
  this.displayNextPage = function() {
    var currTutorial = allTutorials[currTutorialNum];
    if (currTutorial.isValidTutorialPage(currPageNum+1)) {
      //code.stop();
      currPageNum++;
      currTutorial.displayTutorialPageByNumber(currPageNum);
    }
  }

  this.refresh = function() {
    var currTutorial = allTutorials[currTutorialNum];
    var page = currTutorial.getPage(currPageNum);
    code.stop();
    $('#answerText').val("");
      //update the register values associated with the page
    if (page.getRegisters() != null) {
      console.log("refresh registers");
      registers.setAll(page.getRegisters());
      updateRegs();
    }

    //update the memory values associated with the page (if they exist)
    if (page.getMemory() != null) {
      console.log("refresh memory");
      memory.setAll(page.getMemory());
      createMemory();
    } 
    flags.clearAll();
    updateDisplay();
    //currTutorial.displayTutorialPageByNumber(currPageNum);
  }


  
  this.displayPrevPage = function() {
    var currTutorial = allTutorials[currTutorialNum];
    code.stop();
    if (currTutorial.isValidTutorialPage(currPageNum-1)) {
      currPageNum--;
     // code.stop();
      currTutorial.displayTutorialPageByNumber(currPageNum);      
    } else {
      //cannot go to a previous page
    }
    console.log(currPageNum);
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

Tutorial = function(jsonTutorial) {
  var tutorialName = jsonTutorial.Name;
  var tutorialPages = [];

  for(var i = 0; i < jsonTutorial.Pages.length; i++) {
    tutorialPages.push(new Page(jsonTutorial.Pages[i]));
  }
  tutorialPages.push(Tutorial.prototype.lastPage);
  this.getName = function() {
    return tutorialName;
  }

  this.setName = function(name) {
    this.tutorialName = name;
  }

  this.setPages = function (pages) {
    tutorialPages = pages;
  }
  
  this.displayTutorialPageByNumber = function(pageNumber) {
    this.displayTutorialPage (tutorialPages[pageNumber], pageNumber);
  }

  //page numbers are 0-indexed
  this.isValidTutorialPage = function(pageNum) {
    return pageNum >=0 && pageNum < tutorialPages.length;
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

  this.pageAnswered = function(pageNumber) {
    return tutorialPages[pageNumber].answered();
  }

  this.getPage = function(index) {
    return tutorialPages[index];
  }
  
}

Page = function(jsonPage) {
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

  this.setRegisters = function (regs) {
    registers = regs;
  }

  this.getRegisters = function() {
    return registers;
  }

//TODO: delete??
  this.setMemory = function (mem) {
    memory = mem;
  }

  this.getMemory = function () {
    return memory;
  }

  this.instructionsAsString = function() {
    if (code == null) return null;
    var str = "";
    for (var i=0; i<code.length; i++) {
      str = str + code[i] + "\n";
    }
    return str;
  }
    //if these values are null when the page is displayed, the dom element will be unchanged
  var subtitle = jsonPage.Title || null;
  var registers = null;    
  if(jsonPage.Registers) {
    registers = new Registers();
    for(var reg in jsonPage.Registers) {
      registers.setContents(reg, jsonPage.Registers[reg], true);
    }
  }

  var memory = null;
  //console.log("subtitle = " + subtitle)
  //console.log("jsonPage.Memory = " + jsonPage.Memory)
  if(jsonPage.Memory) {

    memory = new Memory();
    for(var mem in jsonPage.Memory) {
      var val = goog.math.Integer.fromNumber(jsonPage.Memory[mem]);
      memory.setContents(Number(mem), val);
    }
    //console.log(memory.getAll());
  }

  var text = "";
  if(jsonPage.Text) {
    for(var i = 0; i < jsonPage.Text.length; i++)
      this.addLine(jsonPage.Text[i]);
  }
  var question = jsonPage.Question || ""; // default is to remove the question and answer box
  var answer = jsonPage.Answer || "";
  var code = null; // array of strings of code if new code should be displayed
  if(jsonPage.Code) {
    for(var i = 0; i < jsonPage.Code.length; i++) {
      this.addInstruction(jsonPage.Code[i]);
    }
  }
  var answered = false; //Has the user cor
}

Tutorial.prototype.displayTutorialPage = function(page, pagenum) {
  //check for null error
  if (page == null) {
    alert("error: page is null. page num = " +pagenum);
    return;
  }

  //clear answer box
  $('#answerText').val("");

  //set the page subtitle.
  if (page.getSubtitle() != null) {
    $('#tutorialPageTitle').html(page.getSubtitle());
  } else {
    $('#tutorialPageTitle').html("");
  }
  
  //set page main text 
  if (page.getText() != null) {
    $('#tutorialPageContent').html(page.getText());
  } else {
    $('#tutorialPageContent').html("");
  }
  
  //hide the question/answer features if there is no question
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
    $('#answerText').val(""); //clear answer box
    
  }
  
  //show all buttons...
  $('#nextPageButton').show();
  $('#prevPageButton').show();
  $('#injectCodeButton').show();

  var totalPages = this.numPages();

  for (var i = 0; i < totalPages; i++) {
    $('#page'+i).removeClass('active');
    $('#page'+i).removeClass('disabled');    
    if (i === pagenum) {
      $('#page'+pagenum).addClass('active');
    } else {
      $('#page'+i).addClass('disabled');

    }
  }
 

  //selectively hide buttons...
  if (pagenum === 0)  $('#prevPageButton').hide();   //hide "back" button on first page
  if (pagenum === this.numPages() -1) {
    $('#nextPageButton').hide();  //hide "next" button on last page
    $('#injectCodeButton').hide();  //hide "reset" button on last page
  }

  $('#pageNumber').html(pagenum+1 + "/" + totalPages);

  // update the code in the main textarea
  if (page.instructionsAsString() !=null) {
    $('textarea#mainText').val(page.instructionsAsString());
  }

  //update the register values associated with the page
  if (page.getRegisters() != null) {
    registers.setAll(page.getRegisters());
    updateRegs();
  } else {
    //TODO: should we set to some default here or in the tutorial creater/file reader?
  }

  //update the memory values associated with the page (if they exist)
  if (page.getMemory() != null) {
    memory.setAll(page.getMemory());
    createMemory();
  } else {
    //TODO: should we set to some default here or in the tutorial creater/file reader?
  }

  flags.clearAll();
}

Tutorial.prototype.lastPage = new Page(
  {
    "Title":"Congratulations",
    "Text": ["You've completed this activity!"],
  }
);
