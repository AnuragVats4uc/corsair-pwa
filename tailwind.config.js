/* eslint-disable @typescript-eslint/no-var-requires */
// TODO: remove other colors to force developers to use only 4x4 color palette !!!!
module.exports = {
    future: {
        purgeLayersByDefault: true,
        applyComplexClasses: true
    },
    experimental: {
        // to make space-x-6 and other complicated classes
        // available when using with @apply
        applyComplexClasses: true
    },
    purge: {
        layers: ['base', 'utilities'],
        content: [
            './pages/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}',
            './node_modules/@corratech/**/*.{js,ts,jsx,tsx}'
        ],
        options: {
            whitelist: ['zoom-open'],
            safelist: {
                standard: ['outline-none']
            }
        },
        safelist: ['w-2/3', 'w-1/3']
    },
    theme: {
        // Font family defined straight here would override fonts defined
        // in default config.
        // fontFamily: {}
        letterletterSpacing: {
            widest: '.15em'
        },
        extend: {
            screens: {
                '2xs': { max: '370px' },
                '2xl': { min: '1536px' },
                'md-max': { max: '767px' },
                'sm-min': { min: '640px' },
                'xl-1280': { min: '1280px' },
                'xl-1440': { min: '1440px' },
                '9xl': '2000px',
                'xl-1050': { max: '1050px' },
                'xl-1610': { min: '1610px' },
                '4k': { min: '2560px' }
            },
            fontFamily: {
                aktivGroteskBold: ['Aktiv Grotesk Bold', 'sans-serif'],
                bebasNeue: ['Bebas Neue Pro SmE Rg', 'sans-serif'],
                bebasNeueBold: ['Bebas Neue Pro Expanded Bold', 'sans-serif'],
                bebasNeueExtraBold: [
                    'Bebas Neue Pro SmE Extra Bold',
                    'sans-serif'
                ],
                bebasNeueProMiddle: ['Bebas Neue Pro Middle', 'sans-serif'],
                bebasNeueSemiExpanded: [
                    'Bebas Neue Pro Expanded Bold',
                    'sans-serif'
                ],
                verveineRegular: ['Verveine-Regular', 'sans-serif'],
                aktivGrotesk: ['aktiv-grotesk', 'sans-serif'],
                // Defining fonts under extend makes sure that default fonts are kept untouched
                primary: ['aktiv-grotesk', 'sans-serif'],
                secondary: ['Bebas Neue Pro SmE Rg', 'serif'],
                tertiary: ['Bebas Neue Pro SmE Extra Bold', 'sans-serif'],
                quaternary: ['Bebas Neue Pro Middle', 'sans-serif'],
                quinary: ['bebasNeueProMiddle', 'sans-serif']
            },
            maxWidth: {
                xxl: '1360px',
                '8xl': '1920px',
                '7x1': '1700px'
            },
            fontSize: {
                '3.2xl': '3.2rem',
                '3.5xl': '3.5rem',
                '7.5xl': '7rem',
                '7xl': '4.5rem',
                '8xl': '6rem',
                '9xl': '8rem',
                '4xl': '2.5rem',
                '3xl': '2rem',
                '1.5xl': '1.5rem',
                '1.1xl': '1.2rem'
            },
            colors: {
                // TODO: remove colors when all next-commerce components are removed
                primary: 'var(--primary)',
                'primary-2': 'var(--primary-2)',
                secondary: 'var(--secondary)',
                'secondary-2': 'var(--secondary-2)',
                hover: 'var(--hover)',
                'hover-1': 'var(--hover-1)',
                'hover-2': 'var(--hover-2)',
                'accents-0': 'var(--accents-0)',
                'accents-1': 'var(--accents-1)',
                'accents-2': 'var(--accents-2)',
                'accents-3': 'var(--accents-3)',
                'accents-4': 'var(--accents-4)',
                'accents-5': 'var(--accents-5)',
                'accents-6': 'var(--accents-6)',
                'accents-7': 'var(--accents-7)',
                'accents-8': 'var(--accents-8)',
                'accents-9': 'var(--accents-9)',
                violet: 'var(--violet)',
                yellow: '#ECE81A',
                'violet-light': 'var(--violet-light)',
                pink: 'var(--pink)',
                cyan: 'var(--cyan)',
                darkbtnpri: 'var(--dark-bg-btn-primary)',
                blackLight: 'var(--black-light)',
                blue: {
                    default: 'var(--blue)'
                },
                green: 'var(--green)',
                red: 'var(--red)',
                bordercolor: 'var(--bordercolor)',
                placeholderc: 'var(--placeholderc)',
                wrappercolor: 'var(--wrappercolor)',
                btnyellow: 'var(--dark-bg-btn-primary)',
                learnmore: 'var(--learn-more)',
                lightgrey: 'var(--light-grey)',

                // ========= REMOVE TILL HERE =========
                grey: '#f2f2f2',
                p: {
                    1: 'var(--p1)',
                    2: 'var(--p2)',
                    3: 'var(--p3)',
                    4: 'var(--p4)'
                },
                s: {
                    1: 'var(--s1)',
                    2: 'var(--s2)',
                    3: 'var(--s3)',
                    4: 'var(--s4)'
                },
                t: {
                    1: 'var(--t1)',
                    2: 'var(--t2)',
                    3: 'var(--t3)',
                    4: 'var(--t4)'
                },
                q: {
                    1: 'var(--q1)',
                    2: 'var(--q2)',
                    3: 'var(--q3)',
                    4: 'var(--q4)'
                },
                cms: {
                    1: 'var(--cms1)',
                    2: 'var(--cms2)'
                },
                alert: {
                    success: 'var(--alert-success)',
                    danger: 'var(--alert-danger)',
                    warning: 'var(--alert-warning)'
                }
            },
            textColor: {
                basecolor: 'var(--text-base)',
                primary: 'var(--text-primary)',
                secondary: 'var(--text-secondary)'
            },
            boxShadow: {
                'outline-2': '0 0 0 2px var(--accents-2)',
                filters: '1px 1px 7px #cccccc'
            },
            lineHeight: {
                'extra-loose': '2.2'
            },
            height: {
                100: 'var(--h-100)',
                104: 'var(--h-104)',
                108: 'var(--h-108)',
                112: 'var(--h-112)',
                116: 'var(--h-116)',
                120: 'var(--h-120)',
                'screen/2': 'var(--h-screen-2)',
                'screen/3': 'var(--h-screen-3)',
                'screen-1.5': 'var(--h-screen-4)',
                'screen-2': 'var(--h-screen-5)'
            },
            width: {
                fit: 'fit-content'
            },
            scale: {
                120: '1.2'
            },
            spacing: {
                'full+': '110%'
            },
            // While it is mentioned in tailwind docs that our version supports negative insets,
            // for some reason negative inset utils are not getting generated.
            // Therefore we add them manually.
            inset: (theme, { negative }) => ({
                ...negative(theme('spacing'))
            }),
            zIndex: {
                // this will be converted to .-z-1
                '-1': '-1',
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5'
            },
            rotate: {
                '-135': '-135deg',
                '-270': '-270deg',
                135: '135deg',
                270: '270deg'
            },
            keyframes: {
                'fade-in-down': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'fade-in-left': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(-10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)'
                    }
                },
                'fade-in-right': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)'
                    }
                }
            },
            animation: {
                'fade-in-down': 'fade-in-down 0.2s ease-out',
                'fade-in-up': 'fade-in-up 0.2s ease-out',
                'fade-in-left': 'fade-in-left 0.2s ease-out',
                'fade-in-right': 'fade-in-right 0.2s ease-out',
                'fade-in-scroll': 'fade-in-up 0.5s ease-out forwards'
            }
        }
    },
    plugins: [require('@tailwindcss/ui')]
}
