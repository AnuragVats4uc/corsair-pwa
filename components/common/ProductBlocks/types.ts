import { IProductBlocks, IProductBlock } from '../../common/types'

export interface ProductBlocksWrapperProp {
    productBlocks: IProductBlocks | any
}

export interface ProductBlocksProp {
    leftPanel: {
        heading: string
        productBlocksList: IProductBlock[]
        secondaryHeading: string
        secondaryProductBlocksList: IProductBlock[]
    }
}

export interface ProductBlockProps {
    productBlock: IProductBlock
}
