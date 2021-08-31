declare const GAME_TITLE: string;
declare const GAME_VERSION: string;

(async function bootstrap() {
  await (await import(/* webpackChunkName: "phaser" */ './phaser')).phaserFactory();

  const { app, gameConfig } = await import(/* webpackChunkName: "app" */ './app');
  app({ ...gameConfig, title: GAME_TITLE, version: GAME_VERSION });
})();
