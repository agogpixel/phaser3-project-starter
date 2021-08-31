import { phaserFactory } from '../phaser';

describe('App', () => {
  let app: (gameConfig: Phaser.Types.Core.GameConfig) => Promise<{ game: Phaser.Game }>;
  let application: { game: Phaser.Game };

  // Squelch console.log output.
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Running game calls window.focus method.
  jest.spyOn(window, 'focus').mockImplementation(() => undefined);

  beforeAll(() => phaserFactory().then(() => import('./app').then(({ app: appFn }) => (app = appFn))));

  afterAll(() => {
    application.game.destroy(true, true);
    application.game['runDestroy']();
    delete global.Phaser;
  });

  it('is a function', () => expect(typeof app).toBe('function'));

  it('creates application object', () =>
    app({
      type: Phaser.HEADLESS,
      callbacks: {
        postBoot: () => application.game.loop.stop()
      }
    }).then((a) => {
      application = a;

      // TODO: Test env issue: Pretend that built-in textures were loaded...
      application.game.textures.emit(Phaser.Textures.Events.READY);

      expect(typeof application).toBe('object');
    }));

  it('creates application object containing a game instance', () =>
    expect(application.game instanceof Phaser.Game).toBeTruthy());
});
