import type { Preview } from '@storybook/react-vite';

// Import design tokens — locally bundled inside jimo-storybook
import '../src/styles/tokens.css';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '900px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '812px' },
        },
      }
    },
    layout: 'centered',
  },

  initialGlobals: {
    viewport: {
      value: 'desktop',
      isRotated: false
    }
  }
};

export default preview;
