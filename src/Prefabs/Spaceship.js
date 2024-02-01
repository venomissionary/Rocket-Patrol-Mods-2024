class Spaceship extends Phaser.GameObjects.Sprite {
     constructor(scene, x, y, texture, frame, pointValue, randomDirection) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
      

     }

     update() {
        this.x -= this.moveSpeed
      
      if(this.x <= - this.width) {
            this.x = game.config.width
       }
  
     }

     reset() {
        this.x = game.config.width
     }

     increaseSpeed() {
        this.moveSpeed += 2 //increases speed by 2 when called
     }
}