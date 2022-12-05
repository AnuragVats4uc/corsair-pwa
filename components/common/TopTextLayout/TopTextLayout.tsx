import s from './TopTextLayout.module.scss'

export interface TopTextLayoutType {
    heading: string
    meta?: { contentType: string }
    subHeading: string
    text: string
    title?: string
    backgroundColorHex?: string
}

export interface TopTextLayoutProps {
    data: TopTextLayoutType
    fontColor?: string | undefined
}

const c = /*tw*/ {
    topTextLayout: `${s['topTextLayout']} topTextLayout text-white text-center m-auto`,
    TopTextLayoutHeading: `${s['topTextLayout-heading']} topTextLayout-heading font-semibold `,
    topTextLayoutSubHeading: `${s['topTextLayout-subHeading']} topTextLayout-subHeading font-semibold leading-4`,
    TopTextLayoutDescription: `${s['topTextLayout-description']} topTextLayout-description font-normal leading-9`
}

const TopTextLayout = ({
    data,
    fontColor = '#FFFFFF'
}: TopTextLayoutProps): JSX.Element => {
    return (
        <div
            style={{ backgroundColor: `#${data?.backgroundColorHex}` }}
            className={c.topTextLayout}
        >
            {data?.subHeading && (
                <div
                    className={c.topTextLayoutSubHeading}
                    dangerouslySetInnerHTML={{ __html: data.subHeading }}
                />
            )}
            {data?.heading && (
                <h2
                    className={c.TopTextLayoutHeading}
                    style={{ color: `${fontColor}` }}
                >
                    {data.heading}
                </h2>
            )}
            {data?.text && (
                <div
                    className={c.TopTextLayoutDescription}
                    style={{ color: `${fontColor}` }}
                    dangerouslySetInnerHTML={{ __html: data.text }}
                />
            )}
        </div>
    )
}

export default TopTextLayout
