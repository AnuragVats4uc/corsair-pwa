import { VFC } from 'react'
import { BannerContent } from '../Downloads/Downloads'
import ChevronRightBanner from '../../icons/ChevronRightBanner'
import Image from '@corratech/corsair-image'
import classNames from 'classnames'

import s from './SideBanner.module.scss'
interface ISideBannerContent {
    content: BannerContent
}

const SideBanner: VFC<ISideBannerContent> = ({
    content: {
        ctaButton: { displayText, url },
        heading,
        shortDescription,
        logo,
        desktopImageOrVideo
    }
}) => {
    const logoUrl = logo?.file?.url || ''
    const imageUrl = desktopImageOrVideo?.file?.url || ''
    return (
        <div
            className={classNames(s['side-banner'], 'relative mb-4 md-max:p-6')}
        >
            <div className="absolute inset-x-0 top-6 md:top-1 z-1">
                {logoUrl && (
                    <div
                        className={
                            logoUrl ? 'mx-auto mt-6 text-center' : 'hidden'
                        }
                    >
                        <Image
                            width={150}
                            height={77.406}
                            src={logoUrl}
                            alt={logo?.description ?? 'background image'}
                        />
                    </div>
                )}
                {heading && (
                    <span
                        className={`text-white font-bebasNeue block text-center text-4xl uppercase font-bold line leading-none ${
                            logoUrl ? 'mt-4' : 'mt-12'
                        } px-1/12`}
                    >
                        {heading}
                    </span>
                )}
            </div>
            {imageUrl && (
                <Image
                    height={475}
                    width={300}
                    src={imageUrl}
                    alt={desktopImageOrVideo?.description ?? 'logo'}
                    className="w-full block"
                />
            )}
            <div className="absolute inset-x-0 bottom-6 md:bottom-2 text-center">
                {shortDescription && (
                    <p className="text-white font-aktivGroteskBold text-center text-lg w-5/6 mx-auto mb-4 z-1">
                        {shortDescription}
                    </p>
                )}
                {url && displayText && (
                    <a
                        href={url}
                        className="uppercase text-yellow font-bold inline-block text-center hover:underline cursor-pointer mb-8"
                    >
                        <span className="flex items-center">
                            {displayText}
                            <span className="w-4 ml-1 inline-block">
                                <ChevronRightBanner />
                            </span>
                        </span>
                    </a>
                )}
            </div>
        </div>
    )
}

export default SideBanner
