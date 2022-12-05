import React from 'react'

const Dashboard = () => {
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
                <g stroke="currentColor" transform="translate(-103 -136)">
                    <g transform="translate(-1)">
                        <g transform="translate(83 107)">
                            <g transform="translate(22 30)">
                                <g strokeWidth="2">
                                    <circle cx="10" cy="10" r="10" />
                                    <path d="M14.24 5.76L12.12 12.12 5.76 14.24 7.88 7.88z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default React.memo(Dashboard)
