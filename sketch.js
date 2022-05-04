class Spaceship {
  constructor() {
    this.x = width / 2;
    this.y = height * 0.7;
    this.speedX = 0;
    this.size = 50;
  }
  update() {
    if (this.x > 0 && keyIsPressed && (key == "A" || key == "a")) {
      if (this.x < width / 2) {
        this.speedX = -(this.x + 50) / 30;
        this.x += this.speedX;
      } else {
        this.speedX = (this.x - width - 50) / 30;
        this.x += this.speedX;
      }
    } else if (this.x < width && keyIsPressed && (key == "D" || key == "d")) {
      if (this.x < width / 2) {
        this.speedX = (this.x + 50) / 30;
        this.x += this.speedX;
      } else {
        this.speedX = (width - this.x + 50) / 30;
        this.x += this.speedX;
      }
    } else if (keyIsPressed && (key == "W" || key == "w")) {
      this.speedY = (height * 0.6 - this.y) / 15;
      this.y += this.speedY;
    } else if (keyIsPressed && (key == "S" || key == "s")) {
      this.speedY = -(this.y - height * 0.8) / 15;
      this.y += this.speedY;
    } else {
      this.speedX = 0;
      this.speedY = 0;
    }
  }
  display() {
    push();
    noFill();
    strokeWeight(3);
    if (keyIsPressed && key == " ") {
      stroke(255, 255, 0);
    } else {
      stroke(0, 0, 255);
    }
    circle(this.x, this.y, this.size);
    image(imageSS, this.x, this.y, this.size * 2, this.size * 2);
    pop();
  }
}

class Asteroid {
  constructor(x, y, s, sp) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.speedX = 0;
    this.speedY = sp / 150000000;
    this.rot = 0;
  }
  display() {
    push();
    fill(0, 0, 0);
    translate(this.x, this.y);
    rotate(radians(this.rot));
    if (this.size <= 35) {
      image(imageAsteroid3, 0, 0, this.size, this.size);
    } else if (35 < this.size && this.size <= 40) {
      image(imageAsteroid2, 0, 0, this.size, this.size);
    } else {
      image(imageAsteroid1, 0, 0, this.size, this.size);
    }
    pop();
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rot += 5;
  }
}

class Energy {
  constructor(x, y, s, sp) {
    this.x = x;
    this.cs = this.x;
    this.y = y;
    this.size = s;
    this.rad = 0;
    this.speedX = 0;
    this.speedY = sp / 150000000;
    this.rot = 0;
  }
  display() {
    push();
    fill(255, 255, 255);
    translate(this.cx, this.y);
    rotate(radians(this.rot));
    circle(0, 0, this.size);
    image(imageEnergy, 0, 0, this.size, this.size);
    pop();
  }
  update() {
    this.rad += 3;
    this.rot += 1;
    this.y += this.speedY;
    this.cx = this.x + sin(radians(this.rad)) * this.size;
  }
}

class BlackDomain {
  constructor(x, s) {
    this.x = x;
    this.size = s;
    this.lifespan = 500;
  }
  display() {
    push();
    if (this.lifespan > 450) {
      fill(0, 0, 0, (500 - this.lifespan) * 4);
      stroke(0, 0, 0, (500 - this.lifespan) * 2);
    } else if (this.lifespan < 50) {
      fill(0, 0, 0, this.lifespan * 4);
      stroke(0, 0, 0, this.lifespan * 2);
    } else {
      fill(0, 0, 0, 200);
      stroke(0, 0, 0, 100);
    }
    strokeWeight(25);
    rect(this.x + 25, 0, this.size - 25, height);
    pop();
  }
  update() {
    this.lifespan -= 1;
  }
}

class Wormhole {
  constructor(x, y, sp) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speedX = 0;
    this.speedY = sp / 120000000;
  }
  display() {
    push();
    fill(255, 0, 0);
    image(imageWormhole, this.x, this.y, 100, 80);
    pop();
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
  }
}

function preload() {
  imageBG = loadImage("background.gif");
  imageSS = loadImage("Spaceship.png");
  imageEnergy = loadImage("Energy.png");
  imageAsteroid1 = loadImage("Asteroid1.png");
  imageAsteroid2 = loadImage("Asteroid2.png");
  imageAsteroid3 = loadImage("Asteroid3.png");
  imageWormhole = loadImage("Wormhole.png");
  soundEnergy = loadSound("EnergySound.mp3");
  soundAsteroid = loadSound("AsteroidSound.mp3");
  soundWormhole = loadSound("WormholeSound.mp3");
  soundtrack = loadSound("Soundtrack.mp3");
  fontPixel = loadFont("prstartk.ttf");
  yearLongest = 0;
  travelLongest = 0;
}
function setup() {
  createCanvas(433, 700);
  textFont(fontPixel);
  soundWormhole.rate(3);
  soundAsteroid.setVolume(0.25);
  soundEnergy.setVolume(0.5);
  soundWormhole.setVolume(0.5);
  soundtrack.setVolume(0.5);
  if (!soundtrack.IsPlaying) {
    soundtrack.loop();
  }
  frameCount = 0;
  imageMode(CENTER);
  BG = -width;
  bX = 0;
  bL = 0;
  speedEscape = 526651200;
  speedEscapeT = 0;
  speedGrowth = 1;
  distance = 1500000000;
  travelled = 0;
  resYear = 0;
  resTravel = 0;
  elem1 = select('#longestYear');
  elem2 = select('#longestTravel');
  HP = 100;
  maxHP = 100;
  BDE = 0;
  WH = -1;
  SS = new Spaceship();
  encounters = [];
  for (x = 0; x < 8; x++) {
    encounters[x] = new Asteroid(
      random(width),
      (-height / 6) * (x + 1),
      random(10, 30),
      speedEscape
    );
  }
  noLoop();
}

function draw() {
  background(220);
  elem1.html(yearLongest);
  elem2.html(travelLongest);
  image(imageBG, width / 4, BG, width / 2, width / 2);
  image(imageBG, width / 4, BG + width, width / 2, width / 2);
  image(imageBG, width / 4, BG + width * 2, width / 2, width / 2);
  image(imageBG, width * 0.75, BG, width / 2, width / 2);
  image(imageBG, width * 0.75, BG + width, width / 2, width / 2);
  image(imageBG, width * 0.75, BG + width * 2, width / 2, width / 2);
  image(imageBG, width / 4, BG + width / 2, width / 2, width / 2);
  image(imageBG, width / 4, BG + width * 1.5, width / 2, width / 2);
  image(imageBG, width / 4, BG + width * 2.5, width / 2, width / 2);
  image(imageBG, width * 0.75, BG + width / 2, width / 2, width / 2);
  image(imageBG, width * 0.75, BG + width * 1.5, width / 2, width / 2);
  image(imageBG, width * 0.75, BG + width * 2.5, width / 2, width / 2);
  if (frameCount == 2) {
    soundEnergy.play();
  }
  if (BG >= 0) {
    BG = -width;
  } else {
    BG += 1;
  }
  //Shield_Auto-heal
  if (0 < HP < maxHP) {
    HP += 0.001 * (maxHP - 100);
  }

  //Space_long_hold_prevention
  if (keyIsPressed && key == " ") {
    speedEscape *= 0.999999;
  }
  //Wormhole
  if (WH > 0) {
    WH -= 1;
    BG += 50;
  } else if (WH == 0) {
    speedEscape = speedEscapeT;
    HP = HPT - 10;
    WH = -1;
    BG = -width;
  }

  //Black_Domain
  if (BDE == 0) {
    b = random(100);
    if (b < 0.1 && frameCount > 1000) {
      BDE = 1;
      bX = random(50, 300);
      bL = random(100, 200);
      blackDomain = new BlackDomain(bX, bL);
    }
  }
  if (BDE == 1) {
    if (blackDomain.lifespan > 0) {
      blackDomain.display();
      blackDomain.update();
      if (bX < SS.x && SS.x < bX + bL && blackDomain.lifespan < 450) {
        speedEscape *= 0.999;
      }
    } else {
      BDE = 0;
    }
  }

  //Encouter_check
  for (x = 0; x < 8; x++) {
    if (encounters[x].y > height + 112) {
      r = random(10);
      if (r < 2) {
        encounters[x] = new Energy(
          random(50, width - 50),
          random(-100, -120),
          random(15, 25),
          speedEscape
        );
      } else if (r >=9.85 && frameCount > 2000 && WH == -1) {
        encounters[x] = new Wormhole(
          random(50, width - 50),
          random(-100, -120),
          speedEscape
        );
      } else {
        encounters[x] = new Asteroid(
          random(width),
          random(-100, -120),
          random(30, 50),
          speedEscape
        );
      }
    }
    if (
      dist(encounters[x].x, encounters[x].y, SS.x, SS.y) <=
      SS.size + encounters[x].size / 1.5
    ) {
      if (
        encounters[x].constructor.name == "Energy" &&
        keyIsPressed &&
        key == " "
      ) {
        if (WH == -1) {
          soundEnergy.play();
        }
        speedEscape *= 1.05;
        maxHP += 1;
        encounters[x] = new Asteroid(
          random(width),
          random(-100, -120),
          random(30, 50),
          speedEscape
        );
      }
      if (
        dist(encounters[x].x, encounters[x].y, SS.x, SS.y) <=
        (SS.size + encounters[x].size) / 2
      ) {
        if (encounters[x].constructor.name == "Asteroid") {
          if (WH == -1) {
            soundAsteroid.play();
          }
          HP -= encounters[x].size / 2;
          encounters[x] = new Asteroid(
            random(width),
            random(-100, -120),
            random(30, 50),
            speedEscape
          );
        }
        if (encounters[x].constructor.name == "Wormhole" && WH == -1) {
          soundWormhole.play();
          speedEscapeT = speedEscape;
          HPT = HP;
          speedEscape *= 50;
          HP = 99999999999;
          WH = 50;
          encounters[x] = new Asteroid(
            random(width),
            random(-100, -120),
            random(30, 50),
            speedEscape
          );
        }
      }
    }
    encounters[x].update();
    if (WH == -1) {
      encounters[x].display();
    }
  }

  //Updates_each_frame
  SS.update();
  SS.display();
  speedGrowth = sq(frameCount * 12);
  distance += speedEscape;
  distance -= speedGrowth;
  travelled += speedEscape;
  push();
  textSize(10);
  fill(255, 255, 255);
  text("Earth Years Travelled:\n" + (frameCount-1), 10, 30);
  text("Current Speed:\n" + nf(speedEscape, 0, 2) + " km/year", 10, 60);
  text("Remaining Distance:\n" + nf(distance, 0, 2) + "km", 10, 90);
  pop();

  //Draw-HP-bar

  push();
  stroke(255, 0, 0, 200);
  strokeWeight(5);
  noFill();
  rect((width - maxHP * 2) / 2, 650, 2 * maxHP, 10);
  strokeWeight(0);
  fill(255, 0, 0);
  if (WH == -1 && HP >= 0) {
    rect((width - maxHP * 2) / 2, 650, HP * 2, 10);
  }
  textSize(10);
  fill(255, 255, 255);
  text("SHIELD", 190, 660);
  pop();

  //Sun-light
  if (distance <= 100000000000) {
    push();
    fill(255, 0, 0, (255 / 100000000000) * (100000000000 - distance));
    rect(0, 0, width, height);
  }
  //Death-judgement
  if (HP < 0 || distance < 0) {
    resYear = frameCount - 1;
    resTravel = travelled;
    if (resYear > yearLongest) {
      yearLongest = resYear - 1;
    }
    if (resTravel - speedEscape > travelLongest) {
      travelLongest = nf(travelled - speedEscape,0,0);
    }
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    textSize(15);
    fill("lightBlue");
    text(
      "Thank you for your service\n\nYou survived in\nthe Deep Space for\n" +
        resYear +
        " years,\ntravelled " +
        nf(resTravel / 1000000000, 0, 2) +
        " bn km.\n\nClick to try again.",
      15,
      300
    );
    noLoop();
    if (mouseIsPressed) {
      soundtrack.stop();
      loop();
      resYear -= 1;
      resTravel -= speedEscape;
      setup();
    }
  }
  if (frameCount <= 1) {
    push();
    fill(255, 0, 0, 255);
    rect(0, 0, width, height);
    fill(255, 255, 255, 250 - frameCount * 5);
    textSize(15);
    text("Click to start mission.", 50, 340);
    pop();
  } else if (frameCount < 50) {
    push();
    fill(255, 255, 255, 250 - frameCount * 5);
    textSize(15);
    text("Mission  started.", 100, 340);
    pop();
  }
}

function mousePressed() {
  loop();
}
