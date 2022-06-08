class Piece {
  x;
  y;
  color;
  forms;
  shape;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
    const config = randomElement(blocks);
    this.spawn(config);
  }

  spawn({ color, forms }) {
    this.color = color;
    this.forms = forms;
    this.shapeIdx = 0;
    this.shape = this.forms[this.shapeIdx];
    this.x = 3;
    this.y = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  move(p) {
    this.x = p.x;
    this.y = p.y;
  }

  rotate(p) {
    this.shapeIdx = p.shapeIdx;
    this.shape = p.shape;
  }
}
