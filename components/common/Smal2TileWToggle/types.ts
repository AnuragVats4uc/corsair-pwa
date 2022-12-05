import type { IMeta } from '../types'
import type { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export interface Smal2TileWToggleProp {
    content: ISmal2TileWToggle
}

export type CharacteristicBlockProp = {
    desc: string
    img: ImageType
}

export interface ISmal2TileWToggle {
    title: string
    heading: string
    subheading: string
    text: string
    imageRightOn: ImageType
    imageRightOff: ImageType
    toggleLabelLeft: string
    toggleLabelRight: string
    isDesktopToggleTop: boolean
    isMobileToggleTop: boolean
    toggleButtonType: string
    toggleHeading?: string
    toggleIconLeft?: ImageType
    toggleIconRight?: ImageType
    imageLeft?: ImageType
    isToggleOn: boolean
    setToggleOn: (params: boolean) => void
    backgroundColor?: string
    backgroundImage?: ImageType
    characteristicImage?: ImageType
    characteristicDescription?: string
    rightImageMargin?: boolean
    desktopPaddingTop?: string
    desktopPaddingBottom?: string
    mobilePaddingTop?: string
    mobilePaddingBottom?: string
    meta: IMeta<'smal2TileWithToggle'>
    pageBackgroundImage?: ImageType
}
