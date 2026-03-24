let data = {
  "India": [1250, 1600, 1900],
  "USA": [820, 900, 870],
  "Germany": [220, 250, 270],
  "France": [260, 300, 320],
  "China": [600, 750, 900]
};

let countries = Object.keys(data);
let years = ["2011", "2013", "2015"];

let step = 0;
let maxSteps = 16;

let osc;

function setup() {
  createCanvas(1920, 1080 );
  frameRate(4);
  textFont("monospace");

  osc = new p5.Oscillator();
  osc.start();
  osc.amp(0);

  userStartAudio();
}

function draw() {
  background(15);

  let rowHeight = height / countries.length;
  let colWidth = width / years.length;

  step = (step + 1) % maxSteps;

  // 🎯 PLAYHEAD LINE
  let playheadX = map(step, 0, maxSteps, 0, width);
  stroke(0, 255, 180);
  line(playheadX, 0, playheadX, height);
  noStroke();

  for (let i = 0; i < countries.length; i++) {
    let y = i * rowHeight + rowHeight / 2;

    fill(255);
    text(countries[i], 10, y);

    for (let j = 0; j < years.length; j++) {
      let xStart = j * colWidth;

      let movieCount = data[countries[i]][j];
      let beats = floor(map(movieCount, 0, 2000, 2, maxSteps));

      for (let b = 0; b < beats; b++) {
        let x = xStart + map(b, 0, beats, 80, colWidth - 20);

        let isActive = (b === step % beats);

        if (isActive) {
          fill(0, 255, 180);
          ellipse(x, y, 12);

          playTone(j); // 🔥 NOW BASED ON YEAR
        } else {
          fill(80);
          ellipse(x, y, 6);
        }
      }

      fill(150);
      text(years[j], xStart + colWidth / 2 - 15, 20);
    }
  }
}

function playTone(yearIndex) {
  let freq;

  // 🎼 pitch based on year
  if (yearIndex === 0) freq = 120;   // 2011 (low)
  else if (yearIndex === 1) freq = 300; // 2013 (mid)
  else freq = 600; // 2015 (high)

  osc.freq(freq);
  osc.amp(0.3, 0.05);
  osc.amp(0, 0.1);
}

function mousePressed() {
  userStartAudio();
}