class Circle {
  constructor({canvasId, strokeColor}){
    this.fillColor = strokeColor;
    this.canvasId = canvasId;
    this.animationFrameId = 0;
  }

  atomicStep(init, radius, backwards) {
    if(init){
      this.context.beginPath();
    }
    let done = this.drawCircle(radius, backwards);
    this.step++;
    if (done){
      this.context.closePath();
      this.step = 0;
    }
    return done;
  }

  oneStep() {

    if (!this.first && !this.second) {
      this.first = this.atomicStep(this.firstRun, 250, false)
      if (this.firstRun) {
          this.firstRun = false;
      }
    }

    if(this.first && !this.second) {
      this.context.strokeStyle = '#FFFFFF';
      this.second = this.atomicStep(this.secondRun, 220, true);
      if (this.secondRun) {
        this.secondRun = false;
      }
    }

    if (this.first && this.second) {
      this.end();
    }
  }

  drawCircle(radius, counter){
    let endAngle = this.stepSize * this.step,
        done = endAngle >= this.endAngle ? true: false;

    if (!counter) {
      this.context.arc(300, 300, radius, this.startAngle, endAngle);
      this.context.stroke();
    }

    if (counter){
      this.context.arc(300, 300, radius, endAngle, this.startAngle, true);
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
