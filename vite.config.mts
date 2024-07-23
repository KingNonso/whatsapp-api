import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/node_modules/**', '**/commitlint.config.ts', '**/release.config.cjs', '**/index.ts'],
    },
    globals: true,
    restoreMocks: true,
  },
  // build: {
  //   commonjsOptions: {
  //     include: [
  //       './node_modules/swagger-ui-dist/swagger-ui.css',
  //       './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
  //       './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
  //       './node_modules/swagger-ui-dist/favicon-16x16.png',
  //       './node_modules/swagger-ui-dist/favicon-32x32.png',
  //     ],
  //   },
  // },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       'swagger-ui.css': path.resolve(__dirname, './node_modules/swagger-ui-dist/swagger-ui.css'),
  //       'swagger-ui-bundle.js': path.resolve(__dirname, './node_modules/swagger-ui-dist/swagger-ui-bundle.js'),
  //       'swagger-ui-standalone-preset.js': path.resolve(
  //         __dirname,
  //         './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js'
  //       ),
  //       'favicon-16x16.png': path.resolve(__dirname, './node_modules/swagger-ui-dist/favicon-16x16.png'),
  //       'favicon-32x32.png': path.resolve(__dirname, './node_modules/swagger-ui-dist/favicon-32x32.png'),
  //     },
  //   },
  // },
  plugins: [tsconfigPaths()],
});
