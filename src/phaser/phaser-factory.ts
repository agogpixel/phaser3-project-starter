// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../node_modules/phaser/types/phaser.d.ts" />

import { phaser } from './phaser';

export async function phaserFactory() {
  return phaser() as unknown as Promise<typeof Phaser>;
}
