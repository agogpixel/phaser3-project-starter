import { phaserFactory } from '../../phaser';

describe('Main Scene', () => {
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
    import('./main-scene').then(({ MainScene }) => {
      scene = new MainScene();

      expect(scene).toBeTruthy();
      expect(scene instanceof MainScene).toBe(true);
    }));

  it("has its scene key set to 'Main'", () => expect(scene.sys.settings.key).toBe('Main'));

  it('can be added to a game', () => {
    game.scene.add(scene.sys.settings.key, scene);
    expect(game.scene.getScene(scene.sys.settings.key)).toBeTruthy();
  });

  it('starts & follows its lifecycle', () => {
    const spyInit = jest.spyOn(scene, 'init');
    const spyPreload = jest.spyOn(scene, 'preload');
    const spyCreate = jest.spyOn(scene, 'create');
    // Spy on tween start after scene transition.
    const spyTweensAdd = jest.spyOn(scene.tweens, 'add');

    // Mock loaded texture.
    game.textures.addImage('phaser3', new Image());

    game.scene.start(scene.sys.settings.key);

    expect(spyInit).toHaveBeenCalled();
    expect(spyPreload).toHaveBeenCalled();
    expect(spyCreate).toHaveBeenCalled();

    // Simulate scene transition.
    scene.events.emit(Phaser.Scenes.Events.TRANSITION_START);
    expect(spyTweensAdd).toHaveBeenCalled();
  });
});
