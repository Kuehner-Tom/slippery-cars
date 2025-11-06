const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

export class Car {
  constructor(relX, relY, controls, keys, sprite, tile, color) {
    this.relX = relX;
    this.relY = relY;

    this.relVelX = 0;
    this.relVelY = 0;

    this.direction = 0;
    this.speed = 0.35;
    this.turnSpeed = 0.06;
    this.friction = 0.98;
    this.color = color;

    this.controls = controls;
    this.keys = keys;

    this.sprite = new Image();
    this.sprite.src = sprite;

    this.tile = new Image();
    this.tile.src = tile;
  }

  toDeg(rad) {
    let deg = (rad * 180 / Math.PI) % 360;
    if (deg < 0) deg += 360;
    return deg;
  }

  verticalCloseness(rad) {
    const twoPI = Math.PI * 2;
    rad = ((rad % twoPI) + twoPI) % twoPI;

    const diffTo90 = Math.abs(rad - Math.PI / 2);
    const diffTo270 = Math.abs(rad - 3 * Math.PI / 2);

    const diff = Math.min(diffTo90, diffTo270);

    const closeness = 1 - (diff / (Math.PI / 2));

    return Math.max(0, Math.min(1, closeness));
  }

  horizontalCloseness(rad) {
    const twoPI = Math.PI * 2;
    rad = ((rad % twoPI) + twoPI) % twoPI;

    const diffTo0 = Math.abs(rad - 0);
    const diffTo180 = Math.abs(rad - Math.PI);

    const diff = Math.min(diffTo0, diffTo180);

    const closeness = 1 - (diff / (Math.PI / 2));

    return Math.max(0, Math.min(1, closeness));
  }


  update() {
    this.relVelX *= this.friction;
    this.relVelY *= this.friction;

    if (this.keys[this.controls.forward]) {
      this.relVelX += Math.cos(this.direction) * (this.speed / canvas.width);
      this.relVelY += Math.sin(this.direction) * (this.speed / canvas.width);
    }
    if (this.keys[this.controls.backward]) {
      this.relVelX -= Math.cos(this.direction) * (this.speed / canvas.width);
      this.relVelY -= Math.sin(this.direction) * (this.speed / canvas.width);
    }
    if (this.keys[this.controls.left]) {
      this.direction -= this.turnSpeed;
    }
    if (this.keys[this.controls.right]) {
      this.direction += this.turnSpeed;
    }

    this.relX += this.relVelX;
    this.relY += this.relVelY;

    if (this.relX > 1) {
      this.relX = 1;
      this.relVelX *= -1 * this.verticalCloseness(this.direction) * 2;
    } else if (this.relX < 0) {
      this.relX = 0;
      this.relVelX *= -1 * this.verticalCloseness(this.direction) * 2;
    }

    if (this.relY > 1) {
      this.relY = 1;
      this.relVelY *= -1 * this.horizontalCloseness(this.direction) * 2;
    } else if (this.relY < 0) {
      this.relY = 0;
      this.relVelY *= -1 * this.horizontalCloseness(this.direction) * 2;
    }
  }

  draw() {
    ctx.save();

    const posX = this.relX * canvas.width;
    const posY = this.relY * (canvas.width / 2);

    ctx.translate(posX, posY);
    ctx.rotate(this.direction);

    const width = canvas.width * (2 / 40);
    const height = canvas.width * (1 / 40);

    ctx.drawImage(this.sprite, -width / 2, -height / 2, width, height);
    ctx.restore();
  }
}
