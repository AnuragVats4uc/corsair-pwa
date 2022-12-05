import { useEffect, useState } from 'react'
import Image from '@corratech/corsair-image'
import s from './VerticalGraphSingleBars.module.scss'
import { ChartBarsSingleBarsType, VerticalGraphSingleBarsType } from '../types'
import Graph from '../Graph'
import { GraphLayout } from '../Graph/Graph'

const c = /*tw*/ {
    container: `${s['vertical-graph-single-bars-container']}`,
    leftColum: `${s['left-column']} relative flex justify-end py-40`,
    logo: `${s['logo']} relative m-auto md:m-0 mb-10`,
    subheading: `${s['sub-title']} text-yellow`,
    description: `${s['description']} pt-5 text-lg text-white`,
    graphTitle: `${s['graph-title']} font-bebasNeueSemiExpanded text-white`,
    footerDescription: `${s['footer-description']} text-white`,
    graphContainer: `${s['graph-container']}`
}

interface VerticalGraphSingleBarsProps {
    content: VerticalGraphSingleBarsType
}

const VerticalGraphSingleBars: React.FC<VerticalGraphSingleBarsProps> = ({
    content
}) => {
    const [graphData, setGraphData] = useState<ChartBarsSingleBarsType[]>([])

    const {
        backgroundColor,
        barChartSingleColumns,
        description,
        footerDescription,
        heading,
        logo,
        subheading
    } = content

    const { chartBars, barSize, title: graphTitle } = barChartSingleColumns

    useEffect(() => {
        if (!chartBars) return

        setGraphData(chartBars)
    }, [])

    return (
        <div className={c.container} style={{ background: backgroundColor }}>
            <div style={{ background: backgroundColor }}>
                <div className={c.leftColum}>
                    <div>
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
                        {subheading && (
                            <p className={c.subheading}>{subheading}</p>
                        )}
                        {heading && <h2 className="text-white">{heading}</h2>}
                        {description && (
                            <p
                                className={c.description}
                                dangerouslySetInnerHTML={{
                                    __html: description
                                }}
                            />
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
        </div>
    )
}

export default VerticalGraphSingleBars
