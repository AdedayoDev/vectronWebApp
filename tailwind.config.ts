/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      //custom background gradient
      backgroundImage: {
        "slate-white-gradient": "linear-gradient(to bottom, #708090, #FFFFFF)",
      },
	  // custom width
	  width: {
        '78': '78%', 
        '74': '74%', 
        '919': '919px',
        '87': '87%',
        '90': '90%',
        '93': '93%',
        '95': '95%',
        '96': '96%',
        '79': '79%',

      // custom width
      width: {
        "78": "78%",
        "74": "74%",
        "919": "919px",
        "87": "87%",
        "90": "90%",
        "93": "93%",
      },
      // height: {
      //   '919': '600px',
      // },
      //custom box shadow and blur
      boxShadow: {
        custom: "0px 1px 6px 0px rgba(0, 0, 0, 0.25)",
      },
      backdropBlur: {
        40: "40px",
      },
      screens: {
        xs: "280px",
        sm: "320px",
        md: "540px",
        lg: "720px",
        xl: "1080px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        allura: ["Allura", "cursive"],
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
    },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide"),],
}}

// import type { Config } from 'tailwindcss'

// const config = {
//   darkMode: ['class'],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
//   ],
//   prefix: '',
//   theme: {
//   	container: {
//   		center: true,
//   		padding: '2rem',
//   		screens: {
//   			'2xl': '1400px'
//   		}
//   	},
//   	extend: {
//   		screens: {
//   			xs: {
//   				max: '550px'
//   			},
//   			xxs: {
//   				max: '420px'
//   			}
//   		},
//   		fontFamily: {
//   			quicksand: [`var(--font-quicksand)`, "manrope"],
//   			inter: [`var(--font-inter)`, "manrope"]
//   		},
//   		colors: {
//   			'brand-primary': '#211F34',
//   			'brand-secondary': '#008A90',
//   			'brand-cyan': '#0ec29f',
//   			'brand-blue': '#318fd8',
//   			'brand-yellow': '#e3ab22',
//   			'brand-red': '#f62f17',
//   			'brand-gray-light': '#878082',
//   			'brand-gray-dark': '#232525',
//   			'brand-black': '#080808',
//   			'brand-black-bg': '#0C0300',
//   			'brand-grey-2': '#4F4F4F',
//   			'brand-grey-3': '#393938',
//   			'brand-grey-4': '#9E9D9D',
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		},
//   		keyframes: {
//   			wave: {
//   				'0%, 100%': {
//   					transform: 'rotate(0deg)'
//   				},
//   				'15%': {
//   					transform: 'rotate(20deg)'
//   				},
//   				'30%': {
//   					transform: 'rotate(-24deg)'
//   				},
//   				'40%': {
//   					transform: 'rotate(20deg)'
//   				},
//   				'50%': {
//   					transform: 'rotate(-20deg)'
//   				},
//   				'60%': {
//   					transform: 'rotate(20deg)'
//   				}
//   			},
//   			'accordion-down': {
//   				from: {
//   					height: '0'
//   				},
//   				to: {
//   					height: 'var(--radix-accordion-content-height)'
//   				}
//   			},
//   			'accordion-up': {
//   				from: {
//   					height: 'var(--radix-accordion-content-height)'
//   				},
//   				to: {
//   					height: '0'
//   				}
//   			},
//   			pulsing: {
//   				'50%': {
//   					opacity: '0.2'
//   				}
//   			},
//   			loadspin: {
//   				'100%': {
//   					transform: 'rotate(360deg)'
//   				}
//   			},
//   			shimmer: {
//   				'100%': {
//   					transform: 'translateX(100%)'
//   				}
//   			},
//   			slideUp: {
//   				'70%': {
//   					opacity: '0.7',
//   					transform: 'translateY(50px)'
//   				},
//   				'100%': {
//   					transform: 'translateY(0)',
//   					opacity: '1'
//   				}
//   			},
//   			slideDown: {
//   				'100%': {
//   					transform: 'translateY(0)',
//   					opacity: '1'
//   				}
//   			},
//   			slideNavUp: {
//   				'100%': {
//   					transform: 'translateY(-112px)',
//   					opacity: '0'
//   				}
//   			},
//   			fadeOut: {
//   				'50%': {
//   					opacity: '0.7'
//   				},
//   				'100%': {
//   					opacity: '1'
//   				}
//   			},
//   			rotate3d: {
//   				'0%': {
//   					transform: 'rotateY(0)'
//   				},
//   				'50%': {
//   					opacity: '0.5'
//   				},
//   				'100%': {
//   					transform: 'rotateY(360deg)'
//   				}
//   			}
//   		},
//   		animation: {
//   			'accordion-down': 'accordion-down 0.2s ease-out',
//   			'accordion-up': 'accordion-up 0.2s ease-out',
//   			shimmer: 'shimmer 1.5s infinite',
//   			slideUp: 'slideUp 1s 0.2s ease forwards',
//   			loadspin: 'loadspin 1.2s linear infinite',
//   			pulsing: 'pulsing 1.5s ease infinite',
//   			rotate3d: 'rotate3d 2s 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite',
//   			slideDown: 'slideDown 1s 0.2s ease forwards',
//   			slideNavUp: 'slideDown 1s 0.2s ease forwards',
//   			wave: 'wave 2s infinite'
//   		},
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		}
//   	}
//   },
//   plugins: [require('tailwindcss-animate')],
// } satisfies Config

// export default config
