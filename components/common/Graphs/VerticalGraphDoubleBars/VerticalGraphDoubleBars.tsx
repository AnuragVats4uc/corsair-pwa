import { useEffect, useState } from 'react'
import Image from '@corratech/corsair-image'
import s from './VerticalGraphDoubleBars.module.scss'
import { ChartBarsDoubleBarsType, VerticalGraphDoubleBarsType } from '../types'
import Graph from '../Graph'
import { BarFormat, GraphLayout } from '../Graph/Graph'

const c = /*tw*/ {
    container: `${s['horizontal-graph-double-bars-container']} w-full`,
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
    content: VerticalGraphDoubleBarsType
}

const VerticalGraphDoubleBars: React.FC<VerticalGraphDoubleBarsProps> = ({
    content
}) => {
    const [graphData, setGraphData] = useState<ChartBarsDoubleBarsType[]>([])

    const {
        backgroundColor,
        barChartDoubleColumns,
        description,
        footerDescription,
        heading,
        logo,
        subheading
    } = content

    const {
        barSize,
        chartBars,
        maxValueChartColumns,
        tickColumnsInterval,
        heading: graphTitle
    } = barChartDoubleColumns

    const ticks = Array(maxValueChartColumns / tickColumnsInterval + 1)
        .fill(tickColumnsInterval)
        .map((tick, index) => (index === 0 ? 0 : tick * index))

    useEffect(() => {
        if (!chartBars) return

        setGraphData(chartBars)
    }, [])

    return (
        <div className={c.container} style={{ background: backgroundColor }}>
            <div className="w-full" style={{ background: backgroundColor }}>
                <div className={c.content}>
                    <div className={c.headerContainer}>
                        <div className={c.logoContainer}>
                            {subheading && (
                                <p className={c.subheading}>{subheading}</p>
                            )}
                            {heading && (
                                <h2 className={c.heading}>{heading}</h2>
                            )}
                            {logo?.file && (
                                <div
                                    className={c.logo}
                                    style={{
                                        width: logo.file.details.image.width,
                                        height: logo.file.details.image.height
                                    }}
                                >
                                    <Image
                                        src={logo.file.url}
                                        alt={logo.description}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            )}
                        </div>
                        {description && (
                            <div className={c.descriptionContainer}>
                                <p
                                    className=" text-white"
                                    dangerouslySetInnerHTML={{
                                        __html: description
                                    }}
                                />
                            </div>
                        )}
                    </div>

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
                            {footerDescription && (
                                <p
                                    className={c.footerDescription}
                                    dangerouslySetInnerHTML={{
                                        __html: footerDescription
                                    }}
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
