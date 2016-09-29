
//seed number for number of words to be made!


function wordGen(seed, maxLength, minLength){
  //create loading screen;
  var loadingscreen = document.getElementById("loadicon");
  var div = document.getElementsByTagName("TEXTAREA");
  var main = [];
  var word = '';
  if(/*seed <= 1000 &&*/ seed > 0 && maxLength <= 15 && maxLength > 0) {
    //most common vowels in english
    seed = Math.floor(seed); // error handling
    maxLength = Math.floor(maxLength); //error handling
    minLength = Math.floor(minLength);//error handling
    div[0].innerHTML =main;

    var comCons = ['n', 's', 'h', 'r', 't'];
    var mostCon = 't'; // most common letter (idealy should print out more)
    var cons = ['d','l','c', 'm', 'w', 'f', 'g','y','p']; //average letters
    var unCons = ['b','v','k','j','x','q','z']; //uncommon letters <2%
    var mostVow = 'e' //most common vowel
    var comVow = ['e','a','i','o']; //common vowels
    var unVow = 'u'; //most uncommon vowel

    for(var i = 0; i < seed; i++) {
    loadingscreen.style.visibility = "visible";
     var numConsonants;
     var numVowels;
     var wordLength;
     ///how long the word will be
     if(minLength > maxLength) { //error handle
        minLength = undefined;
     }
     if(minLength == undefined) {
       wordLength = Math.floor((Math.random())*maxLength) + 1;

     } else {
        do {
            wordLength = Math.floor((Math.random())*maxLength) + 1;
          } while(wordLength < minLength);
     }

    //decide how any vowels and consonants will be in the word
      while ((numConsonants + numVowels) != wordLength) {
         numConsonants = Math.floor((Math.random())*wordLength);
         //coefficient for amount of vowels should be in the word (ie no more then 2/3)
         numVowels = Math.floor((Math.random())*5); //prevent a word being all vowels and or all consonants
         if (wordLength > 1){
           if (numConsonants === 0 || numVowels === 0) {
              numConsonants = -1;
              numVowels = -1;
           }
         }

      }

        var chosenConsonants = [];
        var chosenVowels = [];
        //fill arrays of vowels and consonants with random characters totalling to numConsonants
        //and numVowels. The consonants and vowels are chosen by priority of how common
        //they appear in english language
        //all numbers were mathmatically deduced by values found at
        //https://en.wikipedia.org/wiki/Letter_frequency*********
        for(var u = 0; u < numConsonants; u++) {
          var whichLet = Math.random();
          var currentLetter;
          if(whichLet > .845) {
            currentLetter = mostCon;
          } else if(whichLet <= (.845) && whichLet > .399) {
            currentLetter = comCons[Math.floor((Math.random())*comCons.length)];
          } else if(whichLet <= .399 && whichLet > .02) {
            currentLetter = cons[Math.floor((Math.random())*cons.length)];
          } else if(whichLet <= .02) {
            currentLetter = unCons[Math.floor((Math.random())*unCons.length)];
          }
          chosenConsonants.push(currentLetter);
        }
        for(var uu = 0; uu < numVowels; uu++) {
          var whichVow = Math.random();
          var currentVowel;
           if(whichVow > .8) {
            currentVowel = mostVow;
          } else if(whichVow <= .8 && whichVow > .2){
            currentVowel = comVow[Math.floor((Math.random())*comVow.length)];
          } else if(whichVow <= .2) {
            currentVowel = unVow[Math.floor((Math.random())*unVow.length)];
          }
          chosenVowels.push(currentVowel);
        }

        while(chosenConsonants.length < wordLength) {
          //pick random vowel out of chosen list
          splicedVowel = chosenVowels[(Math.floor(Math.random())*chosenVowels.length )];
          //remove that element from the list so it cannot be picked again
          var index = chosenVowels.indexOf(splicedVowel);
          chosenVowels.splice(index, 1);
          //find position by random for vowel to be inserted dynamically as chosenConsonats
          //array grows
          randomInsert = Math.floor((Math.random())*(chosenConsonants.length+1));
          chosenConsonants.splice(randomInsert, 0 , splicedVowel);
          }
          //join array into single string and push it to main array
        word = chosenConsonants.join('');
        main.push(word);
        word = '';
    }
    for (var ind in main) {

      div[0].innerHTML+=(" " + main[ind]);
      /*if((ind % 50) === 0 && ind != 0) {
        div[0].innerHTML += "<br>";
      }*/

    }
    loadingscreen.style.visibility = "hidden";
    console.log(main);
  } else { //handle the incorrect inputs if any
    var phrase = [
      ("Your seed number is: " + seed + ", and your maximum size of " + maxLength + ", is out of range."),
      ("You did not enter a good seed number and your maximum size is: " + maxLength + "."),
      ("Your inputs are no good."),
      ("Your seed number is: " + seed + ", but you did not enter a good maximum size.")];

    var rightSeed = false;
    var rightLength = false;

    if(seed < 1001 && seed > 0) {
      rightSeed = true;
    }
    if(maxLength <= 15 && maxLength > 0) {
      rightLength = true;
    }


    if(rightLength === false && rightSeed === false) {
      div[0].innerHTML = phrase[2];
    } else if(rightSeed === false && rightLength === true) {
      div[0].innerHTML = phrase[1];
    } else if(rightLength === false && rightSeed === true) {
      div[0].innerHTML = phrase[3]
    }else {
      div[0].innerHTML = phrase[0];
    }
    div[0].innerHTML += " Please type a seed that is between 1 and 1000 and a max size of no more than 15!";
  }
}

//enter key calls wordgen
window.onkey = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) { //enter
        wordGen(document.getElementById("seed").value, document.getElementById('max').value, document.getElementById('min').value);
    }
};

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
      stringsToMatch[1].innerHTML += "matched " +array[0] +" at index " + array.index + /*" within " + substring +*/ "\n" ;
      }
      if(array === null) {
        stringsToMatch[1].innerHTML += "No more matches found."
      }
  } else {
    stringsToMatch[1].innerHTML += regx.exec(stringToTest);
  }
}
