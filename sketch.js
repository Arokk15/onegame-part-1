var bg, bgImg;
var player, shooterImg, shooter_shooting;
var inwall=[]
var bulletlimg,bulletrimg
var bullet,bulletg
var nob=10
var gameover,goimg

function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  bulletlimg=loadImage("assets/bulletl.png")
  bulletrimg=loadImage("assets/bulletr.png")
  goimg=loadImage("assets/gameover.jpg")


}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(windowWidth / 2 - 20, windowHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  gameover = createSprite(windowWidth / 2 - 20, windowHeight / 2 - 40, 20, 20)
  gameover.addImage(goimg)
  gameover.scale = 2
  gameover.visible=false

  //creating the player sprite
  player = createSprite(windowWidth/2, windowHeight/2+100, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 500)

  inwall0=createSprite(0,windowHeight/2+250,5,500)
  inwall1=createSprite(windowWidth,windowHeight/2+250,5,500)
  inwall2=createSprite(windowWidth/2,windowHeight/2,width,5)
  inwall3=createSprite(windowWidth/2,windowHeight-1,width,5)

  inwall=[inwall0,inwall1,inwall2,inwall3]

  bulletg=new Group()
  

}

function draw() {
  background(0);




  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 30
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)
    bullet=createSprite(player.x,player.y-25)
    bullet.addImage("bullet",bulletrimg)
    bullet.scale=0.2
    bullet.velocityX=50
    bulletg.add(bullet)
    nob=nob-1

  }
  if(nob<=0){
    player.destroy()
    bulletg.destroyEach()
    gameover.visible=true
    bg.visible=false
    nob=0

    

  }
  

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }

  for(var i=0;i<inwall.length;i++){
    player.collide(inwall[i])
    inwall[i].visible=false
  }

  


  drawSprites();
  fill("red")
  textSize(20)
  text("Av blt :"+nob,width/2-100,50)

}
