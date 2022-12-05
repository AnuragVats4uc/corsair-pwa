const Play = ({ ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 157 157"
            version="1.1"
        >
            <defs>
                <filter
                    x="-95.4%"
                    y="-95.4%"
                    width="290.8%"
                    height="290.8%"
                    filterUnits="objectBoundingBox"
                    id="filter-1"
                >
                    <feOffset
                        dx="0"
                        dy="0"
                        in="SourceAlpha"
                        result="shadowOffsetOuter1"
                    />
                    <feGaussianBlur
                        stdDeviation="16"
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                    />
                    <feColorMatrix
                        values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.7 0"
                        type="matrix"
                        in="shadowBlurOuter1"
                        result="shadowMatrixOuter1"
                    />
                    <feMerge>
                        <feMergeNode in="shadowMatrixOuter1" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g
                id="Symbols"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="video-gallery-type-2-mobile"
                    transform="translate(-89.000000, -16.000000)"
                >
                    <g
                        id="icon-play-video"
                        filter="url(#filter-1)"
                        transform="translate(135.000000, 62.000000)"
                    >
                        <circle
                            id="Oval"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            cx="32.5"
                            cy="32.5"
                            r="31.5"
                        />
                        <polygon
                            id="Triangle"
                            fill="#FFFFFF"
                            points="44.2361111 32.5 26.1805556 44.6875 26.1805556 20.3125"
                        />
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default Play
