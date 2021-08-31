/**
 * Main scene.
 *
 * Suitable for game logic and display.
 */
export class MainScene extends Phaser.Scene {
  /**
   * Instantiate main scene.
   */
  public constructor() {
    super('Main');
  }

  /**
   * Lifecycle method called before all others.
   */
  public init(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }

  /**
   * Lifecycle method called after init & before create. Ensures all assets load
   * before create is invoked.
   */
  public preload(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }

  /**
   * Lifecycle method called after init & preload.
   */
  public create(): void {
    const { centerX, centerY } = this.cameras.main;

    const img = this.add.image(centerX, centerY, 'phaser3');

    this.events.once(Phaser.Scenes.Events.TRANSITION_START, (fromScene, duration) => {
      img.setAlpha(0);

      this.tweens.add({
        targets: img,
        alpha: 1,
        duration,
        onComplete: () => {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
        }
      });
    });
  }
}
