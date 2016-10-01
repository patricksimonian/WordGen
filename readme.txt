##############################################################################
                        WordGen by Patrick Simonian

notes:
  This program and its contents (in the 1.0 release) was and has been written
entirely by the author! For that reason (as well as myself only coding for
about 1 month), it could absolutely be improved on!
 Additionally, there is a small Regular Expression which is functional
but not 100% operational. It's purpose is for users who are
new to RegExp (such as my self) to familiarize themselves with some basic
expressions. A great resource for regexp can be found at https://regex101.com

##############################################################################
                        Release

1.0:
 inital release of html, js, css files as well as assets.

2.0:
  added additional features to javascript and seperated into two files for the word generation and regex finder respectively.

    vowel ratio: can set ratio from 0.0 to 1.0, defaults to .4 (40% of word length will be vowels)

    common combinations: inserts into generated words common combinations of letters in english language such as "ph" sounds or "th" sounds or
                          suffixes such as "ing" and "ion"

    symbols: if selected, words will have symbols inserted into them ie:("#", "@", "!", "$", "%", "&", "?", ":", ";", "~")

    numbers: if selected, words will have numbers inserted into them ie (1-9)

    Caps options: caps can be inserted into words, either at random or all or none
