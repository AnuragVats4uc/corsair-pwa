export interface Sys {
    type: string
    id: string
    createdAt: Date
    updatedAt: Date
    contentType: {
        sys: {
            id: string
        }
    }
}

export interface DownloadCardProps {
    content: DownloadFields
}

export interface DownloadFields {
    asset_status: boolean
    catalog_version: string
    category: string
    id: string
    main_sort: number
    objectID: string
    plataform: string
    size: string
    slug: string
    title: string
    type: string
    url: string
    version: string
    description?: string
    date?: string
    image_url?: string
    category_sort: number
}
export interface DownloadHit {
    fields: DownloadFields
    sys: Sys
}
