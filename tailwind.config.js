/** @type {import('tailwindcss').Config} */
export default {
  // Define which files Tailwind should scan for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS, TS, and JSX files in src directory
  ],
  theme: {
    extend: {
      // Custom animation keyframes definitions
      keyframes: {
        // Animation for notification popups - fades in, stays, then fades out
        'fadeInOut': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)' // Start slightly below
          },
          '15%, 85%': {
            opacity: '1',
            transform: 'translateY(0)' // Stay visible in the middle
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)' // Fade out upwards
          }
        },
        // Simple fade in from bottom animation for elements
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)' // Start below viewport
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)' // End at natural position
          }
        },
        // Continuous floating animation for hover effects
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)' // Start and end at original position
          },
          '50%': {
            transform: 'translateY(-5px)' // Float up slightly
          }
        },
        // Subtle pulsing animation for icons
        'pulse-soft': {
          '0%, 100%': {
            opacity: 1 // Full opacity
          },
          '50%': {
            opacity: 0.8 // Slightly fade out
          }
        }
      },
      // Animation utilities that can be used with classes
      animation: {
        // Quick fade in for page elements
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        // Continuous floating effect for interactive elements
        'float': 'float 3s ease-in-out infinite',
        // Subtle pulse for attention-drawing elements
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
