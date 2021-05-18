var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;
var button;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  button = createButton("Feed the dog");
  button.position(700,95);
  button.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref('FeedTime');
  
 
  //write code to display text lastFed time here
   if(lastFed == 0)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 12 AM",200,30);
  }
  else if(lastFed > 0 && lastFed <= 12 )
  {
    fill('white');
    textSize(20);
    text("Last Fed:" + lastFed + " AM",200,30);
  }
  else if(lastFed == 13)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 1 PM",200,30);
  }
  else if(lastFed == 14)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 2 PM",200,30);
  }
  else if(lastFed == 15)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 3 PM",200,30);
  }
  else if(lastFed == 16)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 4 PM",200,30);
  }
  else if(lastFed == 17)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 5 PM",200,30);
  }
  else if(lastFed == 18)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 6 PM",200,30);
  }
  else if(lastFed == 19)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 7 PM",200,30);
  }
  else if(lastFed == 20)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 8 PM",200,30);
  }
  else if(lastFed == 21)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 9 PM",200,30);
  }
  else if(lastFed == 22)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 10 PM",200,30);
  }
  else if(lastFed == 23)
  {
    fill('white');
    textSize(20);
    text("Last Fed: 11 PM",200,30);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0)
  {
    foodObj.updateFoodStock(food_stock_val * 0);
  }
  else
  {
    foodObj.updateFoodStock(food_stock_val - 1);
  }

  foodS--;
  database.ref('/').update({
    Food:foodS
  })

  lastFed = hour();

  database.ref('/').update({
    FeedTime: lastFed
  }) 
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
