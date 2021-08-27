import { phaserFactory } from '../phaser';

describe('App', () => {
  it('is a function', () => {
    return phaserFactory().then(() => import('./app').then(({ app }) => expect(typeof app).toBe('function')));
  });

  it('creates Phaser game instance', () => {
    return phaserFactory().then(() =>
      import('./app').then(({ app }) =>
        app('Test', '0.0.0').then((game) => expect(game instanceof Phaser.Game).toBeTruthy())
      )
    );
  });
});
