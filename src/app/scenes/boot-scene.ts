/**
 * Boot scene.
 *
 * Suitable for loading and initializing functionality required in other scenes
 * (ie. Load basic assets, communicate with a backend, etc.).
 */
export class BootScene extends Phaser.Scene {
  /**
   * Instantiate boot scene.
   */
  public constructor() {
    super('Boot');
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
    this.scene.start('Preload');
  }
}
