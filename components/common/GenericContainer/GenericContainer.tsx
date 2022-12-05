import { FC } from 'react'
import dynamic from 'next/dynamic'
import type { IRichCarouselType } from '@components/common/types'
import { BundleBlocksType } from '@components/common/BundleBlocks/BundleBlocks'

const BundleBlocks = dynamic(() => import('@components/common/BundleBlocks'))
const RichCarousel = dynamic(() => import('@components/common/RichCarousel'))
const FAQModuleCollection = dynamic(
    () => import('@components/common/FAQModule/FAQModuleCollection')
)

export interface GenericContainerProps {
    content: any
}
const GenericContainer: FC<GenericContainerProps> = ({ content }) => {
    if (!content) return null
    const getComponent = () => {
        switch (content?.type) {
            case 'FAQ CMS Holder': {
                return <FAQModuleCollection items={content?.items as any} />
            }
            case 'INT: Bundle Blocks': {
                return <BundleBlocks content={content as BundleBlocksType} />
            }
            case 'INT: Carousel': {
                return <RichCarousel content={content as IRichCarouselType} />
            }
            default: {
                return null
            }
        }
    }
    return <>{getComponent()}</>
}

export default GenericContainer
