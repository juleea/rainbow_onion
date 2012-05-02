//jquery for onload
$(function() {
  memory = new Memory();

  //lISTENERS
  $('textarea#mainText').keyup(function(e) {
    if(e.keyCode == 13){
      newLine = getLastLine();
      if(!parseLine(newLine)) {
        //TODO: display error message--oh but parseLine knows the error...
        //maybe it will return that instead of true eh
      }
    }
  });

  $('button#runButton').click(runButton);

});

//TODO: need some way to discard blank lines
function getLastLine() {
  var text = $('textarea#mainText').val();
  if (text == '') return '';
  var lines = text.split('/n');
  return lines[lines.length - 1];
}

function runButton() {
  alert($('textarea#mainText').val());
}

function textAreaEnter() {

}

$('textarea#mainText').keyup(function() {
  console.log('Handler for .keyup() called.');
});