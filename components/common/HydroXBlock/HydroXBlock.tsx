import { FC } from 'react'
import cn from 'classnames'
import HydroXBlockItem, { HydroXCards } from './HydroXBlockItem'
import s from './HydroXBlock.module.scss'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'
import Link from 'next/link'

export interface HydroXBlockButton {
    text: string
    url: string
    target: string
}

export interface HydroXBlockResponse {
    heading: string
    subTitle: string
    backgroundImage?: ImageType | null
    card: HydroXCards[]
    shopButton: HydroXBlockButton
    startKit: HydroXBlockButton
    designLoop: HydroXBlockButton
}

interface HydroXBlockProps {
    content: HydroXBlockResponse
}

const twClasses = /*tw*/ {
    mainHeading: 'flex justify-center text-5xl font-secondary',
    subTitle: 'flex justify-center font-bold mt-6 text-center font-primary',
    containerClasses: 'flex justify-center flex-col md:flex-row mt-16',
    cardsColOne:
        'Cta-Cards flex flex-col justify-between pl-0 mt-8 md:mt-0 md:pl-8',
    startKit:
        'flex justify-center items-center font-bold bg-black cursor-pointer',
    designLoop:
        'flex justify-center items-center font-bold text-lg mt-8 md:mt-0 cursor-pointer relative',
    shopButton:
        'text-center flex justify-center items-center hover:text-lime-900/[.06] cursor-pointer',
    ctaBttonDiv:
        'text-black justify-center items-center font-bold text-center bg-yellow-300 font-secondary',
    ctaButtonText: 'font-bebasNeue inline-flex justify-center items-center'
}

export const HydroXBlock: FC<HydroXBlockProps> = ({ content }) => {
    if (!content) {
        return null
    }
    const { heading, subTitle, card, backgroundImage } = content
    const bgImageUrl = backgroundImage?.file?.url
    const bgImageTitle = backgroundImage?.description
    const shopButton = content?.shopButton
    const designLoop = content?.designLoop
    const startKit = content?.startKit
    const cardCount: number = Math.ceil(card.length / 2)

    return (
        <div
            className={cn(
                s['Hydro-X-Block-Container'],
                'flex flex-col box-border relative'
            )}
        >
            {bgImageUrl && (
                <div
                    className={cn(
                        s['Hydro-X-Bg-Image'],
                        'w-full absolute h-full left-0'
                    )}
                >
                    <Image alt={bgImageTitle} src={bgImageUrl} layout="fill" />
                </div>
            )}
            <div className={cn(s['Hydro-X-Block'], 'gap-6 py-5')}>
                <h3 className={cn(s['Hydro-X-Heading'], twClasses.mainHeading)}>
                    {heading}
                </h3>
                {subTitle && (
                    <div
                        className={cn(
                            s['Hydro-X-Subtitle'],
                            twClasses.subTitle
                        )}
                    >
                        {subTitle}
                    </div>
                )}
                <div
                    className={cn(
                        s['Grid-container'],
                        twClasses.containerClasses
                    )}
                >
                    <div
                        className={cn(
                            s['Hydro-X-Col-1'],
                            `grid grid-cols-2 md:grid-cols-${cardCount}`
                        )}
                    >
                        {cardCount > 1 &&
                            card.map(({ title, url, image, newTab }) => (
                                <HydroXBlockItem
                                    Key={title}
                                    title={title}
                                    url={url}
                                    image={image}
                                    newTab={newTab}
                                />
                            ))}
                    </div>
                    <div
                        className={cn(
                            s['Hydro-X-Col-2'],
                            twClasses.cardsColOne
                        )}
                    >
                        {startKit && (
                            <div
                                className={cn(
                                    s['StartKit'],
                                    twClasses.startKit
                                )}
                            >
                                <Link href={startKit?.url}>
                                    <a
                                        target={
                                            startKit?.target === 'Self'
                                                ? '_self'
                                                : '_blank'
                                        }
                                    >
                                        <span
                                            className={cn(
                                                s['hydroXblock-fonts'],
                                                'text-white font-secondary'
                                            )}
                                        >
                                            {startKit?.text}
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        )}
                        {designLoop && (
                            <div
                                className={cn(
                                    s['designLoop'],
                                    twClasses.designLoop
                                )}
                            >
                                <Link href={designLoop?.url}>
                                    <a
                                        target={
                                            designLoop?.target === 'Self'
                                                ? '_self'
                                                : '_blank'
                                        }
                                    >
                                        <span
                                            className={cn(
                                                s['Cta-Design'],
                                                'block text-white font-secondary text-center p-5'
                                            )}
                                        >
                                            {designLoop?.text}
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {shopButton && (
                    <div
                        className={cn(
                            s['Cta-shopButton'],
                            twClasses.shopButton,
                            'mt-11'
                        )}
                    >
                        <Link href={shopButton?.url}>
                            <a
                                target={
                                    shopButton?.target === 'Self'
                                        ? '_self'
                                        : '_blank'
                                }
                            >
                                <div
                                    className={cn(
                                        s['Cta-ButtonDiv'],
                                        twClasses.ctaBttonDiv,
                                        'inline-flex'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            s['CtaButtonText'],
                                            twClasses.ctaButtonText
                                        )}
                                    >
                                        {shopButton?.text}
                                    </span>
                                </div>
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HydroXBlock
