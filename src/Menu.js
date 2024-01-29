class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')

        this.load.image('Moon', './assets/Moon.png')
        this.load.image('starfield2', './assets/BackGround1.png')

        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')

        this.load.image('MenuButton1', './assets/Button.png');
        this.load.image('Button2', './assets/Button2.png');

        this.load.image('NotSpaceInvadertrustme', './assets/NewEnemy.png')

        this.load.audio('Music', './assets/TimeWarp.mp3')

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            
            endFrame: 9
        })
    }

    create() {
        this.space = this.add.tileSprite(0, 0, 640, 480, 'starfield2').setOrigin(0, 0).setAlpha(0.13)

        if (!ThemeSong || !ThemeSong.isPlaying) {
            ThemeSong = this.sound.add('Music',  {loop: true, volume: 0.5})
            ThemeSong.play()
        }

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'EightBitext',    
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        


        this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'MenuButton1').setOrigin(0.3).setScale(0.5).setDisplaySize(200,170)
        .setPosition(150,125)
        this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'MenuButton1').setOrigin(0.3).setScale(0.5).setDisplaySize(200,170)
        .setPosition(400,125)
        this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'Button2').setOrigin(0.3).setScale(0.5).setDisplaySize(275,250)
        .setPosition(100, 300)
        this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'Button2').setOrigin(0.3).setScale(0.5).setDisplaySize(200,150)
        .setPosition(450, 350)


        menuConfig.backgroundColor = '#FF933F'
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5).setPosition(325, 50).setScale(1.4)
        
       let EasyButton = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Easy \nmode', menuConfig).setOrigin(0.5).setPosition(190, 150).setScale(1.1).setInteractive()
        let HardButton = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Hard \nmode', menuConfig).setOrigin(0.5).setPosition(440, 150).setScale(1.1).setInteractive()

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'High Score', menuConfig).setOrigin(0.5).setPosition(485, 275).setScale(1.1)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Tutorial', menuConfig).setOrigin(0.5).setPosition(150, 260).setScale(1.1)

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Press <-> to move', menuConfig).setOrigin(0.5).setPosition(150, 300).setScale(0.7)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Press F to Fire', menuConfig).setOrigin(0.5).setPosition(150, 325).setScale(0.7)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'hit the spaceships\n to earn points!', menuConfig).setOrigin(0.5).setPosition(150, 375).setScale(0.6)

        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize -borderPadding, 
        `${highScore}`, menuConfig).setOrigin(0.5).setPosition(490, 380).setScale(1);

        
        EasyButton.on('pointerdown', () => {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 65000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        });

        HardButton.on('pointerdown', () => {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 50000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        });
    
    }

    update() {
        this.space.tilePositionX -= 0.2
    }

  }
