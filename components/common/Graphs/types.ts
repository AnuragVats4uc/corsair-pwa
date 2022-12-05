import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

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
