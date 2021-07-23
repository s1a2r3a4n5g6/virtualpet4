var dog, database, foodS, foodStock;
var feed,addFood;
var fedTime, lastFed;
var foodObj;
var dogImg,happyDogImg;
var frameCountNow = 0;
var gameState = "hungry";
var gameStateRef;
var milk, input, name;
var bedroomIMG, gardenIMG, washroomIMG,sleepIMG,runIMG,milkImg;


function preload(){
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroomIMG  = loadImage("images/Bed_Room.png");
  gardenIMG   = loadImage("images/Garden.png");
  washroomIMG = loadImage("images/Wash_Room.png");
  sleepIMG    = loadImage("images/Lazy.png");
  runIMG      = loadImage("images/running.png");
  livingroom  = loadImage("images/Living_Room.png");
  milkImg=loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodObj =new Food();
   foodStock = database.ref("Food");
   foodStock.on("value", readStock);

  

   dog = createSprite(250,250,10,10);
   dog.addImage(dogImg);
   dog.scale = 0.15;
   foodStock = database.ref("Food");
   foodStock.on("value", readStock);
   foodStock.set(20);
   milkBotltle1 = createSprite(140,435,10,10);
   milkBotltle1.addImage(milkImg);
   milkBotltle1.scale = 0.025;
 
   milkBotltle2 = createSprite(210,280,10,10);
   milkBotltle2.addImage(milkImg);
   milkBotltle2.scale = 0.025;
   milkBotltle2.visible = false;
  

   

}


function draw() {  
  background("green");
  foodObj.display();
  writeStock(foodS);
  

  if (foodS == 0){
    dog.addImage(happyDogImg);
    milkBotltle2.visible = false;
  }else{
    dog.addImage(dogImg);
    milkBotltle2.visible = true;
  }

 // foodObj.getFoodStock();
  getGameState();

  if(gameState === 1){
    dog.addImage(happyDogImg);
    dog.scale=0.075;
    dog.y = 250;
  }

  if(gameState === 2){
    dog.addImage(dogImg);
    dog.scale=0.175;
    milkBotltle2.visible = false;
    dog.y = 250;
  }

var Bath =createButton("I want to take bath");
Bath.position(580,125);

if(Bath.mousePressed(function(){
  gameState = 3;
  database.ref('/').update({'gameState':gameState});
}));

if(gameState === 3){
  dog.addImage(washroomIMG);
  dog.scale =1;
  milkBotltle2.visible = false;
}

var Sleep=createButton("I am very sleepy");
Sleep.position(710,125);

if(Sleep.mousePressed(function(){
  gameState = 4;
  database.ref('/').update({'gameState':gameState});
}));

if(gameState === 4){
  dog.addImage(bedroomIMG);
  dog.scale =1;
  milkBotltle2.visible = false;
}

var Play=createButton("Lets Play !");
Play.position(500,125);

if(Play.mousePressed(function(){
  gameState = 5;
  database.ref('/').update({'gameState':gameState});
}));

if(gameState === 5){
  dog.addImage(livingroom);
  dog.scale =1;
  milkBotltle2.visible = false;
}

var PlayInPark=createButton("Lets Play in the Park!");
PlayInPark.position(585,160);

if(PlayInPark.mousePressed(function(){
  gameState = 6;
  database.ref('/').update({'gameState':gameState});
}));

if(gameState === 6){
  dog.addImage(gardenIMG);
  dog.scale =1;
  milkBotltle2.visible = false;
}

//  if(currentTime === lastFed + 1){
 //   gameState = "playing";
//    updateGameState();
//    foodObj.garden();
//  }
//  else if(currentTime === lastFed + 2){
//    gameState = "sleeping";
//    updateGameState();
//    foodObj.bedroom();
//  }
//  else if(currentTime > lastFed + 2 && currentTime <= lastFed + 4){
//    gameState = "bathing";
//    updateGameState();
//    foodObj.washroom();
//  }
//  else {
//    gameState = "hungry";
//    updateGameState();
//    foodObj.display();
 // }



//  if(gameState === "hungry"){
//    feed.show();
//    addFood.show();
//    dog.addAnimation("hungry",dogImg);
//  }
//  else {
//    feed.hide();
//    addFood.hide();
//    dog.remove();
//  }



  drawSprites();


  textSize(32);
  fill("red");
  textSize(20);
  text("Milk Bottles Remaining  "+foodS,170,440);
}
  



function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref("/").update({
    Food:x
  });
}



// function feedDog(){
//  foodObj.deductFood();
//  foodObj.updateFoodStock();
//  dog.changeAnimation("happy", happyDogImg);
//  gameState = "happy";
//  updateGameState();

//  foodObj.updateFoodStock(foodObj.getFoodStock()- 1)
//  database.ref('/').update({
//    Food: foodObj.getFoodStock(),
//    FeedTime: hour()
//  })

//  }

//function addFoodS(){
//  foodS ++;
//  database.ref('/').update({
//  Food: foodS
//  })
//}

  
  function getGameState(){
    gameStateRef = database.ref('gameState');
    gameStateRef.on("value",function(data){
      gameState = data.val();
    });
  }
  
  function updateGameState(){
    database.ref('/').update({
      gameState: gameState
    })
  }

