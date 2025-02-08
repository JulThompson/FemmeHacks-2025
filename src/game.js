class GameScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'GameScene' });
    }

    preload () {
        this.load.image('battle_background', 'assets/images/tes.png');
        this.load.spritesheet('raccoon_1_idle', 'assets/sprites/raccoon-1/idle.png', { frameWidth: 174, frameHeight: 162 });
    }

    create () {
    // Add background image
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    // Create green rectangles
    const graphics = this.add.graphics({ fillStyle: { color: 0x00ff00 } });

    // Left side rectangles
    const rectWidth = 100;
    const rectHeight = (this.sys.game.config.height - 20) / 2;

    graphics.fillRect(20, 20, rectWidth, rectHeight);
    graphics.fillRect(20, rectHeight + 40, rectWidth, rectHeight);

    // Right side rectangle
    const rightRectWidth = this.sys.game.config.width - rectWidth - 60;
    const rightRectHeight = this.sys.game.config.height - 40;

    graphics.fillRect(rectWidth + 40, 20, rightRectWidth, rightRectHeight);

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