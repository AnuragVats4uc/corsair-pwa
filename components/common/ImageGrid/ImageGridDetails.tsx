import { GridImage } from './ImageGrid'
import ChevronRightBanner from '@components/icons/ChevronRightBanner'
import GridIcon from './GridIcon'
import Link from '@corratech/pylot-ui/src/Link'
import s from './image.module.scss'
import cn from 'classnames'

type ImageGridDetailsProps = {
    content: GridImage
}

const c = /*tw*/ {
    cta: `flex font-aktivGrotesk text-learnmore cursor-pointer ${s['learn-more']}`,
    cardContainer: 'w-full h-full px-4 ',
    caption: `font-bebasNeueExtraBold font-semibold text-white uppercase ${s['caption']}`,
    captionPostion: `w-full md:w-1/2 lg:w-full absolute ${s['caption-position']}`
}

const ImageGridDetails = ({ content }: ImageGridDetailsProps) => {
    const ctaPosition = content?.ctaButtonPosition
        ?.toLocaleLowerCase()
        .replace(' ', '-')
    const logoPosition = content?.logoPosition?.toLowerCase().replace(' ', '-')
    const showLogo =
        (content?.ctaButton && ctaPosition !== logoPosition) ||
        !content?.ctaButton
    const isCaptionTop =
        (!content?.desktopMedia?.file?.contentType?.startsWith('video') &&
            content.ctaButton &&
            ctaPosition === 'lower-left' &&
            s['caption-position-cta']) ||
        (!content?.desktopMedia?.file?.contentType?.startsWith('video') &&
            content.logo &&
            logoPosition === 'lower-left' &&
            s['caption-position-logo'])

    return (
        <div className={c.cardContainer}>
            {content?.caption && (
                <p
                    className={cn(
                        c.caption,
                        isCaptionTop,
                        !isCaptionTop && c.captionPostion
                    )}
                    dangerouslySetInnerHTML={{ __html: content.caption }}
                />
            )}
            {!content?.desktopMedia?.file?.contentType?.startsWith('video') &&
                content?.ctaButton &&
                ctaPosition && (
                    <div className={cn(s[`cta-link-${ctaPosition}`], 'w-full')}>
                        <Link href={content?.ctaButton[0]?.url}>
                            <a
                                href={content?.ctaButton[0]?.url}
                                target={
                                    content?.ctaButton[0]?.openInANewTab
                                        ? '_blank'
                                        : '_self'
                                }
                                rel="noopener noreferrer"
                                className={cn(c.cta, s[`cta-${ctaPosition}`])}
                            >
                                {content?.ctaButton && (
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                content?.ctaButton[0]
                                                    .displayText
                                        }}
                                    />
                                )}
                                <div className={cn(s['right-arrow-wrapper'])}>
                                    <ChevronRightBanner />
                                </div>
                            </a>
                        </Link>
                    </div>
                )}
            {showLogo &&
                !content?.desktopMedia?.file?.contentType?.startsWith(
                    'video'
                ) &&
                content?.logo &&
                logoPosition && (
                    <div className={`${s[`logo-container-${logoPosition}`]}`}>
                        {content?.logo?.map((data, key) => (
                            <GridIcon
                                key={key}
                                icon={data.image.file.url}
                                alt={data.image.description}
                                url={data.url}
                                newTab={data.newTab}
                            />
                        ))}
                    </div>
                )}
        </div>
    )
}

export default ImageGridDetails
