class GameScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'GameScene' });
    }

    preload () {
        this.load.image('raccoon_background', 'assets/images/raccoon-background.jpg');
        this.load.image('grass_background', 'assets/images/grass-background.webp');
        
        this.load.image('taskboard', 'assets/images/taskboard.png');
        this.load.image('homeboard', 'assets/images/homeboard.png');
        this.load.image('button', 'assets/images/button.png');

        this.load.spritesheet('raccoon_1_idle', 'assets/sprites/raccoon-1/idle.png', { frameWidth: 174, frameHeight: 162 });
    }

    create () {
        this.add.image(0, 0, 'grass_background').setOrigin(0, 0).setScale(2.2);
        this.physics.add.image(975, 320, 'taskboard').setScale(13.7);
        this.add.image(385, 230, 'homeboard').setScale(16.5);
        
        this.food_button = this.physics.add.image(275, 525, 'button').setScale(10);
        
        this.anims.create({
            key: 'raccoon_1_idle',
            frames: this.anims.generateFrameNumbers('raccoon_1_idle', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: -1
        });

        this.raccoon_1 = this.physics.add.sprite(375, 280, 'raccoon_1_idle').setScale(1);


        let eatingArray = [
            "Make a vegan meal for lunch or dinner.",
            "Make a meal with seasonal food items",
            "Maintain a compost bin to collect food waste for one week.",
            "Buy food from a local farmer’s market",
            "Plant fruits or vegetables in an at-home garden",
            "Make a meal plan for the week.",
            "Research companies that sell whole, sustainable food.",
            "Read a blog about sustainable food.",
            "Try a new meat alternative."
        ];
        let eatingPoints = [3, 3, 5, 3, 3, 1, 1, 1, 1];

        let reduceArray = [
            "Use a reusable water bottle.",
            "Bring a reusable cup the next time you go to a café or coffee shop.",
            "Use reusable bags on your trip to the grocery store.",
            "Ride a bike to your destination.",
            "Carpool with your friends.",
            "Shop at a second-hand store.",
            "Buy a new energy efficient appliance.",
            "Donate old clothing."
        ];
        let reducePoints = [1, 1, 1, 3, 1, 3, 5, 3];

        let customArray = [];
        let customPoints = [];


        let hungerLevel = 50;
        let happyLevel = 50;
        let energyLevel = 50;

        
        let foods = 1;
        let toys = 1;
        let energy = 1;
    }

    update () {
        this.raccoon_1.anims.play('raccoon_1_idle', true);
    }
}

export default GameScene