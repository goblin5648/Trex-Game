var trex,ground;
var trex_collided;
var trex_running, groundImage;
var invisibleGround;
var score;
var highscore;

var cloud,cloudImg,cloudsGroup;

var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclesGroup;

var gameState = "play";

var jumpSound, dieSound, checkpointSound;

function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
groundImage = loadImage ("ground2.png")
cloudImg =loadImage("cloud.png")
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
trex_collided = loadAnimation("trex_collided.png");

restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")

jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkpointSound = loadSound("checkpoint.mp3");

}

function setup(){
  createCanvas(windowWidth, windowHeight)
  
  //create a trex sprite
 trex = createSprite(50,height-60, 20, 50);
 trex.addAnimation("running", trex_running);
 trex.addAnimation("collided",trex_collided);
 trex.scale = 0.5;
 trex.x = 50;

 ground = createSprite(200,height-50,400,20);
 ground.addImage("ground",groundImage);

gameOver = createSprite(950,height-125);
gameOver.addImage(gameOverImg);

restart = createSprite(950,height-90);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5;

invisibleGround = createSprite (300,height-30,600,4);
invisibleGround.visible = false
score = 0;
highscore = 0;

cloudsGroup = new Group();
obstaclesGroup = new Group ();

var number = Math.round(random(-10,10))
console.log(number)

if(number > 0){
  console.log("positive");
}

else if (number< 0){
  console.log("negative");
}

else{
  console.log("zero");
}
var number2 = Math.round(random(1,10))
console.log(number2)
console.log(number2 % 2)
//trex.setCollider("rectangle",0,0,500,trex.height);
}

function draw(){
  background("black");
  drawSprites();
//console.log(trex.y);

if(gameState == "play" ){
  gameOver.visible = false
  restart.visible = false
  if(keyDown("space") && trex.y >= 768){
    trex.velocityY = -15;
  }
  trex.velocityY = trex.velocityY + 0.9  ;
  ground.velocityX = -(3+3* score/100);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  drawClouds();

drawObstacles()

score = score + Math.round(getFrameRate()/60); 
if (score % 100 == 0&& score > 0){
  checkpointSound.play(); 
}

if (obstaclesGroup.isTouching(trex)){
  gameState = "end";
  dieSound.play();
}
}
else if(gameState == "end"){
gameOver.visible = true
restart.visible = true
cloudsGroup.setVelocityXEach(0);
obstaclesGroup.setVelocityXEach(0);
ground.velocityX = 0;
trex.velocityY = 0;
trex.changeAnimation("collided",trex_collided)
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(0);

obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);

if (keyDown("space")){
  gameState = "play"
  score = 0
  cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();
trex.changeAnimation("running",trex_running)
}
if (mousePressedOver(restart)){
  reset();
}
if(score > highscore){
  highscore = score;
}
}
text("score: "+score,1600,20);
text("high score: "+ highscore,1480,20)
trex.collide(invisibleGround);
}

function drawClouds(){
  if(frameCount % 80 == 0){
cloud = createSprite(1650,height-80,50,20)
cloud.y = Math.round(random(750,420));
cloud.addImage(cloudImg)
cloud.velocityX = -3
cloud.scale = 0.5
cloud.depth = trex.depth;
trex.depth = trex.depth +1;
cloud.lifeTime = 200;
cloudsGroup.add(cloud);
}
}


function drawObstacles(){

  if(frameCount % 80 == 0){

  
obstacle = createSprite(1700,height-56,50,30)
obstacle.velocityX = -(6 + 3*score/100);
console.log(obstacle.velocityX);
var number = Math.round(random(1,6));
switch (number) {
  
  case 1: obstacle.addImage(obstacle1);
  break;
  
  case 2: obstacle.addImage(obstacle2);
  break;
  
  case 3: obstacle.addImage(obstacle3);
  break;
  
  case 4: obstacle.addImage(obstacle4);
  break;
  
  case 5: obstacle.addImage(obstacle5);
  break;
  
  case 6: obstacle.addImage(obstacle6);
  break;
 
  default: break;

}
obstacle.scale = 0.5;
obstacle.lifeTime = 500;
obstaclesGroup.add(obstacle);
}
}

function reset(){
  gameState = "play"
  score = 0
  highscore = 0
  cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();
trex.changeAnimation("running",trex_running)  
}


