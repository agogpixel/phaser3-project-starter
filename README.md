# agogpixel/phaser3-project-starter

Another opinionated [Phaser 3](https://github.com/photonstorm/phaser) project starter with [TypeScript](https://www.typescriptlang.org/), [webpack](https://webpack.js.org/), & [jest](https://jestjs.io/).

Code style/formatting with [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/); pre-commit hook via [Husky](https://typicode.github.io/husky) & [lint-staged](https://github.com/okonet/lint-staged).

## Getting Started

Create a new repository from this template - see [Creating a repository from a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template) for more information.

Alternatively:

```shell
git clone https://github.com/agogpixel/phaser3-project-starter.git <repo>
cd <repo>
rm -rf .git
git init
git branch -M <branch-name>
git add .
git commit -m "Initial commit."
git remote add origin https://github.com/<account>/<repo>.git
git push -u origin <branch-name>
```

Once the project template has been setup locally, install dependencies:

```shell
npm install
```

## Usage

This project starter provides facilities for customizing Phaser namespace build and load functionality. This is structured around Webpack `v4` as that is what the Phaser 3 project uses (other useful packages may still be dependent on `v4` as well - for example [cordova-webpack-plugin](https://github.com/kotarella1110/cordova-plugin-webpack)). See [phaser.js](./src/phaser/phaser.js) for customizing a Phaser build based on the currently installed Phaser NPM package.

### File Structure

```text
phaser3-project-starter/
 |
 ├──.github/                           * GitHub configurations.
 |   |
 |   ├──workflows/                     * GitHub Actions configurations.
 |   |   ├──test-build-deploy.yml      * Example CI/CD configuration (manual trigger).
 |   |   └──test.yml                   * Example CI configuration (on push, all branches).
 |   |
 |   └──CODEOWNERS                     * Define who is responsible for code in the repository.
 │
 ├──.vscode/                           * VSCode configurations.
 |   └──settings.json                  * Example configuration with auto-formatting on save.
 │
 ├──src/                               * Source files.
 |   |
 |   ├──app/                           * Application files.
 |   |   |
 |   |   ├──scenes/                    * Phaser scenes.
 |   |   |   ├──boot-scene.spec.ts     * Boot scene unit tests.
 |   |   |   ├──boot-scene.ts          * Boot scene suitable for loading and initializing functionality required in other scenes.
 |   |   |   ├──index.ts               * Exported scenes for use in game configuration.
 |   |   |   ├──main-scene.spec.ts     * Main scene unit tests.
 |   |   |   ├──main-scene.ts          * Main scene suitable for game logic and display.
 |   |   |   ├──preload-scene.spec.ts  * Preload scene unit tests.
 |   |   |   └──preload-scene.ts       * Preload scene suitable for game asset load & progress display.
 |   |   |
 |   |   ├──app.spec.ts                * App factory unit tests.
 |   |   ├──app.ts                     * App factory.
 |   |   ├──game-config.ts             * Phaser game configuration.
 |   |   └──index.ts                   * Exported app factory and game config for use in application bootstrapping.
 |   |
 |   ├──assets/                        * Asset files.
 |   |   |
 |   |   ├──textures/                  * Texture files.
 |   |   |   └──phaser3.png            * Example image.
 |   |   |
 |   |   └──manifest.json              * Phaser file pack. Utilized in Preload scene.
 |   |
 |   ├──phaser/                        * Phaser files.
 |   |   ├──index.ts                   * Exported Phaser factory.
 |   |   ├──phaser-factory.spec.ts     * Phaser factory unit tests.
 |   |   ├──phaaser-factory.ts         * Phaser factory api.
 |   |   └──phaser.js                  * Custom Phaser build based on currently installed Phaser NPM package.
 |   |
 |   ├──index.html                     * HTML template.
 |   └──index.ts                       * Bootstrap & run the application.
 |
 ├──.editorconfig                      * EditorConfig configurations.
 ├──.eslintrc                          * ESLint configurations.
 ├──.gitignore                         * Git ignore file.
 ├──.npmrc                             * NPM configuration.
 ├──.prettierignore                    * Prettier ignore configuration.
 ├──.prettierrc                        * Prettier configuration.
 ├──jest.config.js                     * Jest test framework configuration.
 ├──LICENSE                            * Project license.
 ├──package-lock.json                  * Auto-generated NPM project configuration.
 ├──package.json                       * NPM project configuration.
 ├──README.md                          * Project README.
 ├──tsconfig.json                      * TypeScript configuration.
 └──webpack.config.js                  * Webpack configuration.
```

### Develop

Live development at `localhost:4200` via webpack-dev-server:

```shell
npm start
```

### Lint

Errors & warnings output to stdout via eslint:

```shell
npm run lint
```

### Unit Test

Unit tests with coverage reporting output to `coverage/` via jest:

```shell
npm test
```

### Build

Build output to `dist/` via webpack:

```shell
npm run build
```

## Contributing

Discuss the change you wish to make via issue or email.

## License

Licensed under the [MIT License](./LICENSE).
