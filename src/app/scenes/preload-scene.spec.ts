import { phaserFactory } from '../../phaser';

describe('Preload Scene', () => {
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
    import('./preload-scene').then(({ PreloadScene }) => {
      scene = new PreloadScene();

      expect(scene).toBeTruthy();
      expect(scene instanceof PreloadScene).toBe(true);
    }));

  it("has its scene key set to 'Preload'", () => expect(scene.sys.settings.key).toBe('Preload'));

  it('can be added to a game', () => {
    game.scene.add(scene.sys.settings.key, scene);
    expect(game.scene.getScene(scene.sys.settings.key)).toBeTruthy();
  });

  it('starts & follows its lifecycle', () => {
    const spyInit = jest.spyOn(scene, 'init');
    const spyPreload = jest.spyOn(scene, 'preload');
    // Spy on file pack load.
    const spyLoadPack = jest.spyOn(scene.load, 'pack');
    // Spy on transition to next scene.
    const spySceneTransition = jest.spyOn(scene.scene, 'transition');

    game.scene.start(scene.sys.settings.key);

    expect(spyInit).toHaveBeenCalled();
    expect(spyPreload).toHaveBeenCalled();
    expect(spyLoadPack).toHaveBeenCalled();

    scene.create();

    expect(spySceneTransition).toHaveBeenCalled();
  });
});
