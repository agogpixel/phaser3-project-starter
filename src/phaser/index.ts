// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../node_modules/phaser/types/phaser.d.ts" />

import { phaser as _phaser } from './phaser';

export async function phaser() {
  return _phaser() as unknown as Promise<typeof Phaser>;
}
