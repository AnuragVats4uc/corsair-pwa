import { FC } from 'react'
import dynamic from 'next/dynamic'

const GridContentCards = dynamic(
    () => import('@components/common/GridContentCards')
)
const CopyBlocksWrapper = dynamic(
    () => import('@components/common/CopyBlocks/CopyBlocksWrapper')
)
const StandardCardsSection = dynamic(
    () => import('@components/common/StandardCardsSection/StandardCardsSection')
)
const ContentCardTiles = dynamic(
    () => import('@components/common/ContentCardTiles')
)

export interface MergeContainerStandardProps {
    content: any
}
const MergeContainerStandard: FC<MergeContainerStandardProps> = ({
    content
}) => {
    if (!content) return null

    const getComponent = () => {
        switch (content?.type) {
            case 'Standard Copy': {
                return <CopyBlocksWrapper content={content as any} />
            }
            case 'Headline Break': {
                return <GridContentCards content={content as any} />
            }
            case 'Standard': {
                return <StandardCardsSection content={content as any} />
            }
            case 'Tiles': {
                return <ContentCardTiles content={content as any} />
            }
            default: {
                return null
            }
        }
    }
    return <>{getComponent()}</>
}

export default MergeContainerStandard
