class Animation {
  constructor(canvasId, fillColor){
    this.squareSize = 60; //gridSize;
    this.fillColor = fillColor;
    this.canvasId = canvasId;
    this.animationFrameId = 0;
  }

  initMemoryArray() {
    this.memory = new Array(this.squareSize);
    for (let i = 0; i < this.squareSize; i += 1) {
      this.memory[i] = new Array(this.squareSize);
    }
  }

  oneStep() {
    this.drawSquare(this.posX, this.posY);
    this.posX++
    if (this.posX >= this.squareSize) {
      this.posY++;
      this.posX = this.posY;

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
    this.xDis = width/this.squareSize;
    this.yDis = height/this.squareSize;
    console.log('xDis:', this.xDis);
    console.log('yDis:', this.yDis);
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

const baphomet = new Animation('canvas', '#FF0000');
baphomet.startup();
