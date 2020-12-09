var player1, player2;
var edges,fireG;
var BGimg;
var BlueDragon, RedDragon, fireimg, fire;
var score = 0;
var player5;
var BDragon;
var enemyG,gameOver, gameOverImg;
var gameState = "Start";

function preload()
{
   Bgimg = loadImage("background.jpg");
     gimg = loadAnimation("tenor.gif")  ;  
     gameOverImg = loadImage("gameover.jpg") 
 
   RedDragon = loadAnimation("d1.jpg","d2.jpg","d3.jpg");
  BlueDragon = loadAnimation("dragon1.png","dragon2.png","dragon3.png");
   // fireimg = loadImage("firesprite1.png");
  updragon = loadAnimation("dragonimg1.png","dragonimg2.png","dragonimg3.png");
 fireimg = loadAnimation("Fireball.png");
downdragon = loadAnimation("Dragonsprite1.png","Dragonsprite2.png","Dragonsprite3.png")
BDragon = loadAnimation("DragonP1.png","DragonP2.png","DragonP3.png","DragonP4.png","DragonP5.png")
}
 
function setup() {
  createCanvas(windowWidth,windowHeight);
  background = createSprite(0,0,width,height);
  player1 = createSprite(width/2,height/2,10,10);
  player1.addAnimation("Dragon",RedDragon);
 player1.visible = false;
 player1.debug = true;
  
  enemyG = new Group();
  

console.log(windowWidth,windowHeight);
  fireG = new Group();
  
  edges = createEdgeSprites();
}

function draw() {
 // background(Bgimg);
 if(gameState === "Start"){
  background = createSprite(width/2,height/2,width,height);
   background.shapeColor = "white";
   var start = createSprite(width/2,height/2,50,50);
   if(mousePressedOver(start)){
     gameState = "play";
     start.visible = false;
   }
 }
if(gameState === "play"){
  background.scale = 2;
  background.addImage(Bgimg);
  background.velocityX = -(10 + score * 2);
  if (background.x < 650){
    background.x = background.width/2
  }
player1.visible= true;

  if(keyDown(RIGHT_ARROW)){
    //player1.velocityX = 5;
    player1.x = player1.x + 5
  
  }
  if(keyDown(LEFT_ARROW)){
   // player1.velocityX = -5;
    player1.x = player1.x - 5
  }
  if(keyDown(UP_ARROW)){
   // player1.velocityY = -5;
    player1.y = player1.y - 5
  }
  if(keyDown(DOWN_ARROW)){
   // player1.velocityY = 5;
    player1.y = player1.y + 5
  }
 if (keyDown("space"))
{
  dragonfire(); 
}
enemies();
for(var i = 0;i<enemyG.length;i ++){
  if(enemyG.get(i).isTouching(fireG)){
    enemyG.get(i).destroy();
    score = score + 1;
  }
}
}
  for(var i = 0;i<enemyG.length;i ++){
    if(enemyG.get(i).isTouching(player1)){
      player1.destroy();
      gameState = "end";
         }
  }  

if(gameState === "end"){
 
 
  enemyG.destroyEach();
  fireG.destroyEach();
  background = createSprite(width/2,height/2,width,height);
  background.addImage(gameOverImg);
  background.scale = 6.5;
  //background("black");
  
}



  drawSprites();
  textSize(35)
  strokeWeight(5);
  stroke("white");
  fill ("green");
   text("Points: "+score,width/2-80,30)
}

function dragonfire(){
  fire = createSprite(100,100);
  fire.addAnimation("fires",fireimg);
  fire.x = player1.x +100;
  fire.y = player1.y;
  fire.velocityX = 7;
  fire.lifetime = 460;
  fireG.add(fire);
  //fire.visible = true;
  fire.scale = 0.2;
}

function enemies(){
  if(frameCount % 30 === 0){

  enemy = createSprite(Math.round(random(100,width)),Math.round(random(0,height)),20,20);
  enemy.velocityX = score * 2 + random(-3,3);
  var rand = Math.round(random(1,4));
  switch(rand){
    case 1: enemy.addAnimation("Dragon1",BlueDragon);
    break;
    case 2: enemy.addAnimation("UpDragon1",updragon);
    break;
    case 3: enemy.addAnimation("DownDragon1",downdragon);
    break;
    case 4: enemy.addAnimation("BlueDragon",BDragon);
    break;
    default:break;
    }
    enemyG.add(enemy);
    enemy.bounceOff(edges);
  }
}
