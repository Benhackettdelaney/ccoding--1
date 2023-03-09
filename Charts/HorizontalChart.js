class HorizontalChart {
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

  // draws the bars onto the screen
  drawingBar() {
    let barNo = this.data.getRowCount();
    let remainingHeight =
      this.barChartHeight - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartHeight = remainingHeight / barNo;
    let spaceBar = barChartHeight + this.space + 10;
    push();
    translate(this.barMargin - 10, 0);
    for (let y = 0; y < barNo; y++) {
      let value = int(-this.data.rows[y].obj[this.valueY]);
      noStroke();
      fill(125, 229, 237);
      rect(0, y * -spaceBar, -this.scaleUp(value), -barChartHeight);
    }
  
    pop();
  }

  // draws the horizontal line
  drawAxisH() {
    line(0, 0, this.barChartHeight, 0);
    let barNo = this.data.getRowCount();
    let remainingHeight =this.barChartHeight - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartHeight = remainingHeight / barNo;
    let spaceBar = barChartHeight + this.space + 10;
    push();
    translate(this.barMargin - 10, 0);
    for (let y = 0; y < barNo; y++) {
      let value = int(-this.data.rows[y].obj[this.valueY]);
      noStroke();
      fill(125, 229, 237);
      rect( 0, y * -spaceBar, -this.scaleUp(value), -barChartHeight);
    }

    let labels = this.data.getColumn(this.valueY);
    for (let y = 0; y < labels.length; y++) {
      let value = labels[y];
      push();
      translate(y * spaceBar + barChartHeight / 2, 5);
      rotate(45);
      fill(0);
      textSize(12);
      textAlign(LEFT, TOP);
      text(value, 0, 0);
      pop();
    }
    pop();
    textAlign(CENTER)
    fill(0,0,0)
    textSize(30)               
    text(" Horizontal Stacked Hospital Admissions",this.barChartWidth/2,-this.barChartHeight-120)
  }
  // draws the vertical line
  drawAxisV() {
    line(0, 0, 0, -this.barChartWidth);
    let barNo = this.data.getRowCount();
    let remainingWidth =
      this.barChartWidth - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartWidth = remainingWidth / barNo;
    let spaceBar = barChartWidth + this.space;
    for (let x = 1; x < this.noTicks + 1; x++) {
      let spaceX = this.barChartWidth / this.noTicks;

      stroke(50);
      // line(0, spaceX * -x, -10, spaceX * -x);

      noStroke();
      noFill(50);
      textSize(12);
      textAlign(LEFT, CENTER);
      let labels = this.data.getColumn(this.valueX);
      for (let x = 0; x < labels.length; x++) {
        let value = labels[x];
        push();
        translate(-40, -(x * (spaceBar + 3) + barChartWidth / 10 + 40));
        fill(0);
        textSize(12);
        textAlign(LEFT, TOP);
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

  // map function, this makes it so the bars will scale up to any parameter I set such as the excel sheet
  // in data folder
  scaleUp(_no) {
    return map(_no, 0, this.MaximumNo, 0, this.barChartWidth);
  }
}
