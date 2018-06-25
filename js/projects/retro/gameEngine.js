/*
/////////////////////////////////////////////////////////////////////
Template for a game to be passed as argument to the GameEngine class
/////////////////////////////////////////////////////////////////////

class gameTemplate{
  constructor(){
    this.title ="Game Title";
    this.size = createVector(width, height);
    this.loaded = false;
    //Create all variables in load() function so they are correctly reset when
    //the game reloads
  }
  
  load(){
    if(this.loaded){
      return true;
    }
    if(!this.loading){
      this.loading = true;
      console.log('LOADING GAME: '+this.title);
      //trigger 1 time processes and set up variables

    }else{
      //trigger iterative processes
      
      this.loaded = state of processess necessary to be considered "loaded"
    }
  }
  
  run(){
    //returns false to Game Over, true to continue
  }
  
  reset(){
    this.loading = false;
    this.loaded = false;
  }
  
  keyPressed(keyCode){
    //optional for controls
  }
  mouseClicked(mouseX,mouseY){
    
  }
}
*/

class GameEngine{
  constructor(game){
    this.game = game;
    this.gameStates= {
      ERROR   : -1,
      WAITING : 0,
      LOADING : 1,
      RUNNING : 2,
      END     : 3
    };
    this.gameState = this.gameStates.WAITING;
    this.loaded = false;
    this.loaders = [this.game];
    this.canvas = createCanvas(game.size.x,game.size.y);
    this.canvas.parent(game.title.toLowerCase()+'-parent');
  }
  
  load(){
    if(!this.loading){
      this.loading = true;
      //trigger 1 time processes
      console.log('LOADING GAME ENGINE');
    }else{
      this.loaders.forEach(loader=>loader.load()); 
    }
    return this.loaders.every(loader => {return loader.loaded === true });
  }
  
  run(){
    //Standard bits
    background(this.game.background ? this.game.background : 51);
    fill(this.game.fill ? this.game.fill : 255);
    try{
      switch(this.gameState){
        case this.gameStates.ERROR:
          background(255,0,0);
          textAlign(CENTER, CENTER);
          console.error("ERROR: "+ this.errorMessage);
          text("ERROR", width*0.5, height *0.4);
          text(this.errorMessage, width*0.5, height *0.5);
          break;
        case this.gameStates.WAITING:
          textAlign(CENTER, CENTER);
          text(this.game.title.toUpperCase(), width*0.5, height *0.4);
          text("Click to start", width*0.5, height *0.5);
          break;
        case this.gameStates.LOADING:
          if(this.load()){
            this.gameState = this.gameStates.RUNNING;
          }
          break;
        case this.gameStates.RUNNING:
          if(!this.game.run()){
            console.log("Game Over.");
            this.gameState=this.gameStates.END;
          }
          break;
        case this.gameStates.END: 
          text("Game Over.", width*0.5, height *0.5);
          this.game.reset();
          setTimeout(()=>this.gameState=this.gameStates.WAITING, 3000);
          break;
        default:
          throw "Unknown gameState: "+this.gameState;
      }
    }catch(e){
      this.errorMessage = e;
      this.gameState = this.gameStates.ERROR;
    }
  }
  
  mouseClicked(){
    if(mouseY > this.canvas.elt.clientTop && mouseY < this.canvas.elt.clientTop + this.canvas.height && mouseX > this.canvas.elt.clientLeft && mouseX < this.canvas.elt.clientLeft + this.canvas.width){
      if(this.gameState === this.gameStates.WAITING){
        this.gameState = this.gameStates.LOADING;
      }else if(this.game && this.game.mouseClicked){
        this.game.mouseClicked(mouseX, mouseY);
      }
    }
  }
  
  keyPressed(){
    if(this.game && this.game.keyPressed){
      this.game.keyPressed(keyCode);
    }
  }
}