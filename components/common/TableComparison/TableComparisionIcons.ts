import s from './TableComparison.module.scss'
import cn from 'classnames'

interface IconSizes {
    width: number
    height: number
}

export const checkRoundedIcon = ({
    height = 14,
    width = 20
}: IconSizes): string =>
    `<span class='${cn(
        s['comparision-check-rounded'],
        'm-auto items-center justify-center flex'
    )}'><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 20 14" fill="#000"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4762 1.73719L18.0927 0.292969L7.42713 10.509L1.7072 4.78853L0.292969 6.20276L7.39796 13.3077L19.4762 1.73719ZM1.70718 5.49565L7.41958 11.2086L18.0775 0.999892L18.7693 1.72201L18.7692 1.72206L18.0775 1L7.41959 11.2087L1.70718 5.49576L1.00013 6.20281L1.00008 6.20276L1.70718 5.49565Z" fill="currentColor"/></svg></span>`

export const checkIconComparision = ({
    height = 24,
    width = 24
}: IconSizes): string => `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="${width}px"
        height="${height}px"
        viewBox="0 0 20 20"
        version="1.1"
        class="${s['comparision-check-icon']}">
        <g
            id="Mobile"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g
                id="Mobile---Table---style-2"
                transform="translate(-265.000000, -162.000000)"
            >
                <g
                    id="icon-checkmark"
                    transform="translate(265.000000, 162.000000)"
                >
                    <polygon
                        id="check"
                        fill="#ECE81A"
                        points="16.821875 3.33333333 8.24270833 11.954375 4.01125 7.70625 1.66666667 10.0625 8.24270833 16.6666667 19.1666667 5.689375"
                    />
                </g>
                </g>
            </g>
    </svg>
`

export const closeIconRounded = ({
    height = 16,
    width = 16
}: IconSizes): string =>
    `<span class='${cn(
        s['comparision-close-icon-rounded'],
        'm-auto items-center justify-center flex'
    )}'><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 9 9" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.636679 7.65621L7.65621 0.636681L8.36332 1.34379L1.34379 8.36332L0.636679 7.65621Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.65621 8.36357L0.636681 1.34403L1.34379 0.636925L8.36332 7.65646L7.65621 8.36357Z" fill="white"/></svg></span>`

export const rightTick = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    <title>check_white_24dp copy 9</title>
    <g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="08-Compatibility" transform="translate(-1186.000000, -265.000000)">
            <g id="Table-1" transform="translate(120.000000, 203.000000)">
                <g id="Row-2" transform="translate(309.000000, 50.000000)">
                    <g id="check_white_24dp-copy-9" transform="translate(757.000000, 12.000000)">
                        <polygon id="Path" fill="#CAE4CF" fill-rule="nonzero" points="9 16.17 4.83 12 3.41 13.41 9 19 21 7 19.59 5.59"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>`

export const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    <title>close_white_24dp</title>
    <g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="08-Compatibility" transform="translate(-1267.000000, -265.000000)">
            <g id="Table-1" transform="translate(120.000000, 203.000000)">
                <g id="Row-2" transform="translate(309.000000, 50.000000)">
                    <g id="close_white_24dp" transform="translate(838.000000, 12.000000)">
                        <polygon id="Path" fill="#F8E2E2" fill-rule="nonzero" points="19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>`

export const notApplicable = (): string =>
    `<td class="${s['not-applicable']}"><span>N/A</span></td>`

export const tableIcons = {
    check: checkIconComparision({ height: 24, width: 24 }),
    checkRounded: checkRoundedIcon({ height: 14, width: 20 }),
    closeIconRounded: closeIconRounded({ height: 16, width: 16 }),
    rightTick: rightTick,
    closeIcon: closeIcon,
    notApplicable: notApplicable()
}
