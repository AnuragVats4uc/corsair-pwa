import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import type { LeftRightTextResponse } from '@components/common/LeftRightText/LeftRightText'

export type ChartBarsSingleBarsType = {
    columnTitle: string
    fill: string
    glow: boolean
    label: string
    title: string
    value: number
}

export type ChartBarsDoubleBarsType = {
    columnTitle: string
    firstColumnFill: string
    firstColumnLabel: string
    firstColumnValue: number
    secondColumnFill: string
    secondColumnLabel: string
    secondColumnValue: number
    title: string
}

type ChartLegend = {
    label: string
    markColor: string
    title: string
}

type BarChartSingleColumnsType = {
    barSize: number
    chartBars: ChartBarsSingleBarsType[]
    title: string
}

type BarChartDoubleColumnsType = {
    barSize: number
    chartBars: ChartBarsDoubleBarsType[]
    chartLegends: ChartLegend[]
    heading: string
    maxValueChartColumns: number
    tickColumnsInterval: number
    title: string
}

export type ChartBarsSingleBarsTypeGraphData = {
    fill: string
    glow: boolean
    label: string
    title: string
} & {
    [key: string]: number | string | boolean
}

export interface VerticalGraphSingleBarsType {
    backgroundColor: string
    barChartSingleColumns: BarChartSingleColumnsType
    description: string
    footerDescription: string
    heading: string
    identifier: string
    logo: ImageType
    subheading: string
    title: string
}

export interface HorizontalGraphSingleBarsType {
    backgroundColor: string
    barChartSingleColumns: BarChartSingleColumnsType
    description: string
    footerDescription: string
    heading: string
    identifier: string
    logo: ImageType
    subheading: string
    title: string
}

export interface VerticalGraphDoubleBarsType {
    backgroundColor: string
    barChartDoubleColumns: BarChartDoubleColumnsType
    description: string
    footerDescription: string
    heading: string
    identifier: string
    logo: ImageType
    subheading: string
    title: string
}

export type ChartBar = {
    title: string
    identifier: string
    chartBarType: string
    columnTitle: string
    firstBarLabel: string
    value?: number
    firstColumnValue: number | undefined
    fill?: string
    firstColumnFill: string | undefined
    secondBarLabel?: string | undefined
    secondColumnValue?: number | undefined
    secondColumnFill?: string | undefined
    glow: boolean
}

export type HorizontalVerticalBarChart = {
    title: string
    identifier: string
    columnType: string
    heading: string
    barSize: number
    chartBars: ChartBar[]
    maxValueChartColumns?: number | undefined
    tickColumnsInterval?: number | undefined
}

export interface CusChartsGraphs {
    title: string
    identifier: string
    cusType: string
    backgroundColor?: string | undefined
    leftRightTextLayout?: LeftRightTextResponse | undefined
    horizontalVerticalBarChart: HorizontalVerticalBarChart | undefined
    disclaimerCopy?: string | undefined
}
