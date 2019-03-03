(function() {
  var numCorrect;
  var questions = [{
    question: "What is the size of int?",
    choices: [2,4,8,'compiler independent'],
    correctAnswer: 3
  }, {
    question: "Identify the incorrect file opening mode from the following.",
    choices: ['r','w','x','a'],
    correctAnswer: 2
  }, {
    question: "In the standard library of C programming language, which of the following header file is designed for basic mathematical operations?",
    choices: ['math.h','conio.h','dos.h','stdio.h'],
    correctAnswer: 0
  },  {
    question: "Suppose a C program has floating constant 1.414, what's the best way to convert this as 'float' data type?",
    choices: ['(float)1.414','float(1.414)','1.414f or 1.414F','1.414 itself of "float" data type i.e. nothing else required.'],
    correctAnswer: 2
  },
  {
    question: "For a given integer, which of the following operators can be used to “set” and “reset” a particular bit respectively?",
    choices: ['| and &','&& and ||','& and |',' || and &&'],
    correctAnswer: 0
  } 
];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
       numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
                   addScoretoFirebase();
      return score;
      
    }

    function addScoretoFirebase()
    {
      console.log("In add score to firebase");
      console.log(numCorrect);
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var ratings=snapshot.val().rating;
        ratings=parseInt(ratings);
        ratings+=numCorrect;
        var database=firebase.database();
        var ref=database.ref('users/'+userId);
        var uData={rating:ratings};
        console.log(uData);
        ref.update(uData).then(function(){
          window.location='home.html';
        });
      });

    }
  })();