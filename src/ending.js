class EndingScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'EndingScene' });
    }

    preload () {
        this.load.image('grass_background', 'assets/images/grass-background.webp');
        this.load.image('home_board', 'assets/images/home-board.png');

        this.load.spritesheet('raccoon_1_dance', 'assets/sprites/raccoon-1/dance.png', { frameWidth: 227, frameHeight: 188 });
    }

    create () {
        this.add.image(0, 0, 'grass_background').setOrigin(0, 0).setScale(2.2);
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'home_board').setScale(20);

        let congrats = this.add.text(this.cameras.main.width / 2, 150, 'Congratulations!', {
            fontFamily: 'Stardew_Valley',
            fontSize: '60px',
            color: '#354F52'
        });
        congrats.setOrigin(0.5, 0.5);
        congrats.setPosition(this.cameras.main.width / 2, 150);

        let text = this.add.text(this.cameras.main.width / 2, 200, 'You are a master of sustainability and your', {
            fontFamily: 'Stardew_Valley',
            fontSize: '30px',
            color: '#354F52'
        });
        text.setOrigin(0.5, 0.5);
        text.setPosition(this.cameras.main.width / 2, 200);

        let text2 = this.add.text(this.cameras.main.width / 2, 230, 'raccoon is all grown up! Thank you!', {
            fontFamily: 'Stardew_Valley',
            fontSize: '30px',
            color: '#354F52'
        });
        text2.setOrigin(0.5, 0.5);
        text2.setPosition(this.cameras.main.width / 2, 230);


        this.anims.create({
            key: 'raccoon_1_dance',
            frames: this.anims.generateFrameNumbers('raccoon_1_dance', { start: 0, end: 5 }),
            frameRate: 7,
        })

        let raccoon = this.raccoon_1 = this.add.sprite(this.cameras.main.width / 2, 375, 'raccoon_1_dance').setScale(1.5)
        raccoon.setOrigin(0.5, 0.5);
        raccoon.setPosition(this.cameras.main.width / 2, 375);
    }

    update () {
        this.raccoon_1.anims.play('raccoon_1_dance', true);
    }
}

export default EndingScene