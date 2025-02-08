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
        this.load.image('unfinished_icon', 'assets/images/unfinished-button.png');
        this.load.image('done_icon', 'assets/images/done-button.png');

        this.load.image('food', 'assets/images/apple.png');
        this.load.image('toy', 'assets/images/toy.png');
        this.load.image('energy', 'assets/images/energy.png');

        this.load.image('stat_bar', 'assets/images/stat-bar.png');
        this.load.image('food_bar', 'assets/images/food-bar.png');
        this.load.image('toy_bar', 'assets/images/toy-bar.png');
        this.load.image('energy_bar', 'assets/images/energy-bar.png');

        // this.load.spritesheet('raccoon_1_idle', 'assets/sprites/raccoon.png', { frameWidth: 32, frameHeight: 33 });
        this.load.spritesheet('raccoon_1_dance', 'assets/sprites/raccoon-1/dance.png', { frameWidth: 227, frameHeight: 188 });
        this.load.spritesheet('raccoon_1_idle_happy', 'assets/sprites/raccoon-1/idle-happy.png', { frameWidth: 232, frameHeight: 224 });
        this.load.spritesheet('raccoon_1_idle', 'assets/sprites/raccoon-1/idle.png', { frameWidth: 176.5, frameHeight: 158 }); // he's wiggly :(
        this.load.spritesheet('raccoon_1_jump', 'assets/sprites/raccoon-1/jump.png', { frameWidth: 145, frameHeight: 188 }); // also a bit rough
        this.load.spritesheet('raccoon_1_panic', 'assets/sprites/raccoon-1/panic.png', { frameWidth: 209, frameHeight: 198 });
        this.load.spritesheet('raccoon_1_turn', 'assets/sprites/raccoon-1/turn.png', { frameWidth: 301, frameHeight: 172 });


    }

    create () {
        this.add.image(0, 0, 'grass_background').setOrigin(0, 0).setScale(2.2);
        this.add.image(883, 315, 'task_board').setScale(10);
        this.add.image(320, 230, 'home_board').setScale(16);
        this.add.image(320, 230, 'raccoon_background').setScale(0.85);
        
        let eatingArray = [
            "(3) Make a vegan meal for lunch or dinner.",
            "(3) Make a meal with seasonal food items",
            "(5) Maintain a compost bin to collect food waste for one week.",
            "(3) Buy food from a local farmer’s market",
            "(5) Plant fruits or vegetables in an at-home garden",
            "(3) Make a meal plan for the week.",
            "(1) Research companies that sell whole, sustainable food.",
            "(1) Read a blog about sustainable food.",
            "(1) Try a new meat alternative.",
            "(1) Freeze extra food for a later meal.",
            "(3) Make a meal with leftovers.",
            "(5) Compile a list of plant-based and sustainable recipes."
        ];
        let eatingPoints = [3, 3, 5, 3, 5, 3, 1, 1, 1, 1, 3, 5];
        let eatingElements = [];
        let eatingButtons = [];
        for (let i = 0; i < eatingArray.length; i++) {
            let element = this.add.text(725, 120 + (22*i), eatingArray[i], {
                fontFamily: 'Stardew_Valley',
                fontSize: '20px',
                color: 'green'
            });
            element.visible = true;
            eatingElements.push(element);

            let corresponding_button = this.add.image(700, 130 + (22*i), 'unfinished_icon').setScale(0.7);
            corresponding_button.visible = true;
            corresponding_button.setInteractive();
            corresponding_button.on('pointerdown', () => {
                corresponding_button.setTexture('done_icon');
                this.time.delayedCall(1000, () => {
                    corresponding_button.setTexture('unfinished_icon');
                }, [], this);
            });
            corresponding_button.on('pointerover', () => corresponding_button.setTint(0xcccccc));
            corresponding_button.on('pointerout', () => corresponding_button.setTint(0xffffff));
            eatingButtons.push(corresponding_button);
        }

        let reduceArray = [
            "(1) Use a reusable water bottle.",
            "(1) Bring a reusable cup the next time you go to a café or coffee shop.",
            "(1) Use reusable bags on your trip to the grocery store.",
            "(3) Ride a bike to your destination.",
            "(1) Carpool with your friends.",
            "(3) Shop at a second-hand store.",
            "(5) Buy a new energy efficient appliance.",
            "(3) Donate old clothing."
        ];
        let reducePoints = [1, 1, 1, 3, 1, 3, 5, 3];
        let reduceElements = [];
        let reduceButtons = [];
        for (let i = 0; i < reduceArray.length; i++) {
            let element = this.add.text(725, 170 + (22*i), reduceArray[i], {
                fontFamily: 'Stardew_Valley',
                fontSize: '20px',
                color: 'red'
            });
            element.visible = false;
            reduceElements.push(element);

            let corresponding_button = this.add.image(700, 180 + (22*i), 'unfinished_icon').setScale(0.7);
            corresponding_button.visible = false;
            corresponding_button.setInteractive();
            corresponding_button.on('pointerdown', () => {
                corresponding_button.setTexture('done_icon');
                this.time.delayedCall(1000, () => {
                    corresponding_button.setTexture('unfinished_icon');
                }, [], this);
            });
            corresponding_button.on('pointerover', () => corresponding_button.setTint(0xcccccc));
            corresponding_button.on('pointerout', () => corresponding_button.setTint(0xffffff));
            reduceButtons.push(corresponding_button);
        }

        let customArray = ["test", "test2", "test3"];
        let customPoints = [];
        let customElements = [];
        let customButtons = [];
        for (let i = 0; i < customArray.length; i++) {
            let element = this.add.text(725, 210 + (22*i), customArray[i], {
                fontFamily: 'Stardew_Valley',
                fontSize: '20px',
                color: 'orange'
            });
            element.visible = false;
            customElements.push(element);

            let corresponding_button = this.add.image(700, 220 + (22*i), 'unfinished_icon').setScale(0.7);
            corresponding_button.visible = false;
            corresponding_button.setInteractive();
            corresponding_button.on('pointerdown', () => {
                corresponding_button.setTexture('done_icon');
                this.time.delayedCall(1000, () => {
                    corresponding_button.setTexture('unfinished_icon');
                }, [], this);
            });
            corresponding_button.on('pointerover', () => corresponding_button.setTint(0xcccccc));
            corresponding_button.on('pointerout', () => corresponding_button.setTint(0xffffff));
            customButtons.push(corresponding_button);
        }

        let hungerLevel = 50;
        let happyLevel = 50;
        let energyLevel = 50;

        let foods = 1;
        let toys = 1;
        let energy = 1;

        this.add.text(925, 50, "Tasks", {
            fontFamily: 'Stardew_Valley',
            fontSize: '35px',
            color: 'black',
        })
       
        let eatingHeader = this.add.text(700, 90, "\u{1F783} Sustainable Eating: Food", {
            fontFamily: 'Stardew_Valley',
            fontSize: '25px',
            color: 'black'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', displayEatingTasks);
        
        let reduceHeader = this.add.text(700, 400, "\u{1F783} Reduce Waste: Toys", {
            fontFamily: 'Stardew_Valley',
            fontSize: '25px',
            color: 'black'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', displayReduceTasks);

        let customHeader = this.add.text(700, 440, "\u{1F783} Custom Tasks", {
            fontFamily: 'Stardew_Valley',
            fontSize: '25px',
            color: 'black'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', displayCustomTasks);

        function displayEatingTasks() {
            console.log("hit");
            for (let i = 0; i < eatingElements.length; i++) {
                if (eatingElements[i].visible) {
                    eatingElements[i].visible = false;
                    eatingButtons[i].setInteractive(false);
                    eatingButtons[i].visible = false;
                    reduceHeader.y = 130;
                    customHeader.y = 170;
                } else {
                    eatingElements[i].visible = true;
                    eatingButtons[i].setInteractive(true);
                    eatingButtons[i].visible = true;
                    reduceHeader.y = 400;
                    customHeader.y = 440;
                }
            }
            for (let i = 0; i < reduceElements.length; i++) {
                reduceElements[i].visible = false;
                reduceButtons[i].setInteractive(false);
                reduceButtons[i].visible = false;
            }
            for (let i = 0; i < customElements.length; i++) {
                customElements[i].visible = false;
                customButtons[i].setInteractive(false);
                customButtons[i].visible = false;
            }
        }

        function displayReduceTasks() {
            for (let i = 0; i < reduceElements.length; i++) {
                if (reduceElements[i].visible) {
                    reduceElements[i].visible = false;
                    reduceButtons[i].setInteractive(false);
                    reduceButtons[i].visible = false;
                    customHeader.y = 170;
                } else {
                    reduceElements[i].visible = true;
                    reduceButtons[i].setInteractive(true);
                    reduceButtons[i].visible = true;
                    customHeader.y = 360;
                    reduceHeader.y = 130;
                }
            }
            for (let i = 0; i < eatingElements.length; i++) {
                eatingElements[i].visible = false;
                eatingButtons[i].setInteractive(false);
                eatingButtons[i].visible = false;
            }
            for (let i = 0; i < customElements.length; i++) {
                customElements[i].visible = false;
                customButtons[i].setInteractive(false);
                customButtons[i].visible = false;
            }
        }

        function displayCustomTasks() {
            for (let i = 0; i < customElements.length; i++) {
                if (customElements[i].visible) {
                    customElements[i].visible = false;
                    customButtons[i].setInteractive(false);
                    customButtons[i].visible = false;
                } else {
                    customElements[i].visible = true;
                    customButtons[i].setInteractive(true);
                    customButtons[i].visible = true;
                    reduceHeader.y = 130;
                    customHeader.y = 170;
                }
            }
            for (let i = 0; i < eatingElements.length; i++) {
                eatingElements[i].visible = false;
                eatingButtons[i].setInteractive(false);
                eatingButtons[i].visible = false;
            }
            for (let i = 0; i < reduceElements.length; i++) {
                reduceElements[i].visible = false;
                reduceButtons[i].setInteractive(false);
                reduceButtons[i].visible = false;
            }
        }

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
            let element = this.add.text(725, 200 + (22*customArray.length), task, {
                fontFamily: 'Stardew_Valley',
                color: 'black'
            });
            element.visible = false;
            customElements.push(element);
        }

        function addFood(task) {
            let index = eatingArray.indexOf(task);
            food += eatingPoints[index];
        }

        function addToy(task) {
            let index = reduceArray.indexOf(task);
            toys += reducePoints[index];
        }

        function addEnergy(task) {
            let index = customArray.indexOf(task);
            energy += customPoints[index];
        }
        
        this.food_button = this.add.image(120, 500, 'button').setScale(10);
        this.add.image(120, 500, 'food').setScale(0.2);

        this.toy_button = this.add.image(320, 500, 'button').setScale(10);
        this.add.image(320, 500, 'toy').setScale(0.14);

        this.energy_button = this.add.image(520, 500, 'button').setScale(10);
        this.add.image(520, 500, 'energy').setScale(0.13);

        this.add.image(120, 585, 'inventory').setScale(0.75);
        this.food_text = this.add.text(108, 568, foods + 'x', {fontFamily: 'Stardew_Valley', fill : '#000000'}).setScale(1.8);

        this.add.image(320, 585, 'inventory').setScale(0.75);
        this.toy_text = this.add.text(309, 568, toys + 'x', {fontFamily: 'Stardew_Valley', fill : '#000000'}).setScale(1.8);

        this.add.image(520, 585, 'inventory').setScale(0.75);
        this.energy_text = this.add.text(508, 568, energy + 'x', {fontFamily: 'Stardew_Valley', fill : '#000000'}).setScale(1.8);

        this.add.image(160, 80, 'stat_bar').setScale(2.7);
        this.add.image(320, 80, 'stat_bar').setScale(2.7);
        this.add.image(480, 80, 'stat_bar').setScale(2.7);

        this.food_bar = this.add.sprite(160, 81, 'food_bar').setScale(2.62);
        this.toy_bar = this.add.sprite(320, 81, 'toy_bar').setScale(2.62);
        this.energy_bar = this.add.sprite(480, 81, 'energy_bar').setScale(2.62);
        
        // this.anims.create({
        //     key: 'raccoon_1_idle',
        //     frames: this.anims.generateFrameNumbers('raccoon_1_idle', { start: 0, end: 4 }),
        //     frameRate: 7,
        //     repeat: -1
        // });
        this.anims.create({
            key: 'raccoon_1_dance',
            frames: this.anims.generateFrameNumbers('raccoon_1_dance', { start: 0, end: 5 }),
            frameRate: 7,
        })

        this.anims.create({
            key: 'raccoon_1_idle_happy',
            frames: this.anims.generateFrameNumbers('raccoon_1_idle_happy', { start: 0, end: 2 }),
            frameRate: 7,
        })

        this.anims.create({
            key: 'raccoon_1_idle',
            frames: this.anims.generateFrameNumbers('raccoon_1_idle', { start: 0, end: 8 }),
            frameRate: 7,
        })

        this.anims.create({
            key: 'raccoon_1_jump',
            frames: this.anims.generateFrameNumbers('raccoon_1_jump', { start: 0, end: 8 }),
            frameRate: 7,
        })

        this.anims.create({
            key: 'raccoon_1_panic',
            frames: this.anims.generateFrameNumbers('raccoon_1_panic', { start: 0, end: 5 }),
            frameRate: 7,
        })

        this.anims.create({
            key: 'raccoon_1_turn',
            frames: this.anims.generateFrameNumbers('raccoon_1_turn', { start: 0, end: 3 }),
            frameRate: 7,
        })

        // this.raccoon_1 = this.add.sprite(310, 290, 'raccoon_1_idle').setScale(3);
        this.raccoon_1 = this.add.sprite(310, 290, 'raccoon_1_idle_happy')
    }

    update () {
        // this.raccoon_1.anims.play('raccoon_1_idle', true);
        this.raccoon_1.anims.play('raccoon_1_idle_happy', true);
    }
}

export default GameScene