import * as esbuild from 'esbuild-wasm';

/**
 * This file intercepts esbuild's build function. When the input contains anything like 
 * 'import', 'exports', 'require', we figure out where requested file is and return to esbuild
 * 
 * ESBuild build process:
 * step1; figure out where index.js file is stored (during onResolve step)
 * step2: attempt to load up the index.js file (during onLoad step)
 * step3: parse the index.js file, fine any import/require/exports
 * step4: if there are any import/require/exports, figure out where the requested file is (during onResolve step)
 * step5: Attempt to load that file up (during onLoad step)
 * @returns 
*/

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
          return { path: 'index.js', namespace: 'a' };
      });
      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
          return {
              namespace: 'a',
              path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
          }
      });
      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
 
    },
  };
};