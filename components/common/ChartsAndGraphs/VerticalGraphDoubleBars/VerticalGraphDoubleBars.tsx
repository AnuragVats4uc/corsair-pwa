import { useEffect, useState } from 'react'
import LeftRightText from '@components/common/LeftRightText'
import { DisclaimerBlock } from '@components/common/DisclaimerBlock'
import { ChartBar, CusChartsGraphs } from '../types'
import Graph from '../Graph'
import { BarFormat, GraphLayout } from '../Graph/Graph'

import s from './VerticalGraphDoubleBars.module.scss'

const c = /*tw*/ {
    container: `${s['horizontal-graph-double-bars-container']} w-full`,
    containerTransparent: `${s['horizontal-graph-double-bars-container-transparent']} w-full`,
    content: `${s['content']} relative mx-auto py-40`,
    logo: `${s['logo']} relative m-auto md:m-0 mb-10`,
    subheading: `${s['sub-title']} text-yellow font-primary`,
    heading: `${s['title']} font-secondary text-white`,
    graphTitle: `${s['graph-title']} font-bebasNeueSemiExpanded`,
    footerDescription: `${s['footer-description']}`,
    graphContainer: `${s['graph-container']}`,
    headerContainer: `${s['header-container']} flex w-full justify-between`,
    logoContainer: `${s['logo-container']} w-full`,
    descriptionContainer: `${s['description-container']} w-full`,
    title: `${s['title']} w-full`
}

interface VerticalGraphDoubleBarsProps {
    content: CusChartsGraphs
}

const VerticalGraphDoubleBars: React.FC<VerticalGraphDoubleBarsProps> = ({
    content
}) => {
    const [graphData, setGraphData] = useState<ChartBar[]>([])

    const {
        backgroundColor,
        leftRightTextLayout,
        horizontalVerticalBarChart,
        disclaimerCopy
    } = content

    const {
        barSize,
        chartBars,
        maxValueChartColumns,
        tickColumnsInterval,
        heading: graphTitle
    } = horizontalVerticalBarChart!

    const bgTransparent =
        backgroundColor !== 'transparent' ? backgroundColor : ''
    const ticks =
        maxValueChartColumns && tickColumnsInterval
            ? Array(maxValueChartColumns / tickColumnsInterval + 1)
                  .fill(tickColumnsInterval)
                  .map((tick, index) => (index === 0 ? 0 : tick * index))
            : undefined

    useEffect(() => {
        if (!chartBars) return
        chartBars.map((bar: ChartBar) => {
            bar.firstColumnValue = bar.value
            bar.firstColumnFill = bar.fill

            delete bar['value']
            delete bar['fill']
        })
        setGraphData(chartBars)
    }, [])

    return (
        <div
            className={
                backgroundColor !== 'transparent'
                    ? c.container
                    : c.containerTransparent
            }
            style={{ background: bgTransparent }}
        >
            <div className="w-full">
                <div className={c.content}>
                    {leftRightTextLayout && (
                        <LeftRightText content={leftRightTextLayout} />
                    )}
                    {graphData.length > 0 && (
                        <div>
                            <h2 className={c.graphTitle}>{graphTitle}</h2>
                            <div className={c.graphContainer}>
                                <Graph
                                    data={graphData}
                                    barSize={barSize}
                                    ticks={ticks}
                                    barFormat={BarFormat.DOUBLE}
                                    layout={GraphLayout.VERTICAL}
                                />
                            </div>
                            {disclaimerCopy && (
                                <DisclaimerBlock
                                    disclaimer={disclaimerCopy}
                                    style={{
                                        borderTop: `2px solid rgba(255, 255, 255, 0.6)`,
                                        textAlign: 'left',
                                        padding: '1.538rem 0 0 0'
                                    }}
                                    isDangerous
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VerticalGraphDoubleBars
