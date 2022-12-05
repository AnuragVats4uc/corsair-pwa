import { useEffect, useState } from 'react'
import LeftRightText from '@components/common/LeftRightText'
import { DisclaimerBlock } from '@components/common/DisclaimerBlock'
import { ChartBar, CusChartsGraphs } from '../types'
import Graph from '../Graph'
import { GraphLayout } from '../Graph/Graph'

import s from './VerticalGraphSingleBars.module.scss'

const c = /*tw*/ {
    container: `${s['vertical-graph-single-bars-container']}`,
    containerTransparent: `${s['vertical-graph-single-bars-container-transparent']}`,
    leftColum: `${s['left-column']} relative flex justify-start`,
    logo: `${s['logo']} relative m-auto md:m-0 mb-10`,
    subheading: `${s['sub-title']} text-yellow`,
    description: `${s['description']} pt-5 text-lg text-white`,
    graphTitle: `${s['graph-title']} font-bebasNeueSemiExpanded text-white`,
    footerDescription: `${s['footer-description']} text-white`,
    graphContainer: `${s['graph-container']} w-5/6`
}

interface VerticalGraphSingleBarsProps {
    content: CusChartsGraphs
}

const VerticalGraphSingleBars: React.FC<VerticalGraphSingleBarsProps> = ({
    content
}) => {
    const [graphData, setGraphData] = useState<ChartBar[]>([])
    const {
        backgroundColor,
        leftRightTextLayout,
        horizontalVerticalBarChart,
        disclaimerCopy
    } = content

    const bgTransparent =
        backgroundColor !== 'transparent' ? backgroundColor : ''

    const {
        chartBars,
        barSize,
        title: graphTitle
    } = horizontalVerticalBarChart!

    useEffect(() => {
        if (!chartBars) return

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
            <div>
                <div className={c.leftColum}>
                    <div>
                        {leftRightTextLayout && (
                            <LeftRightText content={leftRightTextLayout} />
                        )}
                        {graphData.length > 0 && (
                            <div>
                                {graphTitle && (
                                    <p className={c.graphTitle}>{graphTitle}</p>
                                )}
                                <div className={c.graphContainer}>
                                    <Graph
                                        data={graphData}
                                        barSize={barSize}
                                        layout={GraphLayout.VERTICAL}
                                    />
                                </div>
                                {disclaimerCopy && (
                                    <DisclaimerBlock
                                        disclaimer={disclaimerCopy}
                                        style={{
                                            textAlign: 'left'
                                        }}
                                        isDangerous
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerticalGraphSingleBars
