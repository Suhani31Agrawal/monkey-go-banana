var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup,obstacleGroup;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(600,600);
  
  ground = createSprite(400,350,900,10);
  ground.x = ground.width /2;
  ground.velocityX=-4;
  console.log(ground.x);
  //ground.visible=false;
  
  monkey = createSprite(80,315,20,50);
  monkey.addAnimation("moving", monkey_running);

  monkey.scale = 0.1;
  
 
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {

  background(225);
  monkey.collide(ground);
  
  if(gameState === PLAY){
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.round(frameCount/frameRate());
    text("Survival Time: " + survivalTime,100,50);
      
    console.log(monkey.y)
  
    if (ground.x < 200){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && monkey.y>314) {
        monkey.velocityY = -20;  
    }
    
    spawnfood();
    spawnobstacle();
    
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
    }
 
    if(monkey.isTouching(obstacleGroup)){
        //trex.velocityY = -12;
        gameState = END;   
    }
  }
  else if(gameState === END){
    
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

  }
  drawSprites();
   }

function spawnfood() {
  if (frameCount % 250 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,150));
   banana.addImage(bananaImage);
    banana.scale = 0.5;
   banana.velocityX = -3;
    banana.scale=0.1;
  
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
    
   foodGroup.add(banana);
  }
}


function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(600,350,900,10);
    obstacle.y = Math.round(random(330,330));
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    obstacle.scale=0.1;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
   // banana.depth = monkey.depth;
   // monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}




