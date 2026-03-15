import type { Preview } from '@storybook/react';

// Import design tokens from jimo-component-library
// This makes all CSS custom properties available to every story
import '../../jimo-component-library/src/styles/tokens.css';
import '../../jimo-component-library/src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      defaultViewport: 'desktop',
      viewports: {
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
      },
    },
    layout: 'centered',
  },
};

export default preview;
