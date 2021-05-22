var player,ground,coinsGroup,obstaclesGroup,obstacleImg,coinsImg,groundImg,playerImg,coinScore,gameOver
gameState,gameOverimg,reset,resetImg,coinSound,gameOverSound,resetTap,obstacleTouchingSound;
var playerStop
var score = 0;
function preload(){
  obstacleImg = loadImage("Images/Pad_01_2.png")
  coinsImg = loadImage("Images/Coin_03.png")
  groundImg = loadAnimation("Images/road5.jpg")
  playerImg = loadAnimation("Images/player1.png","Images/player2.png","Images/player3.png",
  "Images/player4.png","Images/player5.png","Images/player6.png")
  playerStop = loadImage("Images/player4.png") 
  gameOverimg = loadImage("Images/gameover.png")
  resetImg = loadImage("Images/reset.png")
  coinSound = loadSound("Images/coinbonus.wav");
  gameOverSound = loadSound("Images/gameOver.wav")
  resetTap = loadSound("Images/mouseClick.wav")
  obstacleTouchsound = loadSound("Images/obstacletouching.wav")




       




}

function setup() {
  createCanvas(600,800);
  gameState = "play";
 ground = createSprite(300,200);
 ground.scale =1.5;
 ground.addAnimation("r",groundImg);
 player = createSprite(300, 700, 50, 50);
 player.addAnimation("run",playerImg)
 gameOver = createSprite(300,300);
 gameOver.visible = false;
 gameOver.addImage(gameOverimg)
 gameOver.scale = 0.5
 reset = createSprite(300,450);
 reset.addImage(resetImg);
 reset.visible = false;
 reset.scale = 0.3;
 coinsGroup = new Group()
 obstaclesGroup = new Group();
 coinScore = 0;
 score = 0;

}

function draw() {
  background(0);
  if(gameState === "play"){
  if(ground.y>450){
    ground.y = 200;
  }
  score = score + Math.round(getFrameRate()/60);
  ground.velocityY = 10+score/100;
  generateCoins();
  createObstacles();
  if(coinsGroup.isTouching(player)){
    coinScore += 1
    coinsGroup.destroyEach();
    coinSound.play();
    
   }
  
   
   
  if(obstaclesGroup.isTouching(player)){
   gameState = "end";
   obstacleTouchsound.play();
  }}
  if(gameState === "end"){
    gameOver.visible = true
    player.addAnimation("stop",playerStop)
    player.changeAnimation("stop",playerStop);
    ground.velocityY = 0;
    coinsGroup.destroyEach();
    obstaclesGroup.destroyEach();
    reset.visible = true;

    if(mousePressedOver(reset)){
      gameReset();
      resetTap.play();
  
    }

    
  }

  
  


  
 

  drawSprites();
  fill("aqua");
  text("COINS SCORE: " +coinScore,475,110);
  text("DISTANCE: " +score,475,150);

}
function gameReset(){
  gameState = "play";
  gameOver.visible = false;
  reset.visible = false;
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  player.changeAnimation("run",playerImg);
  coinScore = 0;
  ground.velocityY = 10;
  score = 0;    
  
}

function keyPressed(){
  if(keyCode ===RIGHT_ARROW && player.x<450){
    player.x += 150;

  }
  else if(keyCode ===LEFT_ARROW && player.x>150){
    player.x -= 150;
  }
}   

//coins will be generated through this  function
function generateCoins(){
    if(frameCount%60 === 0){
       coins = createSprite(50,0,10,10);
       coins.addImage(coinsImg);
       var number = Math.round(random(1,3))
       switch(number){
         case 1:coins.x = 150
         break;
         case 2:coins.x = 300
         break;
         case 3:coins.x = 450
         break;
       }
       coins.velocityY = 20+score/100;
       coins.lifetime = 350;
       coins.scale = 0.1;
       coinsGroup.add(coins)
    
    }
}

function createObstacles(){
  if(frameCount%95 === 0){
    obstacles = createSprite(50,0,20,10);
    obstacles.addImage(obstacleImg);
    var number = Math.round(random(1,3))
    switch(number){
      case 1:obstacles.x = 150;
      break;
      case 2:obstacles.x = 300;
      break;
      case 3:obstacles.x = 450;
      break;
    }
    obstacles.velocityY = 20+score/100;
    obstacles.lifetime = 350;
    obstacles.scale = 0.1;
    obstaclesGroup.add(obstacles);
  }
}