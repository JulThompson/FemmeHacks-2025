class GameScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'GameScene' });
    }

    preload () {
        this.load.image('raccoon_background', 'assets/images/raccoon-background.jpg');
        this.load.image('grass_background', 'assets/images/grass-background.webp');
        
        this.load.image('task_board', 'assets/images/task-board.png');
        this.load.image('home_board', 'assets/images/home-board.png');
        this.load.image('button', 'assets/images/button.png');
        this.load.image('inventory', 'assets/images/inventory-board.webp');

        this.load.image('food', 'assets/images/apple.png');
        this.load.image('toy', 'assets/images/toy.png');
        this.load.image('water', 'assets/images/water.png');

        this.load.spritesheet('raccoon_1_idle', 'assets/sprites/raccoon.png', { frameWidth: 32, frameHeight: 33 });
    }

    create () {
        this.add.image(0, 0, 'grass_background').setOrigin(0, 0).setScale(2.2);
        this.add.image(883, 315, 'task_board').setScale(10);
        this.add.image(320, 230, 'home_board').setScale(16);
        this.add.image(320, 230, 'raccoon_background').setScale(0.85);
        
        this.food_button = this.add.image(120, 500, 'button').setScale(10);
        this.add.image(120, 500, 'food').setScale(0.2);

        this.toy_button = this.add.image(320, 500, 'button').setScale(10);
        this.add.image(320, 500, 'toy').setScale(0.14);

        this.energy_button = this.add.image(520, 500, 'button').setScale(10);
        this.add.image(520, 500, 'water').setScale(0.09);

        this.add.image(120, 585, 'inventory').setScale(0.75);
        this.food_text = this.add.text(105, 565, foods + 'x', {fontFamily: 'Stardew_Valley', fill : '#000000'}).setScale(2);

        this.toy_text = this.add.image(320, 585, 'inventory').setScale(0.75);

        this.energy_text = this.add.image(520, 585, 'inventory').setScale(0.75);

        
        // this.anims.create({
        //     key: 'raccoon_1_idle',
        //     frames: this.anims.generateFrameNumbers('raccoon_1_idle', { start: 0, end: 4 }),
        //     frameRate: 7,
        //     repeat: -1
        // });

        this.raccoon_1 = this.add.sprite(310, 290, 'raccoon_1_idle').setScale(3);


        let eatingArray = [
            "Make a vegan meal for lunch or dinner.",
            "Make a meal with seasonal food items",
            "Maintain a compost bin to collect food waste for one week.",
            "Buy food from a local farmer’s market",
            "Plant fruits or vegetables in an at-home garden",
            "Make a meal plan for the week.",
            "Research companies that sell whole, sustainable food.",
            "Read a blog about sustainable food.",
            "Try a new meat alternative.",
            "Freeze extra food for a later meal.",
            "Make a meal with leftovers."
        ];
        let eatingPoints = [3, 3, 5, 3, 3, 1, 1, 1, 1, 1, 3];

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

        function eat() {
            if (hungerLevel <= 40) {
                hungerLevel += 10;
                foods--;
            } else if (hungerLevel < 50){
                hungerLevel = 50;
                foods--;
            } else {
                alert("I'm not hungry!");
            }
        }

        function play() {
            if (happyLevel <= 40) {
                happyLevel += 10;
                toys--;
            } else if (happyLevel < 50) {
                happyLevel = 50;
                toys--;
            } else {
                alert("I don't need to play right now!");
            }
        }

        function rest() {
            if (energyLevel <= 40) {
                energyLevel += 10;
                energy--;
            } else if (energyLevel < 50) {
                energyLevel = 50;
                energy--;
            } else {
                alert("I'm not tired!");
            }
        }

        function addTask(task, points) {
            customArray.push(task);
            customPoints.push(points);
        }
    }

    update () {
        // this.raccoon_1.anims.play('raccoon_1_idle', true);
    }
}

export default GameScene