import { TitleScene } from './title-scene';

/**
 * Preload scene.
 */
export class PreloadScene extends Phaser.Scene {
  /**
   * Scene key.
   */
  public static readonly key = 'Preload';

  /**
   * Instantiate load scene.
   */
  public constructor() {
    super(PreloadScene.key);
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
    this.scene.transition({
      target: TitleScene.key,
      duration: 500,
      sleep: false,
      allowInput: false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onUpdate: (progress: number) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }
    });
  }
}
