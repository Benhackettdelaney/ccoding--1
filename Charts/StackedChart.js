class StackedChart {
  //sets up variables and use the parameters
  constructor(
    {
      _barWidth=500,
      _barHeight=500,
      _posX=20, 
      _posY=450,
      _title="my chart", 
      _data,
      _valueX, 
      _valueY,
    _valueEng="England",
    _valueIre="NorthernI",  }) {
    this.barChartWidth = _barWidth;
    this.barChartHeight = _barHeight;
    this.titleName = _title;
    this.posX = _posX;
    this.posY = _posY;
    this.data = _data;
    this.noTicks = 10;
    this.roundUp = 1;
    this.valueX = _valueX;
    this.valueY = _valueY;
    this.valueEng = _valueEng;
    this.valueIre = _valueIre;
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
    this.drawingBarStack1();
    this.drawingBarStack2();
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
      noStroke();
      fill(125, 229, 237);
      rect(x * spaceBar, 0, barChartWidth, this.scaleUp(value));
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
    for (let x = 0; x < barNo; x++) {
      let value = int(-this.data.rows[x].obj[this.valueY]);
      noStroke();
      fill(125, 229, 237);
      rect(x * spaceBar, 0, barChartWidth, this.scaleUp(value));
    }
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
  }

  drawingBarStack1() {
    let barNo = this.data.getRowCount();
    let remainingWidth =
      this.barChartWidth - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartWidth = remainingWidth / barNo;
    let spaceBar = barChartWidth + this.space;
    push();
    translate(this.barMargin, 0);
    for (let x = 0; x < barNo; x++) {
      let value = int(-this.data.rows[x].obj[this.valueEng]);
      noStroke();
      fill(93, 167, 219);
      rect(x * spaceBar, 0, barChartWidth, this.scaleUp(value));
    }
    pop();
  }

  drawingBarStack2() {
    let barNo = this.data.getRowCount();
    let remainingWidth =
      this.barChartWidth - this.barMargin * 2 - (barNo - 1) * this.space;
    let barChartWidth = remainingWidth / barNo;
    let spaceBar = barChartWidth + this.space;
    push();
    translate(this.barMargin, 0);
    for (let x = 0; x < barNo; x++) {
      let value = int(-this.data.rows[x].obj[this.valueIre]);
      noStroke();
      fill(88, 55, 208);
      rect(x * spaceBar, 0, barChartWidth, this.scaleUp(value));
    }
    pop();
  }

  // draws the vertical line
  drawAxisV() {
    line(0, 0, 0, -this.barChartHeight);
    for (let y = 1; y < this.noTicks + 1; y++) {
      let spaceY = this.barChartHeight / this.noTicks;

      stroke(50);
      line(this.barChartWidth, -spaceY * y, -10, -spaceY * y);

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

  // map function, this makes it so the bars will scale up to any parameter I set such as the excel sheet
  // in data folder
  scaleUp(_no) {
    return map(_no, 0, this.MaximumNo, 0, this.barChartHeight);
  }
}
