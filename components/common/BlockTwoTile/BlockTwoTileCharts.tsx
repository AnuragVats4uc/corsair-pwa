import VerticalGraphSingleBars from '../Graphs/VerticalGraphSingleBars'
import HorizontalGraphSingleBars from '../Graphs/HorizontalGraphSingleBars'
import VerticalGraphDoubleBars from '../Graphs/VerticalGraphDoubleBars'
import ChartsAndGraphs from '@components/common/ChartsAndGraphs'
import {
    IHorizontalGraphSingleBarsType,
    IVerticalGraphDoubleBarsType,
    IVerticalGraphSingleBarsType,
    ICusChartsGraphs
} from '../types'

type Props = {
    content: Array<
        | IHorizontalGraphSingleBarsType
        | IVerticalGraphDoubleBarsType
        | IVerticalGraphSingleBarsType
        | ICusChartsGraphs
    >
}

export const BlockTwoTileCharts = ({ content }: Props) => {
    const chart = content?.map((data) => {
        switch (data.meta.contentType) {
            case 'horizontalGraphSingleBars': {
                return (
                    <HorizontalGraphSingleBars
                        content={data as IHorizontalGraphSingleBarsType}
                    />
                )
            }
            case 'verticalGraphSingleBars': {
                return (
                    <VerticalGraphSingleBars
                        content={data as IVerticalGraphSingleBarsType}
                    />
                )
            }
            case 'verticalGraphDoubleBars': {
                return (
                    <VerticalGraphDoubleBars
                        content={data as IVerticalGraphDoubleBarsType}
                    />
                )
            }
            case 'cusChartsGraphs': {
                return <ChartsAndGraphs content={data as ICusChartsGraphs} />
            }
            default: {
                return null
            }
        }
    })

    return <div className="max-w-full w-full">{chart}</div>
}
