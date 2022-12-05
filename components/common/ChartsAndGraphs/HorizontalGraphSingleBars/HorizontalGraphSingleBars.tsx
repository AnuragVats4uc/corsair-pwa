import { useEffect, useState } from 'react'
import LeftRightText from '@components/common/LeftRightText'
import { DisclaimerBlock } from '@components/common/DisclaimerBlock'
import { ChartBar, CusChartsGraphs } from '../types'
import Graph from '../Graph'

import s from './HorizontalGraphSingleBars.module.scss'

const c = /*tw*/ {
    container: `${s['horizontal-graph-single-bars-container']} w-full`,
    containerTransparent: `${s['horizontal-graph-single-bars-container-transparent']} w-full`,
    content: `${s['content']} relative mx-auto px-1.5 py-32`,
    logo: `${s['logo']} relative m-auto md:m-0 mb-10`,
    subheading: `${s['sub-title']} text-yellow font-primary`,
    heading: `${s['title']} font-secondary text-white`,
    graphTitle: `${s['graph-title']} font-bebasNeueSemiExpanded`,
    footerDescription: `${s['footer-description']} text-white`,
    graphContainer: `${s['graph-container']}`,
    headerContainer: `${s['header-container']} flex w-full justify-between`,
    logoContainer: `${s['logo-container']} w-full`,
    descriptionContainer: `${s['description-container']} w-full text-white`
}

interface HorizontalGraphSingleBarsProps {
    content: CusChartsGraphs
}

const HorizontalGraphSingleBars: React.FC<HorizontalGraphSingleBarsProps> = ({
    content
}) => {
    const [graphData, setGraphData] = useState<ChartBar[]>([])

    const {
        backgroundColor,
        leftRightTextLayout,
        horizontalVerticalBarChart,
        disclaimerCopy
    } = content

    const { chartBars, barSize } = horizontalVerticalBarChart!

    useEffect(() => {
        if (!chartBars) return

        setGraphData(chartBars)
    }, [])

    return (
        <div className={backgroundColor ? c.containerTransparent : c.container}>
            <div className="w-full">
                <div className={c.content}>
                    {leftRightTextLayout && (
                        <LeftRightText content={leftRightTextLayout} />
                    )}
                    {graphData.length > 0 && (
                        <div>
                            <div className={c.graphContainer}>
                                <Graph data={graphData} barSize={barSize} />
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

export default HorizontalGraphSingleBars
