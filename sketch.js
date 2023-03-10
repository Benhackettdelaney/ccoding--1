let data;
let table;
let chart = [];

// takes the information from the excel sheet to be used
function preload() {
  table = loadTable(
    "data/Hospital_Admissions_for_Non_Residents.csv",
    "csv",
    "header"
  );
}
// creates the canvas
function setup() {
  createCanvas(2000, 2000);
  background(200);
  pixelDensity(2);

  chart.push(
    new BarChart({
      _barWidth:400,
      _barHeight:300,
      _posX:100,
      _posY:400,
      _title:"Hospital Admissions",
      _data:table,
      _noTicks:10,
      _roundUp:1,
      _barMargin:10,
      _space:5    ,
      _valueX:"Year",
      _valueY:"Total",
    })
  );

  chart.push(
    new StackedChart({
      _barWidth:400,
      _barHeight:300,
      _posX:100,
      _posY:900,
      _title:"Stacked Hospital Admissions",
      _data:table,
      _noTicks:10,
      _roundUp:1,
      _barMargin:10,
      _space:5,
      _valueX:"Year",
      _valueY:"Total",
      _valueE:"England",
      _valueI:"NorthernI",
    })
  );

  chart.push(
    new HorizontalChart({
      _barWidth:500,
      _barHeight:400,
      _posX:600,
      _posY:800,
      _title:"Horizontal Stacked Hospital Admissions",
      _data:table,
      _noTicks:10,
      _roundUp:10,
      _barMargin:10,
      _space:5,
      _valueX:"Year",
      _valueY:"Total",
      _valueE:"England",
      _valueI:"NorthernI",
    })
  );

  chart.push(
    new HorizontalStackedChart({
      _barWidth:500,
      _barHeight:400,
      _posX:1200,
      _posY:800,
      _title:"Horizontal  Hospital Admissions",
      _data:table,
      _noTicks:10,
      _roundUp:10,
      _barMargin:10,
      _space:1,
      _valueX:"Year",
      _valueY:"Total",
      _valueE:"England",
      _valueI:"NorthernI",
    })
  );
}

// draws out the charts
function draw() {
  chart[0].render();
  chart[1].render();
  chart[2].render();
  chart[3].render();
}
