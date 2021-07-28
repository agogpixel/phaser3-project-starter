import { MainScene, PreloadScene, TitleScene } from './scenes'

export function app(): void {
  new Phaser.Game({
    title: 'agogpixel/phaser3-project-starter',
    version: '0.0.0',
    type: Phaser.AUTO,
    parent: 'body',
    dom: {
      createContainer: true
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
