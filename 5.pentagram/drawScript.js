class Pentagram {
  constructor({canvasId, strokeColor}){
    this.fillColor = strokeColor;
    this.canvasId = canvasId;
    this.animationFrameId = 0;
  }

  atomicStep(radius, backwards) {
    this.context.beginPath();
    let done = this.drawCircle(radius, backwards);
    this.step++;
    if (done){
      //this.context.closePath();
      this.step = 0;
    }
    return done;
  }

  oneStep() {

    if (!this.first && !this.second) {
      this.first = this.atomicStep(250, false)
      if (this.firstRun) {
          this.firstRun = false;
      }
    }

    if(this.first && !this.second) {
      this.second = this.atomicStep(220, true);
      if (this.secondRun) {
        this.secondRun = false;
      }
    }

    if (this.first && this.second) {
      this.drawLine1();
      this.drawLine2();
      this.drawLine3();
      this.drawLine4();
      this.drawLine5();
      this.end();
    }
  }

  drawLine1(){
    this.context.beginPath();
    this.context.moveTo(300, 520);
    this.context.lineTo(147, 147);
    this.context.stroke();
    this.context.closePath();
  }

  drawLine2(){
    this.context.beginPath();
    this.context.moveTo(147, 147);
    this.context.lineTo(498, 400);
    this.context.stroke();
    this.context.closePath();
  }

  drawLine3(){
    this.context.beginPath();
    this.context.moveTo(498, 400);
    this.context.lineTo(104, 400);
    this.context.stroke();
    this.context.closePath();
  }

  drawLine4(){
    this.context.beginPath();
    this.context.moveTo(104, 400);//451 144
    this.context.lineTo(451, 144);
    this.context.stroke();
    this.context.closePath();
  }

  drawLine5(){
    this.context.beginPath();
    this.context.moveTo(451, 144);//4
    this.context.lineTo(300, 520);
    this.context.stroke();
    this.context.closePath();
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
    //this.startup();
  }

  startup() {
    this.canvas = document.getElementById(this.canvasId);
    this.context = document.getElementById(this.canvasId).getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvas.onmousemove = function(event) {
      let x = event.clientX,
          y = event.clientY;
      document.getElementById('coordinates').innerHTML="Coordinates: (" + x + "," + y + ")";
      console.log("Event:", event);
    }

    this.context.strokeStyle = this.fillColor ;
    //this.context.fillStyle = this.fillColor;

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

}

const baphomet = new Pentagram({canvasId:'canvas', strokeColor: '#FF0000'});
baphomet.startup();
