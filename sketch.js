//Create variables here
var canvas;
var dog, happyDog, database, foodStock;
var foodS = 0;
var dogImg, happyDogImg;

function preload() {
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
  canvas = createCanvas(500, 500);
  dog = createSprite(300, 250, 10, 10);
  dog.addImage("dog1", dogImg);
  dog.addImage("dog2", happyDogImg);

  dog.scale = 0.5
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {
  background(46, 139, 87);

  //feed th edog by pressing the up arrow key

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.changeAnimation("dog2", happyDogImg);
    console.log("hello")
  } //else {
  //   dog.changeAnimation("dog1", dogImg);
  // }
  drawSprites();
  //add styles here
  textAlign(CENTER, CENTER)
  textSize(25);
  fill("white");
  text("Press Up Arrow key to feed Brownie!", 250, 20);
  text("Food Stock Level: " + foodS, 150, 70);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0
  } else {
    x = x - 1
  }
  database.ref("/").update({
    Food: x
  })
}

