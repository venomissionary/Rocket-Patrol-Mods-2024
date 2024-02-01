class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
      
    }

    
    create() {

      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
      this.MoonImage = this.add.tileSprite(0,0,1200, 720, 'Moon').setOrigin(0,0).setScale(0.5).setPosition(20,0)
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)


      this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

      this.greenAlien = new Spaceship(this, game.config.width, Phaser.Math.Between(100,300), 'NotSpaceInvadertrustme', 0, 40).setOrigin(0, 0)  //new enemy type.
      this.ship01 = new Spaceship(this, game.config.width, Phaser.Math.Between(125,200), 'spaceship', 0, 30).setOrigin(0, 0);
      this.ship02 = new Spaceship(this, game.config.width, Phaser.Math.Between(250,260), 'spaceship', 0, 20).setOrigin(0,0) //SpaceShips will move at different heights 
      this.ship03 = new Spaceship(this, game.config.width, Phaser.Math.Between(300,380),'spaceship', 0, 10).setOrigin(0,0)


    
       keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
       keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)


       this.p1Score = 0

       let scoreConfig = {
        fontFamily: 'EightBitext, Courier',
        fontSize: '32px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
    }

    this.time.addEvent({
      delay: 30000,
      callback: this.fasterShipSpeed, //"It's own timer and calls fasterShipSpeed after 30 secs"
      callbackScope: this
    }) 

    this.startTime = this.time.now
    this.totalTime = game.settings.gameTimer
   
    scoreConfig.fixedWidth = 0
    
    console.log('Game Timer:', game.settings.gameTimer)
    
   this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
   this.timeLeft = this.add.text(game.config.width/2, game.config.height/2 + 64, '', scoreConfig).setOrigin(0.5).setScale(0.8).setPosition(500,70)

    this.gameOver = false

    scoreConfig.fixedWidth = 0

    this.startTime = this.time.now
    this.totalTime = game.settings.gameTimer

    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'Button2').setOrigin(0.3).setScale(0.2).setDisplaySize(300,300)
        .setPosition(250,220)
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5).setPosition(310,180)

        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart \nor <- for Menu', scoreConfig).setOrigin(0.5).setScale(0.5).setPosition(310,250) //game over menu 
        this.add.text(game.config.width/2, game.config.height/2, 'HighScore', scoreConfig).setOrigin(0.5).setPosition(310,300)
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize -borderPadding, 
        `${highScore}`, scoreConfig).setOrigin(0.5).setPosition(320, 370).setScale(1)
       
        this.scoreLeft.setAlpha(0)
        this.timeLeft.setAlpha(0)
    }, null, this)

  
  }

    update() {
        this.MoonImage.tilePositionX -= 0.8 //moon tilesprite moves along side the background
        this.starfield.tilePositionX -= 0.3
        if (!this.gameOver) {

        this.p1Rocket.update()             
        this.ship01.update()               
        this.ship02.update()
        this.ship03.update()
        this.greenAlien.update() //new alien sprite. 40 points 


        const currentTime = this.time.now;
        const runningTime = currentTime - this.startTime
        const remainingTime = Math.max(0, Math.ceil(this.totalTime - runningTime)); //timer display 
        const remainingSec = Math.ceil(remainingTime / 1000);
        this.timeLeft.setText(`Time: ${remainingSec}`)

        if (remainingTime <= 0) {
          this.gameOver = true

          
        }


    }

         if (this.checkCollision(this.p1Rocket, this.greenAlien)) {
          this.p1Rocket.reset()
          this.shipExplode(this.greenAlien)
        } 

       if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03) 
        }
        
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)   

        }
        
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)   
           
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
          }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

    }

    fasterShipSpeed() {
      if (!this.spaceshipSpeed) {
        this.greenAlien.increaseSpeed()
        this.ship03.increaseSpeed()
        this.ship02.increaseSpeed() //boost ships speed 
        this.ship01.increaseSpeed()
      }
    }
    
   

   checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }

    


    shipExplode(ship) {
        ship.alpha = 0
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')           
        
        boom.on('animationcomplete', () => {   
          ship.reset()                         
          ship.alpha = 1                      
          boom.destroy()
          const soundEffects = ['Sound1', 'Sound2','Sound3', 'Sound4']
          const randomize = soundEffects[Math.floor(Math.random() * soundEffects.length)] //4 explosion sounds played randomly
          this.sound.play(randomize)
          this.scoreLeft.text = this.p1Score

          if (this.p1Score > highScore) {
            highScore = this.p1Score
          }

        })       
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
      }


    
}