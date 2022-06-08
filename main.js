const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board();

function play() {
  board.reset();
  let piece = new Piece(ctx);
  piece.draw();
  board.piece = piece;
}

moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]: (p) => {
    const shapeIdx = (p.shapeIdx + 1) % (p.forms.length);
    const shape = p.forms[shapeIdx]
    return ({ ...p, shape, shapeIdx})
  },
};

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (moves[event.key]) {
    event.preventDefault();

    let p = moves[event.key](board.piece);

    if (event.key === KEY.SPACE) {
      while (board.valid(p)) {
        board.piece.move(p);
        p = moves[event.key](board.piece);
      }
    } else if (event.key === KEY.UP) {
      console.log(p);
      if (board.valid(p)) {
        board.piece.rotate(p);
      }
    }

    console.table(p.shape);

    if (board.valid(p)) {
      board.piece.move(p);
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.piece.draw();
  }
});
