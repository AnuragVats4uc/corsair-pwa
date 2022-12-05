import s from './BuiltInMount.module.scss'
import cn from 'classnames'

export const twc = {
    textContainer: cn(
        s['text-container'],
        'text-container',
        'p-0 relative overflow-hidden flex flex-col flex-wrap justify-start items-center z-0'
    ),
    innerTextContainer: cn(
        s['inner-text-container'],
        'inner-text-container',
        'flex z-20 relative'
    ),
    headerBox: cn(s['header-box'], 'header-box', 'w-full mx-auto'),
    heading: cn(
        s['heading'],
        'w-full text-center text-white uppercase font-semibold font-bebasNeueExtraBold'
    ),
    subHeading: cn(s['subHeading'], 'font-aktivGrotesk text-white font-medium'),
    body: cn(
        s['body'],
        'w-full text-center text-white capitalize font-normal font-aktivGrotesk'
    ),
    disclaimer: cn(
        s['disclaimer'],
        'w-full text-white text-center capitalize font-aktivGrotesk font-light'
    ),
    ctaButton: cn(
        s['cta-button'],
        'font-aktivGrotesk font-medium md:font-semibold text-center text-black flex items-center justify-center '
    ),
    leftArrow: cn(s['left-arrow'], 'cursor-pointer'),
    rightArrow: cn(s['right-arrow'], 'cusor-pointer'),
    next: cn(
        s['next'],
        'absolute h-full right-0 top-1/2 items-center justify-center '
    ),
    prev: cn(
        s['prev'],
        'absolute h-full left-0 top-1/2 items-center justify-center z-20'
    )
}
