import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [forms, daisyui],
  daisyui: {
    themes: ['light'],
  },
};

export default config;
