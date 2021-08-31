import { phaserFactory } from '../../phaser';

describe('Main Scene', () => {
  let game: Phaser.Game;
  let scene: Phaser.Scene;

  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(window, 'focus').mockImplementation(() => {});

  beforeAll(() =>
    phaserFactory().then(() => {
      game = new Phaser.Game({
        type: Phaser.HEADLESS,
        callbacks: {
          postBoot: () => game.loop.stop()
        }
      });

      game.textures.emit(Phaser.Textures.Events.READY);
    })
  );

  afterAll(() => {
    game.destroy(true, true);
    game['runDestroy']();
    delete global.Phaser;
  });

  it('instantiates', () =>
    import('./main-scene').then(({ MainScene }) => {
      scene = new MainScene();

      expect(scene).toBeTruthy();
      expect(scene instanceof MainScene).toBe(true);
    }));

  it("has its scene key set to 'Main'", () => expect(scene.sys.settings.key).toBe('Main'));

  it('can be added to a game', () => {
    game.scene.add((scene as Phaser.Scene).sys.settings.key, scene);
    expect(game.scene.getScene(scene.sys.settings.key)).toBeTruthy();
  });

  it('starts', () => {
    const spyInit = jest.spyOn(scene, 'init' as any);
    const spyPreload = jest.spyOn(scene, 'preload' as any);
    const spyCreate = jest.spyOn(scene, 'create' as any);
    const spyStartTween = jest.spyOn(scene.tweens, 'add');

    game.textures.addImage('phaser3', new Image());
    game.scene.start(scene.sys.settings.key);

    expect(spyInit).toHaveBeenCalled();
    expect(spyPreload).toHaveBeenCalled();
    expect(spyCreate).toHaveBeenCalled();

    scene.events.emit(Phaser.Scenes.Events.TRANSITION_START);

    expect(spyStartTween).toHaveBeenCalled();
  });
});