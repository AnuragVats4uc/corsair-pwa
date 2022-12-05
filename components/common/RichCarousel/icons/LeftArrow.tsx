type Props = {
    onClick: () => void
    colorModeLeft: string
    className: string
    stroke: string
}

export const LeftArrowSVG = ({ onClick, className, stroke }: Props) => {
    return (
        <svg
            width="50px"
            height="50px"
            viewBox="0 0 75 75"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <defs>
                <filter
                    x="-95.8%"
                    y="-95.8%"
                    width="291.7%"
                    height="291.7%"
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
                        stdDeviation="12"
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
                id="Desktop"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="button-circle-arrow-left"
                    transform="translate(0.000000, 0.000000)"
                    stroke={stroke}
                >
                    <circle
                        id="Oval"
                        strokeWidth="1.75"
                        cx="24"
                        cy="24"
                        r="23.375"
                    />
                    <polyline
                        id="Path"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        points="26 19 21 24 26 29"
                    />
                </g>
            </g>
        </svg>
    )
}
