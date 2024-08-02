
var btns = ["red", "blue", "green", "yellow"];

//salvamos a sequencia de numeros aleatorios gerados nesta array
var gamePattern = [];
//salvamos a sequencia dos clicks do usuario nesta array
var UserClickedPattern = [];
//Definir que o jogo n começou
var started = false;
//o nivel começa do 0
var level = 0;

$(document).keypress(function() {
    if (!started) {
    started = true;
      //checa se iniciou o jogo e muda o nome pra Level e chama a funçao de sequencia do jogo
      $("#level-title").text("Level " + level);
      nextSequence();
      
    }
});

//função do botao selecionado pelo usuario
$(".btn").click(function(){

    //pegamos o id do botao clicado
    var userChosenColour = $(this).attr("id")
    console.log(userChosenColour);
    //Atribuir qual botao clicamos ao Arrray de click do usuario (userClickedPattern)
    userClickedPattern.push(userChosenColour);
    //tocar o som do botao clicado pelo usuario
    playSound(userChosenColour);
    animatepress(userChosenColour)

    //adiciona o botao escolhido ao ultimo index da sequencia da Array
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    //checa se o indice do botao apertado é igual ao indice da Array do gamePattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        //caso seja igual, ele vai checar novamente, agora checando se todos os indices sao iguais
        if(userClickedPattern.length === gamePattern.length){
            //seta um tempo para reiniciar a função
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        //caso nao sejam iguais, adicionam e removem a classe de "game-over" para aparecer e sumir, dando um intervalo de 200
    }   else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");

        }, 200)

        $("#level-title").text("Game over, pressione qualquer tecla para reiniciar")

        startOver()
    }

}


//função do numero aleatorio
function nextSequence(){
    //reseta o userClickedPattern toda vez q essa função for chamado
    userClickedPattern = [];
    //toda vez que chamar essa função, a variavel level recebe +1
    level++;

    $("#level-title").text("Level " + level);

    //Gerar numero aleatorio
    var randomNumber = Math.floor(Math.random() * 4);
    //Atribuir numero aleatorio a uma cor 
    var colorNumber = btns[randomNumber];
    console.log(colorNumber);
    //adicionar o numero aleatorio a Array para salvar a sequencia
    gamePattern.push(colorNumber);
    //Animação de seleção do botao
    
    //tocar o som do botao escolhido aleatoriamente
    playSound(colorNumber);
    $("#" + colorNumber).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatepress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

    //função dos sons dos botoes
    function playSound(name){

        var audio = new Audio("./src/sounds/" + name + ".mp3");
        audio.play();
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}

