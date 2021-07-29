/**
 * Main scene.
 */
export class MainScene extends Phaser.Scene {
  /**
   * Scene key.
   */
  public static readonly key = 'Main';

  /**
   * Instantiate main scene.
   */
  public constructor() {
    super(MainScene.key);
  }

  /**
   * Lifecycle method called after init & preload.
   */
  public create(): void { }
}
