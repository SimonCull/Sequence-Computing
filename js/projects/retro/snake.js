const directions ={
      UP    : 0,
      RIGHT : 1,
      DOWN  : 2,
      LEFT  : 3
    };
    
class Food{
  constructor(){
    this.x = 10+floor(random(1, width/20))*20;
    this.y = 10+floor(random(1, height/20))*20;
  }
  
  run(){
    ellipseMode(CENTER);
    ellipse(this.x,this.y, 18, 18); 
  }
}

class SnakeGame{
  constructor(){
    this.title = "Snake";
    this.size = createVector(400,400);
  }
  
  load(){
    return new Promise((complete,error)=>{
      console.log("LOADING GAME: "+this.title);
      this.snake = new Snake(this.size.x/2,this.size.y/2);
      this.food = new Food();
      frameRate(5);
      complete(true);
    });
  }

  run(){
    this.food.run();
    let state = this.snake.run(this.food);
    if(state === -1)
        return false;
    else if(state === 1){
        this.food = new Food();
    }
    return true;
  }
  
  keyPressed(keyCode){
    if(this.snake)
      this.snake.setDirection(keyCode);
  }
}

class Snake{
  constructor(x, y){
    this.body = [];
    this.size = 20;
    this.direction = directions.UP;
    this.addSegment(x, y);
  }
  
  move(){
    let current = this.body[this.body.length-1];
    if(this.hitSelf()){
      return false;
    }
    switch(this.direction){
      case directions.UP:
        this.addSegment(current.x, (current.y-this.size < 0 ? height-this.size : current.y-this.size));
        break;
      case directions.DOWN:
        this.addSegment(current.x, (current.y+this.size >= height ? 0 : current.y+ this.size));
        break;
      case directions.LEFT:
        this.addSegment((current.x-this.size < 0 ? width-this.size : current.x-this.size), current.y);
        break;
      case directions.RIGHT:
        this.addSegment((current.x+this.size >= width ? 0: current.x+ this.size), current.y);
        break;
    }
    return true;
  }
  
  run(food){
    if(!this.move()){
      return -1;
    }
    this.draw();
    if(!this.checkCollisions(food)){
     this.body.shift();
     return 0;
    }
    return 1;
  }
  
  draw(){
    for(let segment of this.body){
      rect(segment.x, segment.y, this.size, this.size);
    }
  }
  
  checkCollisions(target){
    let current = this.body[this.body.length-1];
    return (target.x >= current.x &&
            target.x < current.x+ this.size &&
            target.y >= current.y &&
            target.y < current.y+ this.size);
  }
  
  hitSelf(){
    for(let i = 0; i < this.body.length-2; i++){
      if(this.checkCollisions(this.body[i])){
        return true;
      }
    }
    return false;
  }
  
  addSegment(x,y){
    this.body.push(createVector(x, y));
  }
  
  setDirection(keyCode){
    switch(keyCode){
      case UP_ARROW:
        if(this.direction!= directions.DOWN)
          this.direction = directions.UP;
        break;
      case DOWN_ARROW:
        if(this.direction!= directions.UP)
          this.direction = directions.DOWN;
        break;
      case LEFT_ARROW:
        if(this.direction!= directions.RIGHT)
          this.direction = directions.LEFT;
        break;
      case RIGHT_ARROW:
        if(this.direction!= directions.LEFT)
          this.direction = directions.RIGHT;
        break;
    }
  }
}