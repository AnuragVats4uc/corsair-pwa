import s from './TextLayout.module.scss'
import cn from 'classnames'

export const twc = {
    textLayout: cn(s['textLayout'], 'text-center', 'm-auto'),
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
    )
}
