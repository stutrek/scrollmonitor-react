Minimal example for [this issue](https://github.com/stutrek/scrollmonitor-react/issues/2).

`npm i && npm start`

`npm start` will fail. Change `main: index.js` in `node_modules/scrollmonitor-react/package.json`
to point to `dist/index.js`.

Build will succeed but still be broken.
