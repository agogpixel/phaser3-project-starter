import { phaserFactory } from './phaser-factory';

describe('Phaser Factory', () => {
  it('is a function', () => {
    expect(typeof phaserFactory).toBe('function');
  });

  it('creates Phaser namespace object with global scope', () => {
    return phaserFactory().then(
      (p) => {
        expect(p).toBeTruthy();
        expect(typeof p).toBe('object');
        expect(Phaser).toBeTruthy();
        expect(typeof Phaser).toBe('object');
      },
      (e) => console.error(e)
    );
  });
});
