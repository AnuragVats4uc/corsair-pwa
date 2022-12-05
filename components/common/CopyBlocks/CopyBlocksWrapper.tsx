import { VFC } from 'react'
import type { ICopyBlock, ICopyBlocksWrapper } from '../types'
import s from './CopyBlocks.module.scss'

interface CopyBlocksProp {
    content: ICopyBlocksWrapper
}

interface CopyBlockProp {
    copyBlock: ICopyBlock
}

const CopyBlock: VFC<CopyBlockProp> = ({ copyBlock }) => {
    const { heading, text } = copyBlock

    return (
        <div className={`${s['block']} text-white`}>
            <div className={`${s['block-heading']} font-bebasNeue`}>
                <span
                    className={`${s['block-heading-line']} relative inline-block`}
                >
                    {heading}
                </span>
            </div>
            <div className={`${s['block-text']} font-aktivGrotesk`}>
                <span>{text}</span>
            </div>
        </div>
    )
}

export const CopyBlocksWrapper: VFC<CopyBlocksProp> = ({ content }) => {
    if (!content) return null
    const { contentCards } = content
    return (
        <div className={`${s['copy-blocks-root']} md:grid md:grid-cols-3`}>
            {contentCards?.map((copyBlock: ICopyBlock, index: number) => {
                return <CopyBlock copyBlock={copyBlock} key={index} />
            })}
        </div>
    )
}

export default CopyBlocksWrapper
