// Uses requestAnimationFrame Polyfill
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// ... as an external resources hosted with Assets

class Baphomet {
  constructor(canvasId, fillColor){
    this.squareSize = 30;
    this.fillColor = fillColor;
    this.canvasId = canvasId;
    this.xDis = 10;
    this.yDis = 10;
    this.animationFrameId = 0;
    this.memory; //The grid.

    //this.startup();
  }

  initMemoryArray() {
    this.memory = new Array(this.squareSize -1);
    for (let i = 0; i < this.squareSize; i += 1) {
      this.memory[i] = new Array(this.squareSize -1);
    }
  }

  oneStep() {
    this.drawSquare(this.posX, this.posY);
    this.posX++
    if (this.posX >= this.squareSize) {
      this.posX = this.posY;
      this.posY++;

      if (this.posY >= this.squareSize) {
        this.checkEnd();
      }
    }
  }

  checkEnd() {
    let size = this.squareSize;
    if (this.memory[size-1][size-1]) {
      this.end();
    }
  }

  drawSquare(x, y) {
    this.context.fillRect(x * this.xDis, y * this.yDis, this.xDis, this.yDis);
    this.memory[x][y] = true;
  }

  startup() {
    let width = window.innerWidth,
        height = window.innerHeight;

    this.canvas = document.getElementById(this.canvasId);
    this.context = document.getElementById(this.canvasId).getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context.fillStyle = this.fillColor;

    this.posX = 0;
    this.posY = 0;
    this.xDis = width/this.squareSize;
    this.yDis = height/this.squareSize;

    this.initMemoryArray();

    this.drawLoop = () => {
      this.animationFrameId = requestAnimationFrame(this.drawLoop);
      this.oneStep();
    }
    this.drawLoop();
  }

  end(){
    cancelAnimationFrame(this.animationFrameId);
    this.startup();
  }
}

const baphomet = new Baphomet('canvas', '#FF0000');
baphomet.startup();
