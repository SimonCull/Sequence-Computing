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
    this.loaded = false;
  }

  load(){
    if(this.loaded){
      return true;
    }
    if(!this.loading){
      this.loading = true;
      console.log('LOADING GAME: '+this.title);
      this.snake = new Snake(this.size.x/2,this.size.y/2);
      this.food = new Food();
      frameRate(5);
    }else{
      //trigger iterative processes
      
      this.loaded=true;
    }
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
  
   reset(){
    this.loading = false;
    this.loaded = false;
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
    this.body.every(segment => rect(segment.x,segment.y, this.size, this.size));
  }
  
  checkCollisions(target){
    return this.body.some(
      segment =>{
        return (target   != segment              &&
                target.x >= segment.x            &&
                target.x <  segment.x+ this.size &&
                target.y >= segment.y            &&
                target.y <  segment.y+ this.size);
        }
      );
  }
  
  hitSelf(){
    return this.body.some(
      segment=> {
          return this.checkCollisions(segment);
        }
      );
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