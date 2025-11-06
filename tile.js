const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

export class Tile {
  constructor(posX, posY, sprite) {
    this.posX = posX;
    this.posY = posY;
    this.color = null;

    this.sprite = new Image();
    this.sprite.src = sprite;

    this.lastBreak = 0;
    this.phase = 0;
  }

  update(cars) {
    let posX = this.posX * (canvas.width / 32);
    let posY = this.posY * (canvas.height / 32);
    let width = canvas.width / 32;
    let height = canvas.width / 32;

    for(let car of cars) {
      let carX = canvas.width * car.relX;
      let carY = canvas.height / 2 * car.relY;
        if(carX > posX && carX < posX + width) {
            if(carY > posY && carY < posY + height) {
              this.sprite = car.tile;
              this.color = car.color;
            }
        }
    }
  }

  draw() {
    ctx.drawImage(this.sprite, this.posX * (canvas.width / 32), this.posY * (canvas.width / 32), canvas.width / 32, canvas.width / 32);
  }
}