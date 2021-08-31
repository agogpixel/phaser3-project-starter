import { PreloadScene } from './preload-scene';

/**
 * Boot scene.
 */
export class BootScene extends Phaser.Scene {
  /**
   * Scene key.
   */
  public static readonly key = 'Boot';

  /**
   * Instantiate boot scene.
   */
  public constructor() {
    super(BootScene.key);
  }

  /**
   * Lifecycle method called before all others.
   */
  public init(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }

  /**
   * Lifecycle method called after init & before create.
   */
  public preload(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }

  /**
   * Lifecycle method called after init & preload.
   */
  public create(): void {
    this.scene.start(PreloadScene.key);
  }
}
