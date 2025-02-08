class GameScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'GameScene' });
    }

    preload () {
        this.load.spritesheet('raccoon_1_idle', 'assets/sprites/raccoon-1/idle.png', { frameWidth: 174, frameHeight: 162 });
    }

    create () {
        this.anims.create({
            key: 'raccoon_1_idle',
            frames: this.anims.generateFrameNumbers('raccoon_1_idle', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: -1
        });

        this.raccoon_1 = this.physics.add.sprite(610, 808, 'raccoon_1_idle').setScale(0.8);
    }
}

export default GameScene