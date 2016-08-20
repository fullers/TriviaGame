$(document).ready(function(){

//Define global variables
var currentquestion = 0;
var unanswered = 0;
var submt = true;
var picked;
var score = 0;
var count = 28;
var delay = 5;

// Objects for questions

var quiz = [
        {
            "question" : "What year was the first superhero comic book released",
            "image" : "http://www.thecomicbooks.com/old/action1.gif",
            "choices" : [
                                    "1837",
                                    "1930",
                                    "1938",
                                    "1941"
                                ],
            "correct" : "1938",
            "explanation" : "In June 1938, Action Comics #1 came out, featuring a man in a red and blue costume lifting a car over his head! This was Superman, the very first comic character to have powers far beyond a normal human being. Sure, Flash Gordon and The Shadow were neat, but they couldn't lift a car over their heads and throw it at someone! Nor could they let bullets bounce off their chests, or run faster than a train, or leap over tall buildings in a single bound. To say the least, Superman was a fitting name.",
        },
        {
            "question" : "Which comic book superhero first release in 1941",
            "image" : "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Captainamerica1.jpg/440px-Captainamerica1.jpg",
            "choices" : [
                                    "The Phantom",
                                    "The Shadow",
                                    "Doc Sampson",
                                    "Captain America"
                                ],
            "correct" : "Captain America",
            "explanation" : "The character first appeared in Captain America Comics #1 (cover dated March 1941) from Timely Comics.",
        },
        {
            "question" : "What is Superman's kryptonian name.",
            "image" : "https://upload.wikimedia.org/wikipedia/en/e/eb/SupermanRoss.png",
            "choices" : [
                                    "Clark Kent",
                                    "Jor-El",
                                    "Kal-El",
                                    "Zode"
                                ],
            "correct" : "Kal-El",
            "explanation" : "Superman's kryptonian name is Kal-El.",
        },
        {
            "question" : "What is Captain America's real name.",
            "image" : "http://www.writeups.org/wp-content/uploads/Captain-America-Marvel-Comics-Avengers-Steve-Rogers-b.jpg",
            "choices" : [
                                    "John Smith",
                                    "Bruce Banner",
                                    "Steve Rogers",
                                    "Buckey Barnes"
                                ],
            "correct" : "Steve Rogers",
            "explanation" : "Captain Americas' real name is Steve Rogers",
        },
     
    ];

// Functions

	function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }


     function addChoices(choices) {
         if (typeof choices !== "undefined" && $.type(choices) == "array") {
             $('#choice-block').empty();
             for (var i = 0; i < choices.length; i++) {
                 $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
             }
         }
     }

     function nextQuestion() {
                  
         $('#explanation').empty();
         $('#question').text(quiz[currentquestion]['question']);
         $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         // if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
         //     if ($('#question-image').length == 0) {
         //         $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
         //     } else {
         //         $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
         //     }
         // } else {
         //     $('#question-image').remove();
         // }
         addChoices(quiz[currentquestion]['choices']);
         setupButtons();

     }

     function processQuestion(choice) {

            //console.log("reached processQuestion");
            
            currentquestion++;          
   
             if (currentquestion == quiz.length) {
                 endQuiz();
             } else {
                 
                 nextQuestion();
                 setTimer();
             }
        
     }

  function setupButtons() {
         $('.choice').on('mouseover', function () {
             $(this).css({
                 'background-color': '#e1e1e1'
             });
         });
         $('.choice').on('mouseout', function () {
             $(this).css({
                 'background-color': '#fff'
             });
         })
         $('.choice').on('click', function () {
             // alert("");
             choice = $(this).attr('data-index');
             $('.choice').removeAttr('style').off('mouseout mouseover');
             $(this).css({
                 'border-color': '#222',
                 'font-weight': 800,
                 'background-color': '#c1c1c1'
             });
        // countdown1 = setInterval( function() { 
             
            // if (delay === 0) {
            //     clearInterval(countdown1);
            //     processQuestion(choice); 
            //     //alert("Times Up");
            // }
            // delay--;
            //console.log("Choice: " + choice);

             

             if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
             // $('.choice').eq(choice).css({
             //     'background-color': '#50D943'
             // });
            // explanation = $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            // $('#frame').html(explanation);
            score++;
             $(this).off('click');
        
           processQuestion(choice);
            
         } else {
             // $('.choice').eq(choice).css({
             //     'background-color': '#D92623'
             // });
            //  explanation = $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            // $('#frame').html(explanation);
            $(this).off('click');
            processQuestion(choice);
            
         } //end else if
     // }, 1000);
              
        }) //End on click for .choice
     } // End fucntion setupButtons

     function endQuiz() {
         $('#explanation').empty();
         $('#question').empty();
         $('#choice-block').empty();
         //$('#question-image').remove();
         $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
         $(document.createElement('h2')).css({
             'text-align': 'center',
             'font-size': '4em'
         }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
         $(document.createElement('div')).attr("id", "correctAnswers").text("Correct Answers: " + score).insertAfter('#question');
         $(document.createElement('div')).attr("id", "incorrectAnswers").text("Inorrect Answers: " + Math.round(quiz.length - score)).insertAfter('#correctAnswers');
         $(document.createElement('div')).attr("id", "unanswered").text("Unanswered: " + Math.round(quiz.length - score)).insertAfter('#incorrectAnswers');
         $('#timearea').detach();
         $('#timearea').html("Times Up!").insertBefore('#question');
         createStartOver();

         $('#startovr').on('click', function() {

           $('#frame').empty();
           createStart();

         });
     }

     function init() {

     	$('#start').detach();
		
		setTimer();

         //add pager and questions
         if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
             //add pager
             $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
             //add first question
             $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[currentquestion]['question']).appendTo('#frame');
             //add image if present
             // if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
             //     $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).appendTo('#frame');
             // }
             $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

             //questions holder
             $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

             //add choices
             addChoices(quiz[currentquestion]['choices']);

            setupButtons();

         }
     }

function createStart() {

	//$('#start').html('<button id="startbtn" type="submit">Start</button>').addClass("btn btn-success");
    var btn = $('<button>Start</button>').attr({type: "submit", id: "startbtn", value: "Start"}).addClass("btn btn-primary");
    $('#start').html(btn);
}
function createStartOver() {

    //$('#start').html('<button id="startbtn" type="submit">Start</button>').addClass("btn btn-success");
    var btn = $('<button>Start Over</button>').attr({type: "submit", id: "startovr", value: "Start Over"}).addClass("btn btn-primary");
    $('#choice-block').append(btn);
}
function setTimer() {

	countdown = setInterval( function() { 

	$('#timearea').html("Time Remaining: " + count + " seconds");
	
	if (count == 0) {
		$('#timearea').html("Times Up!");
		clearInterval(countdown);
        unanswered++;        
	}
	count--;

}, 1000);
}

function answerTimer() {

countdown1 = setInterval( function() { 
     
    if (delay === 0) {
        clearInterval(countdown1);
        //processQuestion(choice); 
        alert("Times Up");
    }
    delay--;
    console.log("Choice: " + choice);
}, 1000);

} // End of Answer Timer

createStart();

$('#startbtn').on('click', function() {

	init();

});



}); //End document ready function