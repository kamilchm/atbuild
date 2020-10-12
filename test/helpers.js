import path from "path";
import _webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";

export function webpack(fixture, options = {}) {
  const compiler = _webpack({
    context: path.join(__dirname, "../"),
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: "bundle.js",
    },

    mode: "development",
    devtool: false,
    target: "node",
    resolve: {
      extensions: [".@js", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.@js$/,
          use: [
            {
              loader: path.resolve(__dirname, "../src/webpack-loader"),
              options,
            },
            // {
            //   loader: "babel-loader",
            //   options: {
            //     presets: [
            //       [
            //         "@babel/preset-env",
            //         {
            //           targets: {
            //             node: "current",
            //           },
            //         },
            //       ],
            //     ],
            //   },
            // },
          ],
        },
        {
          test: /\.js$/,
          type: "javascript/auto",
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      node: "current",
                    },
                  },
                ],
              ],
            },
          },
        },
      ],
    },
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);

      resolve([stats, compiler.outputFileSystem]);
    });
  });
}
