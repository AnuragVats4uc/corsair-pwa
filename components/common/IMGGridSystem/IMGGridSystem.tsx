import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { IMGGridSystemProps, IMGGridSystemResponse } from './types'

const ImageGridSlider = dynamic(() => import('./BuiltInMultiMount'))
const ImageGrid = dynamic(() => import('./ImageGrid'))

const IMGGridSystemTypes: Record<
    string,
    ComponentType<IMGGridSystemResponse>
> = {
    'Grid System': ImageGrid,
    'Grid SystemSlider': ImageGridSlider
}

const IMGGridSystem: React.FC<IMGGridSystemResponse> = ({ content }) => {
    const Component = IMGGridSystemTypes[`${content?.gridType}`]

    return <Component content={content as IMGGridSystemProps} />
}

export default IMGGridSystem
