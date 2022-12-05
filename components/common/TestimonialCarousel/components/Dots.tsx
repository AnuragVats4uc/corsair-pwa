import s from '../TestimonialCarousel.module.scss'

const SCREEN_WIDTH = 100

export const Dots = (
    dots: JSX.Element[],
    dotsLabels: string[]
): JSX.Element => {
    const barWidth = SCREEN_WIDTH / (dots?.length || 1)

    return (
        <div id="custom-slick-dots">
            <ul className={s['slick-dots']}>
                {dots &&
                    dots.map((Element, index) => {
                        return (
                            <Element.type
                                {...Element.props}
                                style={{
                                    width: `${barWidth}%`
                                }}
                                key={index}
                            >
                                <span>
                                    {dotsLabels[index]}
                                    {Element.props.children}
                                </span>
                            </Element.type>
                        )
                    })}
            </ul>
        </div>
    )
}
