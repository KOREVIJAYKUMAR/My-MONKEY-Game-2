var PLAY = 1;
var END = 0;
var gameState = PLAY;

var survivalTime=0;

var monkey, monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;

var ground;

var foodGood, obstacleGroup;


function preload(){
  
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 200);
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(0,190,2200,10);
  ground.x = ground.width /2;
  //ground.velocityX = -(6 + 3*SurvivalTime/100);
      
   
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,490,500);
  monkey.debug = false;

  
}

function draw() {
   background("blue");
  
  monkey.collide(ground); 
  
  if (gameState===PLAY){
    
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");   
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50);
  
    
     if(keyDown("space") && monkey.y >= 139) {
     monkey.velocityY = -12;
    }
    
    
    monkey.velocityY = monkey.velocityY + 0.6
    
    
     if(monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
  }
    
    
      if(monkey.isTouching(obstacleGroup)){
        gameState = END;
  } 
    
    
      spawn_banana();
      spawn_obstacle();
  
  }
  
  
  
  else if (gameState === END ){
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
     stroke("white");
     textSize(20);
     fill("white");
  
     stroke("black");
     textSize(20);
     fill("black");
    
     text("Survival Time:0 "+ survivalTime,100,50);
   
  }
     
  drawSprites();
}

function spawn_banana() {
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
  
}

function spawn_obstacle() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);    
    obstacle.y = Math.round(random(170,170));
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
    obstacleGroup.add(obstacle);
  }
}

  