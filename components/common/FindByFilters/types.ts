export interface Child {
    title: string
    placeholder: string
    value: string
}

export interface FindByCompabilitySelectorItem {
    title: string
    placeholder: string
    children: Child[]
    value: string
}

export interface FindByCompabilityContentful {
    title: string
    desktop: FindByCompabilitySelectorItem
    manufactures: FindByCompabilitySelectorItem
    models: FindByCompabilitySelectorItem
}

export interface FindByMotherboardsContentful {
    title: string
    motherboards: FindByCompabilitySelectorItem
    manufactures: FindByCompabilitySelectorItem
}
