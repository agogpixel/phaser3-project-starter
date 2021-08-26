declare const APP_TITLE: string;
declare const APP_VERSION: string;

(async function bootstrap() {
  await (await import(/* webpackChunkName: "phaser" */ './phaser')).phaser();
  (await import(/* webpackChunkName: "app" */ './app')).app(APP_TITLE, APP_VERSION);
})();
