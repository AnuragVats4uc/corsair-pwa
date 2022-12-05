import { BelowTheLineCta } from './BelowTheLineCta'
import { BelowTheLineImage } from './BelowTheLineImage'
import { BelowTheLine } from './BelowTheLineTypes'
import cn from 'classnames'
import s from './BelowTheLine.module.scss'

type BelowTheLineProps = {
    content: BelowTheLine
}

const c /*tw*/ = {
    BelowTheLineSection: `
        ${s['below-the-line-section']}
        w-screen bg-repeat bg-fixed bg-top bg-cover
    `,
    BelowTheLineContainer: `${s['below-the-line-container']} w-full mx-auto`,
    BelowTheLineBox: `${s['below-the-line-box']} flex flex-col lg:flex-row`,
    BelowTheLineBody: `
        ${s['below-the-line-body']}
        font-aktivGrotesk font-normal text-center lg:text-left
    `,
    BelowTheLineBodyDark: `
        ${s['below-the-line-body']}
        font-aktivGrotesk font-normal text-center lg:text-left`
}

const BelowTheLine = ({ content }: BelowTheLineProps) => {
    if (!content) return null
    const styles = {
        backgroundColor: content?.backgroundColor,
        backgroundImage: `url(${content?.background?.file?.url})`
    }
    const bodyStyle = {
        color: content.bodyColor
    }
    const upperLineColor = {
        borderColor: content.bodyColor
    }
    return (
        <section style={styles} className={c.BelowTheLineSection}>
            <div className={c.BelowTheLineContainer}>
                <div className={c.BelowTheLineBox} style={upperLineColor}>
                    <BelowTheLineImage
                        productImage={content?.image}
                        imageWidth={content?.imageWidth}
                        imageHeight={content?.imageHeight}
                    />
                    <div
                        style={bodyStyle}
                        className={c.BelowTheLineBody}
                        dangerouslySetInnerHTML={{ __html: content?.body }}
                    />
                    <BelowTheLineCta belowCta={content?.ctaButton} />
                </div>
            </div>
        </section>
    )
}

export default BelowTheLine
