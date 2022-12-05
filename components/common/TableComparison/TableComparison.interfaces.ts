import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import { IMeta } from '../types'
export interface Table {
    heading: string
    tableContent: string
    styles: comparisonTableStyleType
    alignColumn: string
}

export enum comparisonTableStyleType {
    DARK = 'Dark background',
    LIGHT = 'Light background'
}
export interface Content {
    title: string
    headerTitle: string
    table: Table
    type: ComparisonTableType
    useImageAsBackground?: boolean
    backgroundColor: string | null | undefined
    backgroundImage: ImageType
    meta: IMeta<'comparisonTable'>
    mobileTable: Table[]
}

export enum ComparisonTableType {
    TRANSPARENT = 'Transparent With Borders',
    ALTERNATING = 'Alternating Colors',
    COMPATIBILITY = 'Compatibility Table'
}
export interface TableComparisonProps {
    content: Content
}

export interface TableCompatibilityProps {
    content: Content
    className: string
    contentTable: string
    getTableTheme: (theme: comparisonTableStyleType) => string
    setTableIndex: React.Dispatch<React.SetStateAction<number>>
    replaceHtmlTable: (table: string) => string
}
