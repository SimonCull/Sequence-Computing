/*
/////////////////////////////////////////////////////////////////////
Template for a game to be passed as argument to the GameEngine class
/////////////////////////////////////////////////////////////////////

class gameTemplate{
  constructor(){
    this.title ="Game Title";
    this.size = createVector(width, height);
  }
  
  load(){
    return new Promise((complete,error)=>{
      //Load all game settings here
      //completes once everything loaded
    });
  }
  
  run(){
    //returns false to Game Over, true to continue
  }
  
  keyPressed(keyCode){
    //optional for controls
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
    this.loaders = [];
    createCanvas(game.size.x,game.size.y);
  }
  
  load(){
    return new Promise((resolve, reject)=>{
      console.log("LOADING GAME ENGINE");
      resolve(true);
    });
  }
  
  run(){
    //Standard bits
    background(51);
    fill(255);
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
          text("Press SPACE to start", width*0.5, height *0.5);
          break;
        case this.gameStates.LOADING:
          this.loaders.concat([this.load(), this.game.load()]);
          Promise.all(this.loaders).then(
            res=>{
              console.log("STARTING GAME: "+this.game.title);
              this.gameState=this.gameStates.RUNNING;
            },
            err=>{
              throw err;
            }
          ).catch(e=>{throw e;});
          break;
        case this.gameStates.RUNNING:
          if(!this.game.run()){
            this.gameState=this.gameStates.END;
          }
          break;
        case this.gameStates.END: 
          console.log("Game Over.")
          text("Game Over.", width*0.5, height *0.5);
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
  
  keyPressed(){
    if(keyCode== 32 && this.gameState == this.gameStates.WAITING){
      this.gameState = this.gameStates.LOADING;
    }
    if(this.game && this.game.keyPressed){
      this.game.keyPressed(keyCode);
    }
  }
}