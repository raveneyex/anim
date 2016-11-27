class Pentagram {
    constructor({canvasId, strokeColor}){
        this.encoder = new GIFEncoder();
        this.encoder.setRepeat(0);
        this.encoder.setDelay(1);
        this.fillColor = strokeColor;
        this.canvasId = canvasId;
        this.animationFrameId = 0;
        let vertices = [
            {x: 521, y: 304 },
            {x: 125, y: 435 },
            {x: 377, y: 96 },
            {x: 377, y: 508 },
            {x: 125, y: 169 },
            {x: 521, y: 304}
        ];
        this.wayPoints = this.calculateWayPoints(vertices);
    }

    calculateWayPoints(vertices) {
        //taken from: http://stackoverflow.com/a/23941786
        let wayPoints = [];
        for (let i = 1; i < vertices.length; i += 1) {
            let pt0 = vertices[i - 1],
                pt1 = vertices[i],
                dx = pt1.x - pt0.x,
                dy = pt1.y - pt0.y;
            for (let j = 0; j < 100; j += 1) {
                let x = pt0.x + dx * j/100,
                    y = pt0.y + dy * j/100;
                wayPoints.push({x, y});
            }
        }
        return wayPoints;
    }

    atomicStep(radius, backwards) {
        this.context.beginPath();
        let done = this.drawCircle(radius, backwards);
        this.step++;
        if (done){
            this.step = 0;
        }
        return done;
    }

    oneStep() {
        if (!this.first && !this.second) {
            this.first = this.atomicStep(250);
        }

        if(this.first && !this.second) {
            this.second = this.atomicStep(220);
            if (this.second) {
                this.step = 1;
            }
        }

        if (this.first && this.second) {
            if (this.step < this.wayPoints.length) {
                this.drawLine(this.wayPoints[this.step - 1], this.wayPoints[this.step]);
                this.step += 1;
            } else {
                this.end();
            }
        }
        this.encoder.addFrame(document.getElementById('canvas').getContext('2d'));
    }

    drawLine(startPoint, endPoint) {
        this.context.beginPath();
        this.context.moveTo(startPoint.x, startPoint.y);
        this.context.lineTo(endPoint.x, endPoint.y);
        this.context.stroke();
    }

    drawCircle(radius){
        let endAngle = this.stepSize * this.step,
        done = endAngle >= this.endAngle ? true: false;

        this.context.arc(300, 300, radius, this.startAngle, endAngle);
        this.context.stroke();

        return done;
    }

    end() {
        cancelAnimationFrame(this.animationFrameId);
        this.encoder.finish();
        let binary_gif = this.encoder.stream().getData(),
            data_url = 'data:image/gif;base64,'+encode64(binary_gif);

        this.displayLink(data_url);
        //this.startup();
    }

    displayLink(data){
        document.getElementById('link').innerHTML = '<a href="' + data + '">GIF</a>';
    }

    startup() {
        this.canvas = document.getElementById(this.canvasId);
        this.context = document.getElementById(this.canvasId).getContext('2d');
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.strokeStyle = this.fillColor ;
        this.context.lineWidth = 2;

        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.stepSize = this.endAngle/300;
        this.step = 0;

        this.first = false; //1st circle already drawn?
        this.second = false; //2nd circle already drawn?

        this.drawLoop = () => {
            this.animationFrameId = requestAnimationFrame(this.drawLoop.bind(this));
            this.oneStep();
        }
        this.encoder.start();
        this.drawLoop();
    }

}



const baphomet = new Pentagram({canvasId:'canvas', strokeColor: '#FF0000'});
baphomet.startup();
