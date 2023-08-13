
var score = 0;
 
class Tile {
  constructor(x, y, size, bw) {
    this.x = x;
    this.y = y;
    this.size = size;
    //black or right

    this.BW = bw;

    this.BW = bw;

    rectMode(CENTER);
  }

  check_hit() {
    if (mouseIsPressed) {
      var d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.size / 2) {
        return true;
      }
    }
    return false;
  }

  show() {
    //strokeWeight(1000000000000000000)

    stroke(100);
    stroke(2);
    if (this.BW == "W") {
      fill(255);
    } else {
      fill(0);
    }
    rect(this.x, this.y, this.size, this.size);

    // fill(255,0,0)
    // text("0",this.x,this.y)
  }

  alert() {
    fill(200, 0, 0);
    rect(this.x, this.y, this.size, this.size);
score=score-10000000000;
  }

  right() {
    fill(0,200, 0);
    rect(this.x, this.y, this.size, this.size);
  score=score+10000000000;
  }
}

var myfloor = [];
var q1, q2;
var qTimer = -1000;

function createFloor() {
  var row = 5;
  var col = 5;
  var tx = 100;
  var ty = 100;
  var tsize = 50;

  for (var i = 0; i < row; i++) {
    myfloor[i] = [];
    tx = 100;
    for (var j = 0; j < col; j++) {
      var bw;
      if ((i + j) % 2 == 1) {
        bw = "W";
      } else {
        bw = "B";
      }

      //create new tile

      var t = new Tile(tx, ty, 50, bw);

      myfloor[i].push(t);
      tx = tx + tsize;
    }

    ty = ty + tsize;
  }
}

function setup() {
  createCanvas(400, 400);
  createFloor();
}

function show_question() {
  var diff = frameCount - qTimer;
  if (diff < 200) {
    noStroke();
    fill(0, 0, 255);
    text("TARGET ==> " + q1 + " , " + q2, 120, 350);
  } else if (diff > 400) {
    qTimer = frameCount;

    q1 = int(random(0, 5));
    q2 = int(random(0, 5));
  } else {
    q1 = -1;
    q2 = -1;
  }
}

function draw() {
  background(220);
 text("score: "+score,120,390)
  for (var t = 0; t <= 4; t++) {
    strokeWeight(1);
    textSize(20);
    text(t, 50, 50 * t + 110);
  }

  for (t = 0; t <= 4; t++) {
    strokeWeight(1);
    textSize(20);
    text(t, 50 * t + 95, 60);
  }

  for (var i = 0; i < myfloor.length; i++) {
    for (var j = 0; j < myfloor[i].length; j++) {
      myfloor[i][j].show();
      if (q1 != -1 && myfloor[i][j].check_hit()) {
        if (q1 == i && q2 == j) {
          myfloor[i][j].right();
        } else {
          myfloor[i][j].alert();
          
        }
        print(i,j)
      }
    }
  }

  show_question();
}
