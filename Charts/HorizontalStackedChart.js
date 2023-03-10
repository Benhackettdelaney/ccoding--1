class HorizontalStackedChart {
  //sets up variables and use the parameters
  constructor({
    _barWidth,
    _barHeight,
    _posX,
    _posY,
    _title,
    _data,
    _noTicks,
    _roundUp,
    _barMargin,
    _space,
    _valueX,
    _valueY,
    _valueE,
    _valueI,
  }) {
    this.barChartWidth = _barWidth;
    this.barChartHeight = _barHeight;
    this.titleName = _title;
    this.posX = _posX;
    this.posY = _posY;
    this.data = _data;
    this.noTicks = _noTicks;
    this.roundUp = _roundUp;
    this.valueX = _valueX;
    this.valueY = _valueY;
    this.valueE = _valueE;
    this.valueI = _valueI;
    this.MaximumNo = this.calMax();
    this.barMargin = _barMargin;
    this.space = _space;
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

  // draws the bars to screen
  drawingBar() {
    let barNo = this.data.getRowCount();
    let remainingHeight =
      this.barChartHeight - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartHeight = remainingHeight / barNo;
    let spaceBar = barChartHeight + this.space + 10;
    push();
    translate(0,-this.barMargin);
    for (let y = 0; y < barNo; y++) {
      let value = int(-this.data.rows[y].obj[this.valueY]);
      noStroke();
      fill(125, 229, 237);
      rect(0, y * -spaceBar, -this.scaleUp(value), -barChartHeight);
    }
    for (let y = 0; y < barNo; y++) {
      let value = int(-this.data.rows[y].obj[this.valueE]); 
      noStroke();
      fill(93, 167, 219);
      rect(0, y * -spaceBar, -this.scaleUp(value), -barChartHeight);
    }
    for (let y = 0; y < barNo; y++) {
      let value = int(-this.data.rows[y].obj[this.valueI]);
      noStroke();
      fill(88, 55, 208);
      rect(0, y * -spaceBar, -this.scaleUp(value), -barChartHeight);
    }

    pop();
  }


  drawAxisH() {
    line(0, 0, this.barChartWidth, 0);
    let barNo = this.data.getRowCount();
    let remainingHeight =this.barChartHeight - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartHeight = remainingHeight / barNo;
    let spaceBar = barChartHeight + this.space + 10;
    push()
    translate(-this.barMargin , 0);
   
  
   
    textAlign(CENTER)
    fill(0)
    textSize(30)               
    text("Horizontal Hospital Admissions",this.barChartWidth/2,-this.barChartHeight-140)


    for (let y = 1; y < this.noTicks + 1; y++) {
      let spaceY = this.barChartWidth / this.noTicks;

      stroke(50);
      line(spaceY * y ,9, spaceY * y,0);
      let spaceUnit = (this.MaximumNo / this.noTicks).toFixed(2);
      noStroke();
      fill(50);
      textSize(12);
      textAlign(RIGHT, CENTER);
      text(y * spaceUnit,spaceY * y, this.barMargin + 10);
      }
      pop()
  }

  drawAxisV() {
    line(0, 0, 0, -this.barChartWidth);
    let barNo = this.data.getRowCount();
    let remainingWidth =
      this.barChartWidth - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartWidth = remainingWidth / barNo;
    let spaceBar = barChartWidth + this.space;
    for (let x = 1; x < this.noTicks + 1; x++) {
      

      stroke(50);

     
      noStroke();
      noFill(50);
      textSize(12);
      textAlign(LEFT);
      let labels = this.data.getColumn(this.valueX);
      for (let x = 0; x < labels.length; x++) {
        let value = labels[x];
        push();
        translate(-50, -(x * (spaceBar) + barChartWidth / 2 + 5));
        fill(0);
        textSize(12);
        textAlign(LEFT,CENTER);
        text(value, 0, 0);
        pop();
      }
    }
  }

  //   calculates the maximum number in the data
  calMax() {
    let maximum = 0;
    for (let y = 0; y < this.data.getRowCount(); y++) {
      if (int(this.data.rows[y].obj[this.valueY]) > maximum) {
        maximum = int(this.data.rows[y].obj[this.valueY]);
      }
    }

    for (let y = maximum; y < 100000; y++) {
      if (y % this.noTicks == 0 && y % this.roundUp == 0) {
        maximum = y;
        break;
      }
    }

    return maximum;
  }

  // map function, this makes it so the bars will scale  to any parameter  set such as the excel sheet in data folder
  
  scaleUp(_no) {
    return map(_no, 0, this.MaximumNo, 0, this.barChartWidth);
  }
}