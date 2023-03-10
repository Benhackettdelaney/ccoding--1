class BarChart {
  //sets up variables and use the parameters
  constructor({
    _barWidth,
    _barHeight,
    _posX,
    _posY,
    _title,
    _data,
    _noTicks,
    _colourPallet,
    _roundUp,
    _barMargin,
    _space,
    _valueX,
    _valueY,
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
    this.maximumNo = this.calMax();
    this.barMargin = _barMargin;
    this.space = _space;
    this.colourPallet = _colourPallet;
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
    let remainingWidth =
      this.barChartWidth - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartWidth = remainingWidth / barNo;
    let spaceBar = barChartWidth + this.space;
    push();
    translate(this.barMargin, 0);
    for (let x = 0; x < barNo; x++) {
      let value = int(-this.data.rows[x].obj[this.valueY]);
      let colourPallet = x % this.colourPallet.length;
      fill(this.colourPallet[colourPallet]);
      noStroke();
      rect(x * spaceBar, 0, barChartWidth, this.scaleUp(value), 0, 0, 10, 10);
    }
    pop();
  }

  // draws the horizontal line
  drawAxisH() {
    line(0, 0, this.barChartWidth, 0);
    let barNo = this.data.getRowCount();
    let remainingWidth =
      this.barChartWidth - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartWidth = remainingWidth / barNo;
    let spaceBar = barChartWidth + this.space;
    push();
    translate(this.barMargin, 0);

    let labels = this.data.getColumn(this.valueX);
    for (let x = 0; x < labels.length; x++) {
      let value = labels[x];
      push();
      translate(x * spaceBar + barChartWidth / 2, 5);
      rotate(45);
      fill(0);
      textSize(12);
      textAlign(LEFT, TOP);
      text(value, 0, 0);
      pop();
    }
    pop();
    textAlign(CENTER);
    fill(0, 0, 0);
    textSize(30);
    text(
      " Hospital Admissions",
      this.barChartWidth / 2,
      -this.barChartHeight - 50
    );
  }

  // draws the vertical line
  drawAxisV() {
    line(0, 0, 0, -this.barChartHeight);
    for (let y = 1; y < this.noTicks + 1; y++) {
      let spaceY = this.barChartHeight / this.noTicks;

      stroke(50);
      fill(50);
      line(this.barChartWidth, -spaceY * y, -10, -spaceY * y);
      let spaceUnit = (this.maximumNo / this.noTicks).toFixed(2);
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
      if (int(this.data.rows[x].obj[this.valueY]) > maximum) {
        maximum = int(this.data.rows[x].obj[this.valueY]);
      }
    }

    for (let x = maximum; x < 100000; x++) {
      if (x % this.noTicks == 0 && x % this.roundUp == 0) {
        maximum = x;
        break;
      }
    }

    return maximum;
  }

  scaleUp(_no) {
    return map(_no, 0, this.maximumNo, 0, this.barChartHeight);
  }
}
