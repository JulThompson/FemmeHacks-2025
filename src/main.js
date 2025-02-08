import GameScene from './game.js'
import EndingScene from './ending.js'

const config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 660,
    backgroundColor: '#000000',
    pixelArt: true,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene:
        [
        GameScene,
        EndingScene
    ],
    audio: {
        disableWebAudio: true
    }
};

const game = new Phaser.Game(config);