class GameView {
  constructor(game, ctx) {
    console.log("This is the GameView", game, ctx);
  }
}

GameView.prototype.start = function () {
  console.log("start now");
};

export default GameView;
