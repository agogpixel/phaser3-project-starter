import { MainScene, PreloadScene, TitleScene } from './scenes';

export function app(title: string, version: string): void {
  new Phaser.Game({
    title,
    version,
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
      width: '100%',
      height: '100%'
    },
    plugins: {
      global: []
    },
    scene: [PreloadScene, TitleScene, MainScene]
  });
}
