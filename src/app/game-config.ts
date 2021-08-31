import { BootScene, MainScene, PreloadScene } from './scenes';

/**
 * Game configuration.
 */
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'body',
  dom: {
    createContainer: false,
    behindCanvas: false,
    pointerEvents: undefined
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 960
  },
  plugins: {
    global: []
  },
  scene: [BootScene, PreloadScene, MainScene]
};
