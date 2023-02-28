let data;
let table;
let chart;

// takes the information from the excel sheet to be used
function preload() {
  table = loadTable("data/Hospital_Admissions_for_Non_Residents.csv", "csv", "header");
}
// creates the canvas
function setup() {
  createCanvas(500, 500);
  background(200);
  pixelDensity(2);
  chart = new BarChart(300, 300, 100, 450, "Fatalities 2020", table);

}

// draws out the charts
function draw() {
  chart.render();
}
