import { phaserFactory } from '../../phaser';

describe('Boot Scene', () => {
  let game: Phaser.Game;
  let scene: Phaser.Scene & { init: () => void; preload: () => void; create: () => void };

  // Squelch console.log output.
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Running game calls window.focus method.
  jest.spyOn(window, 'focus').mockImplementation(() => undefined);

  beforeAll(() =>
    phaserFactory().then(() => {
      game = new Phaser.Game({
        type: Phaser.HEADLESS,
        callbacks: {
          postBoot: () => game.loop.stop()
        }
      });

      // TODO: Test env issue: Pretend that built-in textures were loaded...
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
    game.scene.add(scene.sys.settings.key, scene);
    expect(game.scene.getScene(scene.sys.settings.key)).toBeTruthy();
  });

  it('starts & follows its lifecycle', () => {
    const spyInit = jest.spyOn(scene, 'init');
    const spyPreload = jest.spyOn(scene, 'preload');
    const spyCreate = jest.spyOn(scene, 'create');
    // Spy on next scene start.
    const spySceneStart = jest.spyOn(scene.scene, 'start');

    game.scene.start(scene.sys.settings.key);

    expect(spyInit).toHaveBeenCalled();
    expect(spyPreload).toHaveBeenCalled();
    expect(spyCreate).toHaveBeenCalled();
    expect(spySceneStart).toHaveBeenCalled();
  });
});
