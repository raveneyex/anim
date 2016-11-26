class Circle {
  constructor({canvasId, strokeColor}){
    this.fillColor = strokeColor;
    this.canvasId = canvasId;
    this.animationFrameId = 0;
  }

  oneStep() {
    if(!this.first && !this.second){
      if(this.firstRun){
        this.firstRun = false;
        this.context.beginPath();
      }
      this.first = this.drawCircle(false);
      this.step++;
      if(this.first){
        this.context.closePath();
        this.step = 0;
      }
    }

    if (this.first && !this.second) {
      if(this.secondRun){
        this.context.strokeStyle = '#FFFFFF';
        this.secondRun = false;
        this.context.beginPath();
      }
      this.second = this.drawCircle(true);
      this.step++;
      if(this.second) {
        this.context.closePath();
      }
    }

    if(this.first && this.second) {
      this.end();
    }
  }

  drawCircle(counter){
    let endAngle = this.stepSize * this.step,
        done = endAngle >= this.endAngle ? true: false;

    if (!counter) {
      this.context.arc(300, 300, 250, this.startAngle, endAngle);
      this.context.stroke();
    }

    if (counter){
      this.context.arc(300, 300, 210, endAngle, this.startAngle);
      this.context.stroke();

    }

    return done;
  }

  end() {
    cancelAnimationFrame(this.animationFrameId);
    this.startup();
  }

  startup() {
    this.canvas = document.getElementById(this.canvasId);
    this.context = document.getElementById(this.canvasId).getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.strokeStyle = this.fillColor ;
    this.context.fillStyle = this.fillColor;

    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.stepSize = this.endAngle/300;
    this.step = 0;
    this.first = false;
    this.second = false;
    this.firstRun = true;
    this.secondRun = true;

    this.drawLoop = () => {
      this.animationFrameId = requestAnimationFrame(this.drawLoop);
      this.oneStep();
    }
    this.drawLoop();

  }

  end(){
    cancelAnimationFrame(this.animationFrameId);
    //this.startup();
  }
}

const baphomet = new Circle({canvasId:'canvas', strokeColor: '#FF0000'});
baphomet.startup();
