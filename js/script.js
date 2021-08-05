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
});