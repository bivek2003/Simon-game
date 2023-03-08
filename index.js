var buttonPickker = {
    red: "./sounds/red.mp3",
    blue: "./sounds/blue.mp3",
    green: "./sounds/green.mp3",
    yellow: "./sounds/yellow.mp3"
};
var audio = new Audio();
var flag = false, optional = false;
var count = 0;
var speed = 0;
var player1 = [];
var player2 = [];
$(document).on("keydown", sigma);

function sigma(event) {
    var buttonPick = Math.floor(Math.random() * 4);
    if (event.key.toUpperCase() == "A" || optional) {
        player1.push($(".btn").eq(buttonPick)[0]);
        $("#level-title").html("Level " + player1.length);
        audio.src = buttonPickker[$(".btn").eq(buttonPick)[0].id];
        audio.play();
        $(".btn").eq(buttonPick).animate({ opacity: "0.21121211" }, 100, "linear");
        $(".btn").eq(buttonPick).animate({ opacity: "1" }, 100, "linear");
        $(document).off("keydown", sigma);
    }
}
$(".btn").on("click", ClickEvent);
function ClickEvent() {
    if (player2.length < player1.length) {
        player2.push($(this)[0]);
        console.log(player2[count].id);
        audio.src = buttonPickker[player2[count].id];
        audio.play();
        $(this).addClass("pressed").delay(100).queue(function () {
            $(this).removeClass("pressed").dequeue();
        });
        if (player1[count] != player2[count]) {
            player1 = [];
            player2 = [];
            $("body").addClass("game-over").delay(100).queue(function () {
                $("body").removeClass("game-over").dequeue();
            });
            audio.src="./sounds/wrong.mp3";
            audio.play();
            $("#level-title").html("Game Over, Press Any Key to Restart");
            optional = true;
            speed = 0;
            count = 0;
            $(document).on("keydown", sigma);
            return;
        }
        count++;
        if (player1.length == player2.length) {
            player2 = [];
            count = 0;
            setTimeout(function () {
                sigma({ key: "A" });
            }, (1000 - speed));
        }

        speed = speed + 20;
    }
}