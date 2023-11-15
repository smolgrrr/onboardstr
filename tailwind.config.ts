import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-xy': 'gradient-xy 10s ease infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '100% 100%',
            'background-position': '0% 50%',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
