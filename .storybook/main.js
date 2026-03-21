import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'path';
import { transformWithEsbuild } from 'vite';

// Allow .js files that contain JSX (src/components/ui/**) to be parsed correctly
const jsxInJsPlugin = {
  name: 'treat-js-files-as-jsx',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.match(/src\/components\/ui\/.*\.js$/)) return null;
    return transformWithEsbuild(code, id.replace(/\.js$/, '.jsx'), { loader: 'jsx' });
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  stories: ['../stories/**/*.stories.@(js|jsx)', '../stories/**/*.mdx'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    experimentalComponentsManifest: true,
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@lib': resolve(__dirname, '../src'),
      '@': resolve(__dirname, '../src'),
    };

    // Ensure JSX is transformed in .js component files
    config.plugins = [jsxInJsPlugin, ...(config.plugins ?? [])];

    return config;
  },
};

export default config;
