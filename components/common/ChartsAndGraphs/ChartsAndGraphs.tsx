import dynamic from 'next/dynamic'
import { CusChartsGraphs } from './types'

const HorizontalGraphSingleBars = dynamic(
    () => import('./HorizontalGraphSingleBars')
)
const VerticalGraphSingleBars = dynamic(
    () => import('./VerticalGraphSingleBars')
)
const VerticalGraphDoubleBars = dynamic(
    () => import('./VerticalGraphDoubleBars')
)

const ChartsAndGraphsModule = {
    ['Horizontal Single Bar' as string]: HorizontalGraphSingleBars,
    ['Vertical Single Bar' as string]: VerticalGraphSingleBars,
    ['Vertical Double Bar' as string]: VerticalGraphDoubleBars
}

interface ChartsAndGraphsProps {
    content: CusChartsGraphs
}

const ChartsAndGraphs: React.FC<ChartsAndGraphsProps> = ({ content }) => {
    const Component = ChartsAndGraphsModule[`${content?.cusType}`]
    return <Component content={content as CusChartsGraphs} />
}

export default ChartsAndGraphs
