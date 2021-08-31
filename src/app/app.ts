export async function app(gameConfig: Phaser.Types.Core.GameConfig) {
  return {
    game: new Phaser.Game(gameConfig)
  };
}
