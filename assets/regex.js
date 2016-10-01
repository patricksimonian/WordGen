

function matcher(expression, modifier) {
  var stringsToMatch = document.getElementsByTagName("TEXTAREA");
  var stringToTest = stringsToMatch[0].innerHTML;
  stringsToMatch[1].innerHTML = "";
  var regx = RegExp(expression, modifier);

  stringsToMatch[1].innerHTML = "your expression is: " + regx.toString() + "\n";
    var array = null;
    if(modifier) {
      while ((array = regx.exec(stringToTest)) != null) {
      //var substring = stringToTest.substring(array.index, regx.lastIndex);
      stringsToMatch[1].innerHTML += "matched \"" +array[0] +"\" at index " + array.index + /*" within " + substring +*/ "\n" ;
      }
      if(array === null) {
        stringsToMatch[1].innerHTML += "No more matches found."
      }
  } else {
    stringsToMatch[1].innerHTML += "matched \"" + regx.exec(stringToTest) + "\" at index "+ regx.exec(stringToTest).index;
  }
}
