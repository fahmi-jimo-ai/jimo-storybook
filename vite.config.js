import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Allow .js files that contain JSX (src/components/ui/**) to be parsed correctly
const jsxInJsPlugin = {
  name: 'treat-js-files-as-jsx',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.match(/src\/components\/ui\/.*\.js$/)) return null;
    return transformWithEsbuild(code, id.replace(/\.js$/, '.jsx'), { loader: 'jsx' });
  },
};

export default defineConfig({
  plugins: [jsxInJsPlugin, react()],
  resolve: {
    alias: {
      '@lib': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src'),
    },
  },
});
