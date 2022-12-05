export interface Driver {
    title: string
    driverTitle: string
    driverId: string
    driverMainSort: number
    driverCategorySort: number
    description: string
    version: string
    link: string
    date: string
    catalogVersion: string
    name: string
    assetStatus: boolean
}

export interface Documentation {
    title: string
    documentId: string
    documentTitle: string
    link: string
    size: string
    catalogVersion: string
    name: string
    assetStatus: boolean
}

export interface Download {
    title: string
    drivers: Driver[]
    documentations: Documentation[]
}

export interface Content {
    title: string
    tabName: string
    url: string
    content: Download[]
}

export interface DownloadContent {
    content: Content
}
