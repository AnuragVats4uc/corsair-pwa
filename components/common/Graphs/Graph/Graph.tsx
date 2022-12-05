import s from './Graph.module.scss'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    LabelProps,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'
import snarkdown from 'snarkdown'
import { LayoutType } from 'recharts/types/util/types'
import { ChartBarsDoubleBarsType, ChartBarsSingleBarsType } from '../types'
import { HorizontalAlignmentType } from 'recharts/types/component/DefaultLegendContent'

const c = {
    container: `${s['graph']} graph-container`
}

export enum GraphLayout {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export enum BarFormat {
    DOUBLE = 'double',
    SINGLE = 'single'
}

type CustomLabelProps = LabelProps & {
    glow: boolean
    height: number
    index: number
    label: string
    width: number
    x: number
    y: number
}

const DEFAULT_GRAPH_CONFIG = {
    barChartLayout: 'vertical' as LayoutType,
    cellCursor: 'default',
    dataKeyBar: 'value',
    dataKeyFirstColumnDoubleBar: 'firstColumnValue',
    dataKeySecondColumnDoubleBar: 'secondColumnValue',
    defaultBarSize: 32,
    defaultHeightTitle: '60',
    graphDoubleColumnTextsColor: '#FFF',
    heightBarChart: 92,
    heightBarChartDoubleBar: 120,
    heightResponsiveContainer: '100%',
    horizontalLineColor: '#FFF',
    labelListDataKey: 'columnTitle',
    legendAlign: 'right' as HorizontalAlignmentType,
    legendIconType: 'square',
    marginBarChar: {
        top: 0.1,
        right: 10,
        bottom: 0.1,
        left: 0.1
    },
    marginHorizontalSingleBarsChart: {
        top: 0.1,
        right: -30,
        bottom: 100,
        left: -30
    },
    marginVerticalDoubleBarsChart: {
        top: 0.1,
        right: 40,
        bottom: 0.1,
        left: 40
    },
    overrideHorizontalLabelColor: '#FFF',
    overrideLegendColor: '#FFF',
    widthResponsiveContainer: '100%',
    xAxisDataKey: 'columnTitle',
    yAxisDataKey: 'columnTitle'
}

const renderCustomizedLabel = (
    props: CustomLabelProps,
    graphData: ChartBarsSingleBarsType[],
    layout: GraphLayout = GraphLayout.HORIZONTAL,
    fillOverride = ''
) => {
    const { fill, height, index, width, x, y } = props
    const radius = 10
    const SAFE_MARGIN_Y = layout === GraphLayout.HORIZONTAL ? 12 : 5
    const SAFE_MARGIN_X = 10

    if (!x || !width) return

    const X_POSITION =
        layout === GraphLayout.HORIZONTAL
            ? x
            : x + width + radius + SAFE_MARGIN_X

    const Y_POSITION =
        layout === GraphLayout.HORIZONTAL
            ? y - SAFE_MARGIN_Y
            : y + height / 2 + SAFE_MARGIN_Y

    return (
        <g>
            <text
                x={X_POSITION}
                y={Y_POSITION}
                fill={fillOverride || fill}
                textAnchor="left"
                dominantBaseline="left"
                className="chart-label"
            >
                {graphData[index].label}
            </text>
        </g>
    )
}

const renderCustomizedTitle = (
    props: CustomLabelProps,
    layout: GraphLayout = GraphLayout.HORIZONTAL
) => {
    const { height, value, width, x, y } = props
    const SAFE_MARGIN_Y = layout === GraphLayout.HORIZONTAL ? 25 : 10
    const SAFE_MARGIN_X = 0
    const LINE_POSITION = 10

    if (!x || !height || !value) return

    const X_POSITION = x + SAFE_MARGIN_X

    const Y_POSITION = y + height + SAFE_MARGIN_Y

    const html = snarkdown(value as string)

    return (
        <g>
            {layout === GraphLayout.HORIZONTAL && (
                <rect
                    width={width}
                    height={2}
                    fill={DEFAULT_GRAPH_CONFIG.horizontalLineColor}
                    x={X_POSITION}
                    y={Y_POSITION - LINE_POSITION}
                />
            )}
            <switch>
                <foreignObject
                    x={X_POSITION}
                    y={Y_POSITION}
                    width={width}
                    height={DEFAULT_GRAPH_CONFIG.defaultHeightTitle}
                    className="chart-title"
                >
                    <p
                        dangerouslySetInnerHTML={{ __html: html }}
                        className="whitespace-nowrap"
                    />
                </foreignObject>
            </switch>
        </g>
    )
}

type GraphProps = {
    barFormat?: BarFormat
    barSize: number
    data: ChartBarsSingleBarsType[] | ChartBarsDoubleBarsType[]
    layout?: GraphLayout
    ticks?: number[]
}

const Graph: React.FC<GraphProps> = ({
    barFormat = BarFormat.SINGLE,
    barSize = DEFAULT_GRAPH_CONFIG.defaultBarSize,
    data: graphData,
    layout = GraphLayout.HORIZONTAL,
    ticks = []
}) => {
    let containerHeight: string | number = 0

    if (layout === GraphLayout.HORIZONTAL) {
        containerHeight = DEFAULT_GRAPH_CONFIG.heightResponsiveContainer
    } else if (barFormat == BarFormat.SINGLE) {
        const SAFE_MARGIN_X = 130
        containerHeight = SAFE_MARGIN_X + graphData.length * barSize
    } else {
        containerHeight =
            DEFAULT_GRAPH_CONFIG.heightBarChartDoubleBar * graphData.length
    }

    const getGraphCellSingleColumn = (data: ChartBarsSingleBarsType[]) =>
        data.map((entry, index) => (
            <Cell
                cursor={DEFAULT_GRAPH_CONFIG.cellCursor}
                fill={entry.fill}
                key={`cell-${index}`}
                style={{
                    filter: entry.glow
                        ? `drop-shadow( 0px 0px 7px ${entry.fill})`
                        : ''
                }}
            />
        ))

    const renderColorfulLegendText = (value: string) => (
        <span style={{ color: DEFAULT_GRAPH_CONFIG.overrideLegendColor }}>
            {value}
        </span>
    )

    const getGraphVerticalSingleBar = (data: ChartBarsSingleBarsType[]) => (
        <BarChart
            layout={layout}
            margin={DEFAULT_GRAPH_CONFIG.marginBarChar}
            data={data}
        >
            <XAxis type="number" hide />
            <YAxis
                dataKey={DEFAULT_GRAPH_CONFIG.yAxisDataKey}
                type="category"
                hide
            />
            <Bar dataKey={DEFAULT_GRAPH_CONFIG.dataKeyBar} barSize={barSize}>
                <LabelList
                    dataKey={DEFAULT_GRAPH_CONFIG.labelListDataKey}
                    content={(props: LabelProps) =>
                        renderCustomizedTitle(
                            {
                                ...props
                            } as CustomLabelProps,
                            GraphLayout.VERTICAL
                        )
                    }
                />
                <LabelList
                    dataKey={DEFAULT_GRAPH_CONFIG.labelListDataKey}
                    content={(props: LabelProps) =>
                        renderCustomizedLabel(
                            {
                                ...props
                            } as CustomLabelProps,
                            data as ChartBarsSingleBarsType[],
                            GraphLayout.VERTICAL
                        )
                    }
                />

                {getGraphCellSingleColumn(data as ChartBarsSingleBarsType[])}
            </Bar>
        </BarChart>
    )

    const getGraphHorizontalSingleBar = (data: ChartBarsSingleBarsType[]) => (
        <BarChart
            data={data}
            layout={GraphLayout.HORIZONTAL}
            margin={DEFAULT_GRAPH_CONFIG.marginHorizontalSingleBarsChart}
        >
            <Bar dataKey={DEFAULT_GRAPH_CONFIG.dataKeyBar}>
                <LabelList
                    dataKey={DEFAULT_GRAPH_CONFIG.labelListDataKey}
                    content={(props: LabelProps) =>
                        renderCustomizedTitle(
                            {
                                ...props
                            } as CustomLabelProps,
                            layout
                        )
                    }
                />
                <LabelList
                    dataKey={DEFAULT_GRAPH_CONFIG.labelListDataKey}
                    content={(props: LabelProps) =>
                        renderCustomizedLabel(
                            {
                                ...props
                            } as CustomLabelProps,
                            data as ChartBarsSingleBarsType[],
                            layout,
                            DEFAULT_GRAPH_CONFIG.overrideHorizontalLabelColor
                        )
                    }
                />
                {getGraphCellSingleColumn(data as ChartBarsSingleBarsType[])}
            </Bar>
        </BarChart>
    )

    const getGraphHorizontalDoubleBar = (data: ChartBarsDoubleBarsType[]) => {
        const colorFirstColumn = data[0].firstColumnFill
        const colorSecondColumn = data[0].secondColumnFill
        const legendFirstColumn = data[0].firstColumnLabel
        const legendSecondColumn = data[0].secondColumnLabel

        return (
            <BarChart
                layout={layout}
                data={graphData}
                margin={DEFAULT_GRAPH_CONFIG.marginVerticalDoubleBarsChart}
            >
                <CartesianGrid horizontal={false} />
                <XAxis
                    type="number"
                    ticks={ticks}
                    axisLine={false}
                    tickLine={false}
                    stroke={DEFAULT_GRAPH_CONFIG.graphDoubleColumnTextsColor}
                    height={20}
                />
                <YAxis
                    dataKey={DEFAULT_GRAPH_CONFIG.yAxisDataKey}
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    stroke={DEFAULT_GRAPH_CONFIG.graphDoubleColumnTextsColor}
                    width={110}
                />
                <Legend
                    align={DEFAULT_GRAPH_CONFIG.legendAlign}
                    formatter={renderColorfulLegendText}
                    iconType={DEFAULT_GRAPH_CONFIG.legendIconType}
                />
                <Bar
                    dataKey={DEFAULT_GRAPH_CONFIG.dataKeyFirstColumnDoubleBar}
                    name={legendFirstColumn}
                    barSize={barSize}
                    fill={colorFirstColumn}
                />
                <Bar
                    dataKey={DEFAULT_GRAPH_CONFIG.dataKeySecondColumnDoubleBar}
                    name={legendSecondColumn}
                    barSize={barSize}
                    fill={colorSecondColumn}
                />
            </BarChart>
        )
    }

    const getGraph = () => {
        if (layout === GraphLayout.VERTICAL && barFormat === BarFormat.SINGLE)
            return getGraphVerticalSingleBar(
                graphData as ChartBarsSingleBarsType[]
            )
        if (layout === GraphLayout.HORIZONTAL && barFormat === BarFormat.SINGLE)
            return getGraphHorizontalSingleBar(
                graphData as ChartBarsSingleBarsType[]
            )
        if (layout === GraphLayout.VERTICAL && barFormat === BarFormat.DOUBLE)
            return getGraphHorizontalDoubleBar(
                graphData as ChartBarsDoubleBarsType[]
            )
        return <span />
    }

    return (
        <ResponsiveContainer
            className={c.container}
            width={DEFAULT_GRAPH_CONFIG.widthResponsiveContainer}
            height={containerHeight}
        >
            {getGraph()}
        </ResponsiveContainer>
    )
}

export default Graph
