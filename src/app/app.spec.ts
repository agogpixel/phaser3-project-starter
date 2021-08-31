import { phaserFactory } from '../phaser';

describe('App', () => {
  let app: (gameConfig: Phaser.Types.Core.GameConfig) => Promise<{ game: Phaser.Game }>;
  let application: { game: Phaser.Game };

  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(window, 'focus').mockImplementation(() => {});

  beforeAll(() => phaserFactory().then(() => import('./app').then(({ app: appFn }) => (app = appFn))));

  afterAll(() => {
    application.game.destroy(true, true);
    (application.game as any).runDestroy();
    delete global.Phaser;
  });

  it('is a function', () => expect(typeof app).toBe('function'));

  it('creates an application object', () =>
    app({
      type: Phaser.HEADLESS,
      callbacks: {
        postBoot: () => application.game.loop.stop()
      }
    }).then((a) => {
      application = a;
      application.game.textures.emit(Phaser.Textures.Events.READY);

      expect(typeof application).toBe('object');
    }));

  it('creates application containing a game instance', () =>
    expect(application.game instanceof Phaser.Game).toBeTruthy());
});
