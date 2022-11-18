const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      spacing: {
        '5px': '5px',
      },
      maxWidth: {
        '256px': '256px',
      },
    },
  },
  plugins: [],
};
