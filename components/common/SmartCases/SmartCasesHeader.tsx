import React, { VFC } from 'react'
import cn from 'classnames'
import s from './SmartCases.module.scss'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'
interface SmartCaseHeaderProps {
    title: string
    subtitle: string
    label: string
    textPosition: 'Center' | 'Left' | 'Right'
    isFirstPage: boolean
    logo: ImageType
}

const getTextPosition = (position: 'Center' | 'Left' | 'Right') => {
    const validPosition = {
        Center: 'text-center md:text-center md:w-3/4 m-auto',
        Left: 'text-center md:text-left md:w-3/4 float-left',
        Right: 'text-center md:text-right md:w-3/4 float-right'
    }

    return validPosition[position]
}

const SmartCaseHeader: VFC<SmartCaseHeaderProps> = ({
    title,
    subtitle,
    label,
    textPosition,
    isFirstPage,
    logo
}) => {
    const position = getTextPosition(textPosition)

    return (
        <div
            className={cn(
                s['smart-cases-header-wrapper'],
                'lg:mb-20 max-w-screen-xl relative'
            )}
        >
            <div className={cn(s['smart-cases-header-container'], 'm-auto')}>
                <div className={cn('flex flex-col', position)}>
                    {logo && (
                        <span className="block mb-4">
                            <Image
                                src={logo.file.url}
                                width={logo.file.details.image.width}
                                height={logo.file.details.image.height}
                            />
                        </span>
                    )}
                    {label && (
                        <h6 className="font-aktivGrotesk text-sm z-30 mb-2 md:mb-2">
                            {label}
                        </h6>
                    )}
                    {isFirstPage ? (
                        <h1 className="font-bebasNeueExtraBold mb-10 text-white z-30">
                            {title}
                        </h1>
                    ) : (
                        <h2 className="font-bebasNeueExtraBold mb-10 text-white z-30">
                            {title}
                        </h2>
                    )}
                    <p className="font-aktivGroteskBold text-white z-30">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(SmartCaseHeader)
