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
  // table = loadTable("data/England.csv", "csv", "header");
  // table = loadTable("data/Northern_Ireland.csv", "csv", "header");
}
// creates the canvas
function setup() {
  createCanvas(1500, 1500);
  background(200);
  pixelDensity(2);
  chart.push(
    new BarChart({
      _barWidth: 300,
      _barHeight: 200,
      _posX: 50,
      _posY: 400,
      _title: " Hospital admissions",
      _data: table,
      _valueX: "Year",
      _valueY: "Total",
    })
  );

  chart.push(
    new StackedChart({
      _barWidth: 300,
      _barHeight: 200,
      _posX: 50,
      _posY: 800,
      _title: " Hospital admissions of England and Northern Ireland",
      _data: table,
      _valueX: "Year",
      _valueY: "Total",
      _valueEng: "England",
      _valueIre: "NorthernI",
    })
  );

  chart.push(
    new HorizontalChart({
      _barWidth: 300,
      _barHeight: 200,
      _posX: 50,
      _posY: 800,
      _title: " Hospital admissions of England and Northern Ireland",
      _data: table,
      _valueX: "Year",
      _valueY: "Total",
      _valueEng: "England",
      _valueIre: "NorthernI",
    })
  );

  // chart.push(new HorizontalChart(300, 300, 400, 450, " Hospital admissions", table, "Year", "Total", "England", "NorthernI"))
  // chart.push(new HorizontalChart(300, 300, 400, 0, " Hospital admissions", table, "Year", "Total", "England", "NorthernI"))
}

// draws out the charts
function draw() {
  chart[0].render();
  chart[1].render();
  chart[2].render();
  // chart[3].render();
}
