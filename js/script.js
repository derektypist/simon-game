$(document).ready(function() {
    // Set Up Global Variables
    let targetSequence = [];
    let targetSequenceCopy = [];
    let playerSequence = [];
    let audioPlayer;
    let soundPlaying;
    let stepCount = 0;
    let strictMode = false;
    let isGameOn = false;
    let isGameRunning = false;
    let flashInterval;
    let flashCounter = 0;
    let colors = ["green","blue","yellow","red"];
    let colorSounds = {green:document.getElementById('sound-green'),
        blue:document.getElementById('sound-blue'),
        yellow:document.getElementById('sound-yellow'),
        red:document.getElementById('sound-red')};

    // Apply Click Events to Buttons and Circles
    $('.btn-start').click(function(e) {
        e.preventDefault();
        startNewGame();
    });

    $('.circle-quarter').click(function(e) {
        e.preventDefault();
        if (!isGameOn || !isGameRunning) return false;
        let color = $(this).data('color');
        playSoundFromButton(color);
        playerSequence.push(color);
        checkSequences();
    });

    $('.btn-strict').click(function(e) {
        e.preventDefault();
        if (!isGameOn) return false;
        strictMode = !strictMode;
        let displayColor = strictMode ? '#edb100' : '#000';
        $('.strict').css('background-color',displayColor);
    });

    $('.btn-on-off').click(function(e) {
        e.preventDefault();
        isGameOn = !isGameOn;
        if (!isGameOn) {
            resetVariables();
        }
        let displayColor = isGameOn ? '#edb100' : '#000';
        $('.on-off').css('background-color',displayColor);
    });

    // Function to Reset Variables
    function resetVariables() {
        targetSequence = [];
        playerSequence = [];
        stepCount = 0;
        strictMode = false;
        isGameOn = false;
        isGameRunning = false;
        $('.counter').val('--');
        $('.strict').css('background-color','#000');
    }

    // Function to Play Sound from Array
    function playSoundFromArray() {
        if (!isGameOn) return false;
        if (targetSequenceCopy.length) {
            let currentColor = targetSequenceCopy.shift();
            audioPlayer = colorSounds[currentColor];
            audioPlayer.addEventListener("ended", function() {
                $(`[data-color="${currentColor}"]`).css('opacity', '0.6');
                $(`[data-color="${currentColor}"]`).css('opacity', '1');
                audioPlayer.play();
            });
        } else {
            clearInterval(soundPlaying);
            isGameRunning = true;
        }
    }

    // Function to Play Sound from Button
    function playSoundFromButton(buttonColor) {
        $(`[data-color="${buttonColor}"]`).css('opacity','1');
        colorSounds[buttonColor].play();
        setTimeout(() => {
            $(`[data-color="${buttonColor}"]`).css('opacity','0.6');
        }, 130);
    }

    // Function to Start Sound Sequence
    function startSoundSequence() {
        isGameRunning = false;
        targetSequenceCopy = targetSequence.slice(0);
        soundPlaying = setInterval(function() {
            playSoundFromArray();
        }, 700);
    }
});