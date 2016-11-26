class Circle {
  constructor({canvasId, strokeColor}){
    this.fillColor = strokeColor;
    this.canvasId = canvasId;
    this.animationFrameId = 0;
  }

  oneStep() {
    let endAngle = this.currentStep * this.step;
    this.step++;
    this.context.beginPath();
    this.context.arc(300, 300, 250, this.startAngle, endAngle);
    this.context.stroke();

    if (endAngle > this.endAngle) {
      this.end()
    }
  }

  end() {
    cancelAnimationFrame(this.animationFrameId);
    this.startup();
  }

  startup() {
    this.canvas = document.getElementById(this.canvasId);
    this.context = document.getElementById(this.canvasId).getContext('2d');
    this.context.strokeStyle = this.fillColor ;

    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.currentStep = this.endAngle/300;
    this.step = 0;

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

const baphomet = new Circle({canvasId:'canvas', strokeColor: '#FF0000'});
baphomet.startup();
