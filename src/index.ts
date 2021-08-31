// See DefinePlugin in webpack.config.json file.
declare const GAME_TITLE: string;
declare const GAME_VERSION: string;

(async function bootstrap() {
  const { phaserFactory } = await import(/* webpackChunkName: "phaser" */ './phaser');
  await phaserFactory();

  const { app, gameConfig } = await import(/* webpackChunkName: "app" */ './app');
  await app({ ...gameConfig, title: GAME_TITLE, version: GAME_VERSION });
})();
