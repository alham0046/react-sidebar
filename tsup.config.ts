// import { defineConfig } from 'tsup';
// import type { Options } from 'tsup'; // Use type-only import if needed

// export default defineConfig({
//   entry: ['src/index.ts'],
//   format: ['esm', 'cjs'],
//   dts: true,
//   sourcemap: true,
//   clean: true,
//   minify: true,
//   splitting: false,
//   bundle: true,
//   shims: true,
//   external: [
//     'react',
//     'react-dom',
//     'framer-motion'
//   ], // you can list peer deps here if needed
//   injectStyle: true, // 👈 This is the important one
//   // loader: {
//   //   '.css': 'copy' // 👈 important
//   // },
//   // esbuildOptions(options) {
//   //   // This tells esbuild to treat .module.css files as modules
//   //   // so that it generates the JS object exports you need.
//   //   options.loader = {
//   //     ...options.loader,
//   //     ".module.css": "local-css", 
//   //   };
//   // }
//   loader: {
//     '.css': 'css', // 👈 Tell tsup to process css files
//   },
// });

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: false,
  bundle: true,
  shims: true,
  external: [], // you can list peer deps here if needed
  injectStyle: true, // 👈 This is the important one
  loader: {
    '.css': 'css', // 👈 Tell tsup to process css files
  },
});