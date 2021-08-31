/**
 * Load the application.
 *
 * @param gameConfig Game configuration.
 */
export async function app(gameConfig: Phaser.Types.Core.GameConfig): Promise<{
  game: Phaser.Game;
}> {
  return {
    game: new Phaser.Game(gameConfig)
  };
}
