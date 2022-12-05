import { VFC } from 'react'
import BlockCentered from './BlockCentered'
import BlockFullScreen, { EOverlayLayout } from './BlockFullScreen'
import type { IOverlayProductBlock } from './BlockFullScreen'

const OverlayProductBlock: VFC<IOverlayProductBlock> = ({ content }) => {
    const { layout = EOverlayLayout.FULL_SCREEN } = content

    return {
        [EOverlayLayout.FULL_SCREEN]: <BlockFullScreen content={content} />,
        [EOverlayLayout.CENTERED]: <BlockCentered content={content} />
    }[layout]
}

export default OverlayProductBlock
