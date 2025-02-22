const PACKAGE_JSON_CONTENTS = {
  name: "atbuild",
  version: "1.5.16",
  main: "dist/atbuild.js",
  browser: "web/atbuild.js",
  license: "MIT",
  types: "types.ts.d",
  files: [
    "package.json",
    "dist",
    "web",
    "types.ts.d",
    "webpack-loader.js",
    "index.js",
    "with-nextjs.js",
    "jest.js",
    "light.js",
    "jest-with-babel.js"
  ],
  bin: {
    atbuild: "./dist/cli.js"
  },
  devDependencies: {
    "@babel/cli": "^7.11.6",
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-typescript": "^7.12.1",
    "@types/benchmark": "^2.1.0",
    "@types/jest": "^26.0.15",
    "@types/webpack": "^4.41.24",
    "babel-jest": "^26.5.2",
    "babel-loader": "^8.1.0",
    benchmark: "^2.1.4",
    jest: "^26.6.3",
    "jest-cli": "^26.5.3",
    lodash: "^4.17.20",
    memfs: "^3.2.0",
    "node-fetch": "^2.6.1",
    rimraf: "^3.0.2",
    typescript: "^4.0.5",
    webpack: "^5.0.0"
  },
  peerDependencies: {
    typescript: "^4.0.5",
    webpack: "^5.0.0"
  },
  optionalDependencies: {
    "vscode-languageserver": "^6.1.1"
  },
  scripts: {
    test: "jest src",
    bench: "node bench-data/full2-bench.js",
    cli: "yarn --silent build-node && FORCE_DEV=true node dist/cli.js $1",
    "clear-test": "rm samples/*.d.ts",
    "update-readme": "node dist/cli.js ./README.md.jsb ./README.md",
    postpublish: "yarn bump-docs",
    "bump-docs": "node ./scripts/bump-docs-version.js && cd docs; yarn install; cd ../",
    "prebuild-node": "rimraf dist",
    "prebuild-web": "rimraf web",
    "build-node": `esbuild --target=node10 --define:"process.env.NODE_ENV"="'production'" --define:"process.env.WEB=false" src/*{.ts,.js} src/**/*{.ts,.js} --format=cjs  --outdir=./dist --platform=node`,
    postbuild: "rimraf dist/**/*{.test.ts, .test.js, .ts.d.js}",
    build: "yarn build-node && yarn build-web && yarn build-types",
    "build-web": `esbuild --sourcemap --define:"process.env.NODE_ENV"="'production'" --define:"process.env.WEB=true" --bundle ./src/atbuild.ts ./src/fullAst.ts ./src/light.ts --format=esm  --outdir=./web `,
    "build-types": "yarn tsc --p tsconfig.json --outfile types || true",
    prepublishOnly: "yarn build",
    "compile-vscode-client": 'babel --config-file=./babel.config.js --extensions ".ts" ./atbuild-vscode/client/src --ignore=atbuild-vscode/**/*.test.js -d ./atbuild-vscode/client/out --delete-dir-on-start',
    "compile-vscode-server": 'babel --config-file=./babel.config.js --extensions ".ts" ./atbuild-vscode/server/src --ignore=atbuild-vscode/**/*.test.js -d ./atbuild-vscode/server/out --delete-dir-on-start',
    "compile-vscode": "yarn --silent compile-vscode-client && yarn --silent compile-vscode-server",
    "precompile-vscode": "yarn build",
    "postcompile-vscode": "cp dist/atbuild.js ./atbuild-vscode/client/out/atbuild.js; cp dist/atbuild.js ./atbuild-vscode/server/out/atbuild.js"
  },
  dependencies: {
    "@ungap/weakrefs": "^0.2.0",
    esbuild: "^0.8.5",
    "loader-utils": "^2.0.0",
    meow: "^7.1.1"
  }
};
const didRemoveBuildTimeCode = true;
