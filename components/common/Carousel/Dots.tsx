const SCREEN_WIDTH = 100

const Dots = (dots: JSX.Element[]): JSX.Element => {
    const barWidth = SCREEN_WIDTH / (dots?.length || 1)

    return (
        <div id="custom-slick-dots">
            <ul className="slick-dots">
                {dots &&
                    dots.map((Element, index) => {
                        return (
                            <Element.type
                                {...Element.props}
                                style={{
                                    width: `${barWidth}%`
                                }}
                                key={index}
                            />
                        )
                    })}
            </ul>
        </div>
    )
}

export default Dots
