import { phaser } from './phaser';

describe('Phaser Factory', () => {
  it('is a function', () => {
    expect(typeof phaser).toBe('function');
  })

  it('creates Phaser object', () => {
    return phaser().then(
      p => {
        expect(p).toBeTruthy();
        expect(typeof p).toBe('object');
        expect(Phaser).toBeTruthy();
        expect(typeof Phaser).toBe('object');
      },
      e => console.error(e)
    );
  });
});
