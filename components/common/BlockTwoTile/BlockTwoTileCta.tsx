import React from 'react'
import Link from '@corratech/pylot-ui/src/Link'
import { Button } from '@corratech/pylot-ui'
import cn from 'classnames'
import s from './BlockTwoTile.module.scss'
import {
    CTAType,
    ImageType
} from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'

type CTAProps = {
    ctaProps: {
        descriptionPosition: string
        ctaRichText: string
        cta: CTAType
        image?: ImageType
    }
    fontColor: string
}

const c = /*tw*/ {
    ctaTextDescription: 'flex justify-center font-aktivGrotesk font-normal',
    ctaAnchor: 'flex justify-center items-center lg:justify-start'
}

export const BlockTwoTileCta = ({ ctaProps, fontColor }: CTAProps) => {
    const styles = {
        width: 87,
        height: 45
    }
    const textColor = {
        color: fontColor
    }
    return (
        <div
            className={cn(
                s[`cta-position-${ctaProps.descriptionPosition}`],
                'mb-10'
            )}
        >
            <Link href={ctaProps.cta?.url}>
                <a
                    href={ctaProps.cta?.url}
                    target={ctaProps.cta?.openInANewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={c.ctaAnchor}
                >
                    <Button
                        className={cn(
                            s[`cta-button-${ctaProps.descriptionPosition}`],
                            'w-full'
                        )}
                        dangerouslySetInnerHTML={{
                            __html: ctaProps.cta?.displayText
                        }}
                    />
                </a>
            </Link>
            <div
                className={
                    s[`cta-position-text-${ctaProps.descriptionPosition}`]
                }
            >
                {ctaProps.image && (
                    <div
                        className={cn(
                            'relative mb-3',
                            s[
                                `description-image-${ctaProps.descriptionPosition}`
                            ]
                        )}
                        style={styles}
                    >
                        <Image
                            src={ctaProps?.image?.file?.url}
                            alt={ctaProps?.image?.description}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                )}
                <p
                    className={cn(
                        c.ctaTextDescription,
                        s[`description-${ctaProps.descriptionPosition}`]
                    )}
                    dangerouslySetInnerHTML={{ __html: ctaProps.ctaRichText }}
                    style={textColor}
                />
            </div>
        </div>
    )
}
