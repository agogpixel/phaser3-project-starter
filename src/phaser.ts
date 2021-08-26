// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/phaser/types/phaser.d.ts" />

declare const FEATURE_SOUND;
declare const PLUGIN_CAMERA3D;
declare const PLUGIN_FBINSTANT;

import 'phaser/src/polyfills';

import * as CONST from 'phaser/src/const';
import * as Extend from 'phaser/src/utils/object/Extend';

let phaser = {
  Actions: require('phaser/src/actions'),
  Animations: require('phaser/src/animations'),
  BlendModes: require('phaser/src/renderer/BlendModes'),
  Cache: require('phaser/src/cache'),
  Cameras: require('phaser/src/cameras'),
  Core: require('phaser/src/core'),
  Class: require('phaser/src/utils/Class'),
  Create: require('phaser/src/create'),
  Curves: require('phaser/src/curves'),
  Data: require('phaser/src/data'),
  Display: require('phaser/src/display'),
  DOM: require('phaser/src/dom'),
  Events: require('phaser/src/events'),
  FacebookInstantGamesPlugin: typeof PLUGIN_FBINSTANT
    ? require('phaser/plugins/fbinstant/src/FacebookInstantGamesPlugin')
    : undefined,
  Game: require('phaser/src/core/Game'),
  GameObjects: require('phaser/src/gameobjects'),
  Geom: require('phaser/src/geom'),
  Input: require('phaser/src/input'),
  Loader: require('phaser/src/loader'),
  Math: require('phaser/src/math'),
  Physics: require('phaser/src/physics'),
  Plugins: require('phaser/src/plugins'),
  Renderer: require('phaser/src/renderer'),
  Scale: require('phaser/src/scale'),
  ScaleModes: require('phaser/src/renderer/ScaleModes'),
  Scene: require('phaser/src/scene/Scene'),
  Scenes: require('phaser/src/scene'),
  Sound: typeof FEATURE_SOUND ? require('phaser/src/sound') : undefined,
  Structs: require('phaser/src/structs'),
  Textures: require('phaser/src/textures'),
  Tilemaps: require('phaser/src/tilemaps'),
  Time: require('phaser/src/time'),
  Tweens: require('phaser/src/tweens'),
  Utils: require('phaser/src/utils')
};

if (typeof PLUGIN_CAMERA3D) {
  phaser.Cameras.Sprite3D = require('phaser/plugins/camera3d/src');
  phaser.GameObjects.Sprite3D = require('phaser/plugins/camera3d/src/sprite3d/Sprite3D');
  phaser.GameObjects.Factories.Sprite3D = require('phaser/plugins/camera3d/src/sprite3d/Sprite3DFactory');
  phaser.GameObjects.Creators.Sprite3D = require('phaser/plugins/camera3d/src/sprite3d/Sprite3DCreator');
}

phaser = Extend(false, phaser, CONST);

global.Phaser = phaser as unknown as typeof Phaser;
