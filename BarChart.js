class BarChart {
  //sets up variables and use the parameters
  constructor(_barWidth, _barHeight, _posX, _posY, _title, _data) {
    this.barChartWidth = _barWidth;
    this.barChartHeight = _barHeight;
    this.titleName = _title;
    this.posX = _posX;
    this.posY = _posY;
    this.data = _data;
    this.noTicks = 10;
    this.roundUp = 10
    this.MaximumNo = this.calMax();
    this.barMargin = 10;
    this.space = 5;
  }
  render() {
    noFill();

    push();
    translate(this.posX, this.posY);
    this.drawAxisH();
    this.drawAxisV();
    this.drawingBar();
    pop();
  }

  // draws the bars onto the screen
  drawingBar() {
    let barNo = this.data.getRowCount();
    let remainingWidth =this.barChartWidth - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartWidth = remainingWidth / barNo;
    let spaceBar = barChartWidth + this.space;
    push();
    translate(this.barMargin, 0)
    // rect(0,0,10,-10)
    for (let x = 0; x < barNo; x++) {
      let value = int(-this.data.rows[x].obj.Total);
      
      rect(x * spaceBar, 0, barChartWidth, this.scaleUp(value));
    }
    pop();
  }

  // draws the horizontal line
  drawAxisH() {
    line(0, 0, this.barChartWidth, 0);
  }

  // draws the vertical line
  drawAxisV() {
    line(0, 0, 0, -this.barChartHeight);
    for (let y = 1; y < this.noTicks + 1; y++) {
      let spaceY = this.barChartHeight / this.noTicks;

      stroke(50);
      line(0, -spaceY * y, -10, -spaceY * y);

      let spaceUnit = (this.MaximumNo / this.noTicks).toFixed(2);
      noStroke();
      fill(50);
      textSize(12);
      textAlign(RIGHT, CENTER);
      text(y * spaceUnit, -15, -spaceY * y);
     
    }
  }

//   calculates the maximum number in the data
  calMax() {
    let maximum = 0;
    for (let x = 0; x < this.data.getRowCount(); x++) {
      if (int(this.data.rows[x].obj.Total) > maximum) {
        maximum = int(this.data.rows[x].obj.Total);
      }

    }
    
    for(let x=maximum; x<100000; x++){
      if(x%this.noTicks==0 && x%this.roundUp==0){
        maximum = x;
        break
      }
    }

    return maximum;
  }

  // not map function
  // scaleUp(_no){
  //     let scalingValue = this.MaximumNo/this.barChartHeight
  //     return _no/scalingValue
  // }

  // map function, this makes it so the bars will scale up to any parameter I set such as the excel sheet 
  // in data folder
  scaleUp(_no) {
    return map(_no, 0, this.MaximumNo, 0, this.barChartHeight);
  }
}
