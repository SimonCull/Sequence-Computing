let gameEngine;
function setup(){
  gameEngine = new GameEngine(new SnakeGame());
}

function draw(){
  gameEngine.run();
}

function keyPressed(){
  gameEngine.keyPressed(keyCode);
}

function mouseClicked(){
  gameEngine.mouseClicked();
}
}