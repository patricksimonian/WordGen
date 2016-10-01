


    //+++++++++++++++++WORD GEN+++++++++++++++++++++++++++
    // seed: number of words desired for generation
    // useCommonBook: boolean passed to pull values from CommonBook object
    // ratioOfVowels: if desired, how many vowels in general do you want inserted into word
    // useNumbers and use Symbols: boolean
    // capsType: can be all capitals, some capitals, or none

  //if building words completly by random but with some legibality to it
  //ie unreadable words such as "rtpqrs" should not be generated as much as words
  //like "yulops"
  var letterBook = {

    //weight //letter //
    zero: ['b', 'j','k','v','x','q','z' ],
    one: ['d','l','c','m','w','f','g','y','p'],
    two: ['n','s','h','r','t']
  }
  var vowelBook = {
      zero: 'u',
      one: ['a','i','o'],
      two: 'e'
  }
  ////////////////////////////////
  //common 2, 3 and suffixes that may be added to words for greater legibality
  //can be expanded for prefixes and other common combinations of letters
 var commonBook = {
      twoletter: ['et', 're', 'ph', 'io', 'er', 'th','sh', 'ie', 'ei', 'ou','ed','le'],
      threeletter: ['eau', 'ier', 'eir', 'ein', 'ien','ear', 'eer', 'ion'],
      end: ['end', 'ing', 'eet', 'ert', 'ard', 'age', 'ly', 'ion']

  }
  var symbolBook = {
    regularSymbols: ["#", "@", "!", "$", "%", "&", "?", ":", ";", "~"]
  }
  //grammarBook = {}


function bigFunction() {
  var seed = $('#seed').val();
  var max = $('#max').val();
  var min = $('#min').val();
  var commonBook = $('#commonBook').is(':checked');
  var v_ratio = $('#v-ratio').val();
  var numbers = $('#numbers').is(':checked');
  var symbol = $('#symbol').is(':checked');
  var capsType = $('input[name="caps"]:checked').val();

  wordGen(seed, max, min, commonBook, v_ratio, numbers, symbol, capsType);
 }

function wordGen(seed, maxLength, minLength, useCommonBook, ratioOfVowels, useNumbers, useSymbols, capsType ) {


  var isUsedCommonBook = useCommonBook;
  var vRatio = ratioOfVowels;
  var isUseNumbers = useNumbers;
  var isUseSymbols = useSymbols;
  var whichCaps = capsType;
  var selectedMaxLength = maxLength;
  var selectedMinLength = minLength;
  var mainArray = [];
  var textAreaElm = getDocument("wordgen-printout");

  textAreaElm.innerHTML = ""; //reset


  if(seed > 0) {
     for (var i = 0; i < seed; i++) {

      var wordLength = getWordLength(selectedMaxLength, selectedMinLength);
      var word = makeWord(wordLength, isUsedCommonBook, vRatio, isUseNumbers, isUseSymbols, whichCaps);
      mainArray.push(word);

     }

  } else {
    textAreaElm.innerHTML += errorCode(1);
  }

  for (var ind in mainArray) {

      textAreaElm.innerHTML+=(" " + mainArray[ind]);

    }



}
  function getDocument(whichElement) {

    if (whichElement === "wordgen-printout") {
      return document.getElementById("wordgen-printout");
    } else if(whichElement === "commontickbox") {
      return document.getElementById("commonBook");
    } else if(whichElement === "numbertickbox") {
      return document.getElementById("numbers");
    } else if(whichElement === "symboltickbox") {
      return document.getElementById("symbol");
    }
  }
  function getWordLength(maxLength, minLength) {
     var length = null;
     maxLength = Math.abs(maxLength);
     minLength = Math.abs(minLength);

     if(minLength > maxLength) { //error handle
        minLength = "";
     }
     if(minLength == "") {
       length = Math.floor((Math.random())*maxLength) + 1;

     } else {
        do {
            length = Math.floor((Math.random())*maxLength) + 1;
          } while(length < minLength);
     }
     return length;
  }

  function makeWord(fromLength,useCommonBook, ratioOfVowels, useNumbers, useSymbols, capsType){
    var returnedWord;
    var chosenVowels = [];
    var chosenConsonants = [];
    var totalLength = fromLength;
    var diceRoll = null;

    if(ratioOfVowels === "") {
      ratioOfVowels = .4;
    }
    ratioOfVowels = Math.abs(ratioOfVowels);
      var numberofVowels = Math.floor(totalLength * ratioOfVowels);
      //find all consonants needed
      for(var i = 0; i < (totalLength - numberofVowels); i++){
        var consonant = "";
        diceRoll = Math.random();
        if(diceRoll > .40){
          consonant = letterBook.two[Math.floor(((Math.random()*letterBook.two.length)))];
        } else if(diceRoll > .02) {
          consonant = letterBook.one[Math.floor(((Math.random()*letterBook.one.length)))];
        } else if(diceRoll <= .02) {
          consonant = letterBook.zero[Math.floor(((Math.random()*letterBook.zero.length) /*+ 1*/))];
        }
        //switch to uppercase if called
         if(capsType === "allcaps") {
            consonant = consonant.toUpperCase();
          } else if (capsType === "somecaps") {
            if(Math.random() > Math.random()) {
              consonant = consonant.toUpperCase()
            }
          }
          chosenConsonants.push(consonant);
      }
      //find all vowels needed
      for(var i = 0; i < numberofVowels; i++){
        var vowel = "";
        diceRoll = Math.random();
        if(diceRoll > .60){
          vowel = vowelBook.two;
        } else if(diceRoll > .30 ) {
          vowel = vowelBook.one[Math.floor(((Math.random()*vowelBook.one.length)))];
        } else if(diceRoll <= .30) {
          vowel = vowelBook.zero;
        }
        //switch to uppercase if called
          if(capsType === "allcaps") {
            vowel = vowel.toUpperCase();
          } else if (capsType === "somecaps") {
            if(Math.random() > Math.random()) {
              vowel = vowel.toUpperCase()
            }
          }
          chosenVowels.push(vowel);
      }
      //blend consonants and vowels togethor
      while(chosenConsonants.length < totalLength) {
          //pick random vowel out of chosen list
          splicedVowel = chosenVowels[(Math.floor(Math.random())*chosenVowels.length )];
          //remove that element from the list so it cannot be picked again
          var index = chosenVowels.indexOf(splicedVowel);
          chosenVowels.splice(index, 1);
          //find position by random for vowel to be inserted dynamically as chosenConsonants
          //array grows
         var randomInsert = Math.floor((Math.random())*(chosenConsonants.length+1));
          chosenConsonants.splice(randomInsert, 0 , splicedVowel);
      }
      //join array to word that is to be returned
      returnedWord = chosenConsonants.join('');
      //modify word with numbers if necessary
      if(useNumbers === true && totalLength > 2) {
       var numberofNumbers = Math.floor(Math.random()*totalLength);
       var newWord = null;
       if(numberofNumbers > 0) {
          for(var i = 0; i < numberofNumbers; i++) {

            var replacedChar = returnedWord.charAt(Math.floor((Math.random()*totalLength) + 1))
            var replacedNum = Math.floor(Math.random()*10)
            newWord = returnedWord.replace(replacedChar, replacedNum);
          }
          returnedWord = newWord;
        }
      }

      //modify word with symbols if necessary
      if(useSymbols === true && totalLength > 2) {
       var numberofSymbols = Math.floor(totalLength*(Math.random()));
       var newWord = null;
       if(numberofSymbols > 0) {
          for(var i = 0; i < numberofSymbols; i++) {

            var replacedChar = returnedWord.charAt(Math.floor((Math.random()*returnedWord.length) + 1))
            var replacedSymbol = symbolBook.regularSymbols[Math.floor((symbolBook.regularSymbols.length*Math.random()))]
            newWord = returnedWord.replace(replacedChar, replacedSymbol);
          }
          returnedWord = newWord;
        }
      }
    //if dice roll is greater than .5 , a commonbook value will be inserted
    diceRoll = Math.random();
    if(useCommonBook === true && diceRoll >= .5 && totalLength > 2) {
      diceRoll = Math.random();
      var insertedFromComBook = "";
      var insertAtEnd = false;
      var indexToSplice = null;
      var newWord = ""
      if(diceRoll > .66){
        insertedFromComBook = commonBook.end[(Math.floor((Math.random()*commonBook.end.length)))]
        insertAtEnd = true;
        indexToSplice = insertedFromComBook.length;
      } else if(diceRoll < .33) {
        insertedFromComBook = commonBook.twoletter[(Math.floor((Math.random()*commonBook.twoletter.length)))]
        indexToSplice = insertedFromComBook.length;
      } else {
        insertedFromComBook = commonBook.threeletter[(Math.floor(Math.random()*commonBook.threeletter.length))]
        indexToSplice = insertedFromComBook.length;
      }

      if(insertAtEnd === true) {
        var slicedSection = returnedWord.substr((returnedWord.length - indexToSplice), indexToSplice);
        newWord = returnedWord.replace(slicedSection, insertedFromComBook);
      } else {
        var startOfSliceIndex = Math.floor((Math.random()*returnedWord.length));
        var slicedSection = returnedWord.substr(startOfSliceIndex, indexToSplice);
        newWord = returnedWord.replace(slicedSection, insertedFromComBook);
      }
      //special case
      if(newWord.charAt[0] === "q" && diceRoll > .33) {
        newWord = newWord.replace(newWord.charAt[1], "u");
      }

      returnedWord = newWord;

   }
   return returnedWord;
  }

  function errorCode(code) {
    var errormessage = "";
    switch(code) {
      case 1:
        errormessage = "error code00" + code + ": An incorrect seed number was selected\nPlease enter a seed value which is greater than 0!"
        break;
      case 2:
        errormessage = "error code00" + code + ": An incorrect vowel ratio was entered\n\tPlease enter a ratio between 0 and 1!"
        break;
      case 3:
        errormessage = "error code00" + code + ": An incorrect string was entered\n\tPlease enter whole numbers only!"
        break;
    }
    return errormessage;
  }
 /* function errorChecker(variable, variableType) {
     if(typeof variable != 'number') {
        textAreaElm.innerHTML += errorCode(3);
      }
      if(variableType == "vowel" && variable > 1 ){
     }
  }*/
