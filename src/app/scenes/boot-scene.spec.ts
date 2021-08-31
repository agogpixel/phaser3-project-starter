import { phaserFactory } from '../../phaser';

describe('Boot Scene', () => {
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
    import('./boot-scene').then(({ BootScene }) => {
      scene = new BootScene();

      expect(scene).toBeTruthy();
      expect(scene instanceof BootScene).toBe(true);
    }));

  it("has its scene key set to 'Boot'", () => expect(scene.sys.settings.key).toBe('Boot'));

  it('can be added to a game', () => {
    game.scene.add((scene as Phaser.Scene).sys.settings.key, scene);
    expect(game.scene.getScene(scene.sys.settings.key)).toBeTruthy();
  });

  it('starts', () => {
    const spyInit = jest.spyOn(scene, 'init' as any);
    const spyPreload = jest.spyOn(scene, 'preload' as any);
    const spyCreate = jest.spyOn(scene, 'create' as any);
    const spyStartNextScene = jest.spyOn(scene.scene, 'start');

    game.scene.start(scene.sys.settings.key);

    expect(spyInit).toHaveBeenCalled();
    expect(spyPreload).toHaveBeenCalled();
    expect(spyCreate).toHaveBeenCalled();
    expect(spyStartNextScene).toHaveBeenCalled();
  });
});
