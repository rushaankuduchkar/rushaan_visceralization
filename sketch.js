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
  createCanvas(windowWidth, windowHeight); // ✅ responsive
  frameRate(4);
  textFont("monospace");

  osc = new p5.Oscillator();
  osc.start();
  osc.amp(0);

  userStartAudio();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // ✅ adapts on resize
}

function draw() {
  background(10, 10, 15);

  let margin = width * 0.08;

  let rowHeight = (height - margin * 2) / countries.length;
  let colWidth = (width - margin * 2) / years.length;

  step = (step + 1) % maxSteps;

  // 🎯 PLAYHEAD
  let playheadX = map(step, 0, maxSteps, margin, width - margin);
  stroke(0, 200, 255);
  strokeWeight(2);
  line(playheadX, margin, playheadX, height - margin);
  noStroke();

  for (let i = 0; i < countries.length; i++) {
    let y = margin + i * rowHeight + rowHeight / 2;

    // Country label
    fill(255);
    textSize(rowHeight * 0.2); // ✅ scales text
    text(countries[i], margin * 0.2, y);

    for (let j = 0; j < years.length; j++) {
      let xStart = margin + j * colWidth;

      let movieCount = data[countries[i]][j];
      let beats = floor(map(movieCount, 0, 2000, 2, maxSteps));

      for (let b = 0; b < beats; b++) {
        let x = xStart + map(b, 0, beats, colWidth * 0.2, colWidth * 0.9);

        let isActive = (b === step % beats);

        if (isActive) {
          fill(0, 200, 255);
          ellipse(x, y, rowHeight * 0.2); // ✅ scales dots
          playTone(j);
        } else {
          fill(80);
          ellipse(x, y, rowHeight * 0.08);
        }
      }

      // Year label
      fill(150);
      textSize(rowHeight * 0.18);
      text(years[j], xStart + colWidth * 0.4, margin * 0.6);
    }
  }
}

function playTone(yearIndex) {
  let freq;

  if (yearIndex === 0) freq = 120;
  else if (yearIndex === 1) freq = 300;
  else freq = 600;

  osc.freq(freq);
  osc.amp(0.3, 0.05);
  osc.amp(0, 0.1);
}

function mousePressed() {
  userStartAudio();
}