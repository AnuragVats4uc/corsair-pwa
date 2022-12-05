import React from 'react'

const Gift = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
        >
            <g
                fill="none"
                fillRule="evenodd"
                stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
            >
                <g stroke="currentColor" transform="translate(-103 -653)">
                    <g transform="translate(-1)">
                        <g transform="translate(83 107)">
                            <g transform="translate(22 547)">
                                <g strokeWidth="2">
                                    <path d="M18 10L18 20 2 20 2 10" />
                                    <path d="M0 5H20V10H0z" />
                                    <path d="M10 20L10 5" />
                                    <path d="M10 5H5.5a2.5 2.5 0 010-5C9 0 10 5 10 5z" />
                                    <path d="M10 5h4.5a2.5 2.5 0 100-5C11 0 10 5 10 5z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default React.memo(Gift)
