import cn from 'classnames'
import s from './BlockTwoTile.module.scss'
import { BlockWithIcons } from './BlockWithIcons'
import { BlockTwoTileLogo } from './BlockTwoTileLogo'
import { BlockTwoTileCta } from './BlockTwoTileCta'
import { BlockTwoTileCharts } from './BlockTwoTileCharts'
import { BlockTwoTileTables } from './BlockTwoTileTables'
import { BlockTwoTileResponse } from './BlockTwoTileTypes'

type Props = {
    content: BlockTwoTileResponse
}

const twClasses = /*tw*/ {
    infoHeading:
        'mt-6 mb-4 leading-none font-secondary text-center lg:text-left font-bold',
    infoDescription:
        'mt-6 mb-4 md:mb-11 leading-6 md:leading-9 text-center lg:text-left text-2xl font-primary font-light',
    subHeading: `
      ${s['info-subHeading']}
        font-aktivGrotesk font-semibold uppercase
    `,
    copyBlock: `
      ${s['info-copy-block']}
        font-aktivGrotesk font-normal  mb-11 text-center lg:text-left
    `,
    calloutsText: `
      ${s['info-callouts']}
        font-bebasNeueSemiExpanded font-semibold  my-5 uppercase text-center lg:text-left
    `,
    disclaimerBlock: `
        ${s['info-disclaimer']}
        font-aktivGrotesk font-light  my-2 text-center lg:text-left order-last capitalize
`
}
export const leftImage = 'ImageLeft'

export const BlockTwoTileContent = ({ content }: Props) => {
    const { layoutPosition, layoutType } = content
    const icons = content?.iconAndText
    const fontColor = {
        color: content.fontColor
    }

    return (
        <div
            className={cn(
                s[`Block-Content-${content.verticalAlignmentText}`],
                'text-2xl',
                !content.frame && 'mt-12 md:w-6/12 lg:mt-0'
            )}
        >
            <div
                className={cn(
                    s['inner-wrapper'],
                    s[`${layoutType}_wrapperMaxWidth`],
                    'px-4 md:px-5 text-2xl',
                    layoutPosition === leftImage ? '' : 'ml-auto'
                )}
            >
                {content.subHeading && (
                    <p
                        className={twClasses.subHeading}
                        dangerouslySetInnerHTML={{
                            __html: content.subHeading
                        }}
                    />
                )}
                {content?.heading && (
                    <h2
                        className={cn(s['info-heading'], twClasses.infoHeading)}
                        dangerouslySetInnerHTML={{
                            __html: content.heading
                        }}
                        style={fontColor}
                    />
                )}
                {content.description && (
                    <div
                        className={cn(
                            s['info-description'],
                            twClasses.infoDescription
                        )}
                        dangerouslySetInnerHTML={{
                            __html: content.description
                        }}
                        style={fontColor}
                    />
                )}
                {content.copyBlock && (
                    <p
                        className={twClasses.copyBlock}
                        dangerouslySetInnerHTML={{
                            __html: content.copyBlock.text
                        }}
                        style={fontColor}
                    />
                )}
                {content.cta?.map((d) => (
                    <BlockTwoTileCta
                        ctaProps={d}
                        key={d.title}
                        fontColor={content.fontColor}
                    />
                ))}
                {content.callouts && (
                    <div className="mb-11">
                        {content.callouts.map((d) => (
                            <p
                                key={d.title}
                                className={twClasses.calloutsText}
                                dangerouslySetInnerHTML={{
                                    __html: d.content
                                }}
                                style={fontColor}
                            />
                        ))}
                    </div>
                )}
                {content?.sectionTitle && (
                    <h3
                        className={cn(
                            s['info-section-title'],
                            ' mb-8 text-center md:text-left md:self-start md:font-bold lg:text-left'
                        )}
                        dangerouslySetInnerHTML={{
                            __html: content.sectionTitle
                        }}
                        style={fontColor}
                    />
                )}
                {icons && (
                    <BlockWithIcons
                        icons={icons}
                        fontColor={content.fontColor}
                    />
                )}
                {content?.tables?.length > 0 && (
                    <BlockTwoTileTables content={content.tables} />
                )}
                {content?.charts?.length > 0 && (
                    <BlockTwoTileCharts content={content.charts} />
                )}
                {content.logo && (
                    <BlockTwoTileLogo
                        logo={content.logo}
                        logoPosition={content.logoPosition}
                        logoWidth={content?.logoWidth}
                        logoHeight={content?.logoHeight}
                    />
                )}

                {content?.disclaimerBlock && (
                    <div className="my-5 lg:my-11 ">
                        {content?.disclaimerBlock && (
                            <div
                                className={twClasses.disclaimerBlock}
                                dangerouslySetInnerHTML={{
                                    __html: content.disclaimerBlock
                                }}
                                style={fontColor}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
