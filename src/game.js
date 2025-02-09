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
        this.load.image('expand_icon', 'assets/images/expand-button.png');
        this.load.image('collapse_icon', 'assets/images/collapse-button.png');

        this.load.image('food', 'assets/images/apple.png');
        this.load.image('toy', 'assets/images/toy.png');
        this.load.image('energy', 'assets/images/energy.png');

        this.load.image('stat_bar', 'assets/images/stat-bar.png');
        this.load.image('food_bar', 'assets/images/food-bar.png');
        this.load.image('toy_bar', 'assets/images/toy-bar.png');
        this.load.image('energy_bar', 'assets/images/energy-bar.png');

        // this.load.spritesheet('raccoon_1_idle', 'assets/sprites/raccoon.png', { frameWidth: 32, frameHeight: 33 });
        this.load.spritesheet('raccoon_1_dance', 'assets/sprites/raccoon-1/dance.png', { frameWidth: 270, frameHeight: 224 });
        this.load.spritesheet('raccoon_1_idle_happy', 'assets/sprites/raccoon-1/idle-happy.png', { frameWidth: 232, frameHeight: 224 });
        this.load.spritesheet('raccoon_1_idle', 'assets/sprites/raccoon-1/idle.png', { frameWidth: 176.5, frameHeight: 158 }); // he's wiggly :(
        this.load.spritesheet('raccoon_1_jump', 'assets/sprites/raccoon-1/jump.png', { frameWidth: 175, frameHeight: 224 }); // also a bit rough
        this.load.spritesheet('raccoon_1_panic', 'assets/sprites/raccoon-1/panic.png', { frameWidth: 209, frameHeight: 198 });
        this.load.spritesheet('raccoon_1_turn', 'assets/sprites/raccoon-1/turn.png', { frameWidth: 301, frameHeight: 172 });

        this.load.audio('backgroundMusic', 'assets/audio/cute-bossa-nova.wav');
    }

    create () {
        let music = this.sound.add('backgroundMusic', { loop: true });
        music.play();
        
        this.add.image(0, 0, 'grass_background').setOrigin(0, 0).setScale(2.2);
        this.add.image(883, 315, 'task_board').setScale(10);
        this.add.image(320, 230, 'home_board').setScale(16);
        this.add.image(320, 230, 'raccoon_background').setScale(0.85);
        


        let eatingArray = [
            "(5) Maintain a compost bin to collect food waste for one week.",
            "(5) Plant fruits or vegetables in an at-home garden",
            "(5) Compile a list of plant-based and sustainable recipes.",
            "(3) Make a vegan meal for lunch or dinner.",
            "(3) Make a meal with seasonal food items",
            "(3) Buy food from a local farmer’s market",
            "(3) Make a meal plan for the week.",
            "(3) Make a meal with leftovers.",
            "(1) Research companies that sell whole, sustainable food.",
            "(1) Read a blog about sustainable food.",
            "(1) Try a new meat alternative.",
            "(1) Freeze extra food for a later meal."
        ];
        let eatingPoints = [5, 5, 5, 3, 3, 3, 3, 3, 1, 1, 1, 1];
        let eatingElements = [];
        let eatingButtons = [];
        this.eatingCompleted = Array(eatingPoints.length).fill(0);
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
                this.eatingCompleted[i] += 1;
                if (eatingPoints[i] >= 5) {
                    this.raccoon_1.anims.play('raccoon_1_dance', false);
                }
                foods += eatingPoints[i];
                if (foods > 0) {
                    this.food_button.setTint(0xffffff);
                }
                this.food_text.setText(foods + 'x');
                this.time.delayedCall(1000, () => {
                    corresponding_button.setTexture('unfinished_icon');
                }, [], this);
            });
            corresponding_button.on('pointerover', () => corresponding_button.setTint(0xcccccc));
            corresponding_button.on('pointerout', () => corresponding_button.setTint(0xffffff));
            eatingButtons.push(corresponding_button);
        }

        let reduceArray = [
            "(5) Buy a new energy efficient appliance.",
            "(3) Ride a bike to your destination.",
            "(3) Shop at a second-hand store.",
            "(3) Donate old clothing.",
            "(1) Use a reusable water bottle.",
            "(1) Bring a reusable cup the next time you go to a café or coffee shop.",
            "(1) Use reusable bags on your trip to the grocery store.",
            "(1) Carpool with your friends."
        ];
        let reducePoints = [5, 3, 3, 3, 1, 1, 1, 1];
        let reduceElements = [];
        let reduceButtons = [];
        this.reduceCompleted = Array(reducePoints.length).fill(0);
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
                this.reduceCompleted[i] += 1;
                if (recyclePoints[i] >= 5) {
                    this.raccoon_1.anims.play('raccoon_1_dance', false);
                }
                toys += reducePoints[i];
                if (toys > 0) {
                    this.toy_button.setTint(0xffffff);
                }
                this.toy_text.setText(toys + 'x');
                this.time.delayedCall(1000, () => {
                    corresponding_button.setTexture('unfinished_icon');
                }, [], this);
            });
            corresponding_button.on('pointerover', () => corresponding_button.setTint(0xcccccc));
            corresponding_button.on('pointerout', () => corresponding_button.setTint(0xffffff));
            reduceButtons.push(corresponding_button);
        }

        let recycleArray = [
            "(5) Organize a recycling drive in your community.",
            "(5) Recycle an old home appliance.",
            "(3) Make a bag out of old clothes.",
            "(3) Make a bird feeder out of a milk carton.",
            "(3) Make a planter out a plastic bottle.",
            "(3) Sort through old paper products to shred or recycle",
            "(1) Make a craft out of recycled bottles.",
            "(1) Bring old cans to a recycling center.",
            "(1) Recycle old batteries.",
            "(1) Repurpose old jars.",
            "(1) Collect five bottle caps to recycle."
        ];
        let recyclePoints = [5, 5, 3, 3, 3, 3, 1, 1, 1, 1, 1];
        let recycleElements = [];
        let recycleButtons = [];
        this.recycleCompleted = Array(recyclePoints.length).fill(0);
        for (let i = 0; i < recycleArray.length; i++) {
            let element = this.add.text(725, 210 + (22*i), recycleArray[i], {
                fontFamily: 'Stardew_Valley',
                fontSize: '20px',
                color: '#ed9705'
            });
            element.visible = false;
            recycleElements.push(element);

            let corresponding_button = this.add.image(700, 220 + (22*i), 'unfinished_icon').setScale(0.7);
            corresponding_button.visible = false;
            corresponding_button.setInteractive();
            corresponding_button.on('pointerdown', () => {
                corresponding_button.setTexture('done_icon');
                this.recycleCompleted[i] = 1;
                if (recyclePoints[i] >= 5) {
                    this.raccoon_1.anims.play('raccoon_1_dance', false);
                }
                energy += recyclePoints[i];
                if (energy > 0) {
                    this.energy_button.setTint(0xffffff);
                }
                this.energy_text.setText(energy + 'x');
                this.time.delayedCall(1000, () => {
                    corresponding_button.setTexture('unfinished_icon');
                }, [], this);
            });
            corresponding_button.on('pointerover', () => corresponding_button.setTint(0xcccccc));
            corresponding_button.on('pointerout', () => corresponding_button.setTint(0xffffff));
            recycleButtons.push(corresponding_button);
        }

        this.add.text(925, 50, "Tasks", {
            fontFamily: 'Stardew_Valley',
            fontSize: '35px',
            color: 'black',
        })
       
        let eatingCategoryButton = this.add.image(700, 103, 'collapse_icon');
            eatingCategoryButton.setInteractive();
            eatingCategoryButton.on('pointerdown', () => {
                displayEatingTasks();
            });
        let eatingHeader = this.add.text(720, 90, "Sustainable Eating: Food", {
            fontFamily: 'Stardew_Valley',
            fontSize: '25px',
            color: 'black'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', displayEatingTasks);
        
        let reduceCategoryButton = this.add.image(700, 413, 'expand_icon');
            reduceCategoryButton.setInteractive();
            reduceCategoryButton.on('pointerdown', () => {
                displayReduceTasks();
            });
        let reduceHeader = this.add.text(720, 400, "Reduce Waste: Toys", {
            fontFamily: 'Stardew_Valley',
            fontSize: '25px',
            color: 'black'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', displayReduceTasks);

        let recycleCategoryButton = this.add.image(700, 453, 'expand_icon');
            recycleCategoryButton.setInteractive();
            recycleCategoryButton.on('pointerdown', () => {
                displayrecycleTasks();
            });
        let recycleHeader = this.add.text(720, 440, "Recycling Tasks", {
            fontFamily: 'Stardew_Valley',
            fontSize: '25px',
            color: 'black'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', displayrecycleTasks);

        function displayEatingTasks() {
            console.log("hit");
            for (let i = 0; i < eatingElements.length; i++) {
                if (eatingElements[i].visible) {
                    eatingElements[i].visible = false;
                    eatingButtons[i].setInteractive(false);
                    eatingButtons[i].visible = false;
                    eatingCategoryButton.setTexture('expand_icon');
                    reduceCategoryButton.y = 145
                    reduceHeader.y = 130;
                    recycleCategoryButton.y = 185;
                    recycleHeader.y = 170;
                } else {
                    eatingElements[i].visible = true;
                    eatingButtons[i].setInteractive(true);
                    eatingButtons[i].visible = true;
                    eatingCategoryButton.setTexture('collapse_icon');
                    reduceCategoryButton.y = 415;
                    reduceHeader.y = 400;
                    recycleCategoryButton.y = 455;
                    recycleHeader.y = 440;
                    reduceCategoryButton.setTexture('expand_icon');
                    recycleCategoryButton.setTexture('expand_icon');
                }
            }
            for (let i = 0; i < reduceElements.length; i++) {
                reduceElements[i].visible = false;
                reduceButtons[i].setInteractive(false);
                reduceButtons[i].visible = false;
            }
            for (let i = 0; i < recycleElements.length; i++) {
                recycleElements[i].visible = false;
                recycleButtons[i].setInteractive(false);
                recycleButtons[i].visible = false;
            }
        }

        function displayReduceTasks() {
            for (let i = 0; i < reduceElements.length; i++) {
                if (reduceElements[i].visible) {
                    reduceElements[i].visible = false;
                    reduceButtons[i].setInteractive(false);
                    reduceButtons[i].visible = false;
                    reduceCategoryButton.setTexture('expand_icon');
                    recycleCategoryButton.y = 185;
                    recycleHeader.y = 170;
                } else {
                    reduceElements[i].visible = true;
                    reduceButtons[i].setInteractive(true);
                    reduceButtons[i].visible = true;
                    reduceCategoryButton.setTexture('collapse_icon');
                    recycleCategoryButton.y = 375;
                    recycleHeader.y = 360;
                    reduceCategoryButton.y = 145
                    reduceHeader.y = 130;
                    eatingCategoryButton.setTexture('expand_icon');
                    recycleCategoryButton.setTexture('expand_icon');
                }
            }
            for (let i = 0; i < eatingElements.length; i++) {
                eatingElements[i].visible = false;
                eatingButtons[i].setInteractive(false);
                eatingButtons[i].visible = false;
            }
            for (let i = 0; i < recycleElements.length; i++) {
                recycleElements[i].visible = false;
                recycleButtons[i].setInteractive(false);
                recycleButtons[i].visible = false;
            }
        }

        function displayrecycleTasks() {
            for (let i = 0; i < recycleElements.length; i++) {
                if (recycleElements[i].visible) {
                    recycleElements[i].visible = false;
                    recycleButtons[i].setInteractive(false);
                    recycleButtons[i].visible = false;
                    recycleCategoryButton.setTexture('expand_icon');
                } else {
                    recycleElements[i].visible = true;
                    recycleButtons[i].setInteractive(true);
                    recycleButtons[i].visible = true;
                    recycleCategoryButton.setTexture('collapse_icon');
                    reduceCategoryButton.y = 145;
                    reduceHeader.y = 130;
                    recycleCategoryButton.y = 185;
                    recycleHeader.y = 170;
                    eatingCategoryButton.setTexture('expand_icon');
                    reduceCategoryButton.setTexture('expand_icon');
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



        let foods = 1;
        let toys = 1;
        let energy = 1;

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
        this.food_bar_max_width = this.food_bar.width;
        this.food_bar_width = this.food_bar.width;
        this.time.addEvent({
            delay: 6000,
            callback: function () {
                if ((this.food_bar_width *= 0.95) <= 0.1) {
                    this.food_bar_width = 0;
                }
                else {
                    this.food_bar_width *= 0.95
                }
                if (this.food_bar_width > 0) {
                    this.food_bar.setCrop(0, 0, this.food_bar_width, 5);
                }
            },
            callbackScope: this,
            loop: true
        });
        this.add.text(100, 100, 'Hunger', {fontFamily: 'Stardew_Valley', fill : '#000000'}).setScale(1.8);

        this.toy_bar = this.add.sprite(320, 81, 'toy_bar').setScale(2.62);
        this.toy_bar_max_width = this.toy_bar.width;
        this.toy_bar_width = this.toy_bar.width;
        this.time.addEvent({
            delay: 2000,
            callback: function () {
                if ((this.toy_bar_width *= 0.95) <= 0.1) {
                    this.toy_bar_width = 0;
                }
                else {
                    this.toy_bar_width *= 0.95
                }
                this.toy_bar_width *= 0.95;
                if (this.toy_bar_width > 0) {
                    this.toy_bar.setCrop(0, 0, this.toy_bar_width, 5);
                }
            },
            callbackScope: this,
            loop: true
        });
        this.add.text(260, 100, 'Happiness', {fontFamily: 'Stardew_Valley', fill : '#000000'}).setScale(1.8);

        this.energy_bar = this.add.sprite(480, 81, 'energy_bar').setScale(2.62);
        this.energy_bar_max_width = this.energy_bar.width;
        this.energy_bar_width = this.energy_bar.width;
        this.time.addEvent({
            delay: 4000,
            callback: function () {
                if ((this.energy_bar_width *= 0.95) <= 0.1) {
                    this.energy_bar_width = 0;
                }
                else {
                    this.energy_bar_width *= 0.95;
                }
                if (this.energy_bar_width > 0) {
                    this.energy_bar.setCrop(0, 0, this.energy_bar_width, 5);
                }
            },
            callbackScope: this,
            loop: true
        });
        this.add.text(420, 100, 'Energy', {fontFamily: 'Stardew_Valley', fill : '#000000'}).setScale(1.8);
        
        this.received_food = false;
        this.food_button = this.add.image(120, 500, 'button').setScale(10);
        this.add.image(120, 500, 'food').setScale(0.2);
        this.food_button.setInteractive();
        this.food_button.on('pointerover', () => {
            if (foods > 0) {
                this.food_button.setTint(0xffffff);
            }
        });
        this.food_button.on('pointerdown', () => {
            if (foods > 0) {
                if (this.food_bar_width <= this.food_bar_max_width) {
                    this.food_bar_width += 10;
                    this.received_food = true;
                } else {
                    this.food_bar_width = this.food_bar_max_width;
                    alert("I'm not hungry!");
                }

                foods--;
                this.food_text.setText(foods + 'x');
                if (foods == 0) {
                    this.food_button.setTint(0xcccccc);
                }
            }
        });

        this.received_toy = false;
        this.toy_button = this.add.image(320, 500, 'button').setScale(10);
        this.add.image(320, 500, 'toy').setScale(0.14);
        this.toy_button.setInteractive();
        this.toy_button.on('pointerover', () => {
            if (toys > 0) {
                this.toy_button.setTint(0xffffff);
            }
        });
        this.toy_button.on('pointerdown', () => {
            if (toys > 0) {
                if (this.toy_bar_width <= this.toy_bar_max_width) {
                    this.toy_bar_width += 10;
                    this.received_toy = true;
                } else {
                    this.toy_bar_width = this.toy_bar_max_width;
                    alert("I don't need to play right now!");
                }

                toys--;
                this.toy_text.setText(toys + 'x');
                if (toys == 0) {
                    this.toy_button.setTint(0xcccccc);
                }
            }
        });

        this.received_energy = false;
        this.energy_button = this.add.image(520, 500, 'button').setScale(10);
        this.add.image(520, 500, 'energy').setScale(0.13);
        this.energy_button.setInteractive();
        this.energy_button.on('pointerover', () => {
            if (energy > 0) {
                this.energy_button.setTint(0xffffff);
            }
        });
        this.energy_button.on('pointerdown', () => {
            if (energy > 0) {
                if (this.energy_bar_width <= this.energy_bar_max_width) {
                    this.energy_bar_width += 10;
                    this.received_energy = true;
                } else {
                    this.energy_bar_width = this.energy_bar_max_width;
                    alert("I'm not tired!");
                }

                energy--;
                this.energy_text.setText(energy + 'x');
                if (energy == 0) {
                    this.energy_button.setTint(0xcccccc);
                }
            }
        });


        
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

        this.raccoon_1 = this.add.sprite(310, 290, 'raccoon_1_idle_happy').setScale(0.6);
    }

    update () {
        if (!this.eatingCompleted.includes(0) && !this.reduceCompleted.includes(0) && !this.recycleCompleted.includes(0)) {
            this.scene.start('EndingScene');
        }
        if (this.food_bar_width <= 0.1 || this.toy_bar_width <= 0.1 || this.energy_bar_width <= 0.1) {
            this.raccoon_1.anims.play('raccoon_1_panic', true);
        } 
        else if (this.received_food) {
            this.raccoon_1.anims.play('raccoon_1_dance', true);
            this.time.delayedCall(1000, () => {
                this.received_food = false;
            }, [], this);
            
        }
        else if (this.received_toy) {
            this.raccoon_1.anims.play('raccoon_1_turn', true);
            this.time.delayedCall(800, () => {
                this.received_toy = false;
            }, [], this);
        }
        else if (this.received_energy) {
            this.raccoon_1.anims.play('raccoon_1_dance', true);
            this.time.delayedCall(1000, () => {
                this.received_energy = false;
            }, [], this);
        }
        else if (Math.random() < 0.01) {
            this.raccoon_1.anims.play('raccoon_1_idle_happy', true);
        }
    }
}

export default GameScene