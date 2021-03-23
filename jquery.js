var playing = false;
var score;
var trialsLeft;
var fruits = ['Apple', 'Banana', 'Cheries', 'Cachew', 'Guava', 'Lemon', 'Mango', 'Pineapple']
var step;
var action;
$(function(){
    //Start or Reset
    $("#startreset").click(function(){
        if(playing == true){
            location.reload();
        }else{
            playing = true;
            score = 0;
            $("#scorevalue").html(score);

            //show trials left
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();
            // Hide Game over box
            $("#gameover").hide();

            $("#startreset").html("Reset Game");
            startAction()
    }
});

 $("#fruit1").mouseover(function(){
     score++;
     $("#scorevalue").html(score);
     // Play Sound
     document.getElementById("sliceSound").play();
  //   $("#sliceSound")[0].play();
     clearInterval(action);
     $("#fruit1").hide("explode", 500);
     
     setTimeout(startAction, 500);
 });



function addHearts(){
    $("#trialsLeft").empty();
    for (i=0; i<trialsLeft; i++){
                $("#trialsLeft").append('<img src="images/hearts.png" class="life">');
    }
}

function startAction(){
    // Generate Fruit
   $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50});

    // Random Step
    step = 1+Math.round(5*Math.random());
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
           // check for trials left
           if(trialsLeft > 1){
                 $("#fruit1").show();
                chooseFruit();
                $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50});

                // Random Step
                step = 1+Math.round(5*Math.random());
                trialsLeft --;
               addHearts();  // Populate trials left
            }else{
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
        }
     }
 }, 10);

}

function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(7*Math.random())] + '.png');

}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});    
//  Image Credits: logomakr.com/1e8Lqj
// Image Creidts: https://openclipart.org
// Once start/reset button is pressed, check if game is in progress
// if game is in progress: restart game
// else: show no of trials and start game