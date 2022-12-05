import React from 'react'
import dynamic from 'next/dynamic'
import { StandardBannerResponse } from '@components/common/StandardBanner/StandardBanner'
import { UniteYourSetup } from '../UniteYourSetupBlock/types'

const BlockImage = dynamic(() => import('@components/common/BlockImage/Block'))
const UniteYourSetupBlock = dynamic(
    () => import('@components/common/UniteYourSetupBlock/UniteYourSetupBlock')
)
const StandardBanner = dynamic(
    () => import('@components/common/StandardBanner/StandardBanner')
)

export interface verticalPaddings {
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
}

export type Banners = {
    content: StandardBannerResponse
}
const Banners = ({ content }: Banners) => {
    const banners = () => {
        switch (content?.type) {
            case '2 Lines Heading Banner': {
                return <BlockImage content={content} />
            }
            case 'Logo CTA': {
                return (
                    <UniteYourSetupBlock content={content as UniteYourSetup} />
                )
            }
            case 'Standard Banner': {
                return <StandardBanner content={content} />
            }
            default:
                return null
        }
    }
    return <>{banners()}</>
}
export default Banners
