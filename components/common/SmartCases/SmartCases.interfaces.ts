import {
    CTAType,
    ImageType,
    VideoType
} from '@pylot-data/hooks/contentful/use-content-json'

export interface SmartCaseProps {
    content: SmartCaseType
}

export interface SmartCaseType {
    title: string
    heading: string
    headingLabel: string
    subheading: string
    scenes: Array<SmartCaseScene>
    backgroundImage: ImageType
    sceneAlignment: SceneAlignment
    textPosition: TextPosition
    zoomLevel: number
    animationType: SceneAnimationType
    sceneHeading: string
    showCards: boolean
    isFirstPage: boolean
    cta: CTAType
    logo: ImageType
}

export enum TextPosition {
    LEFT = 'Left',
    RIGHT = 'Right',
    CENTER = 'Center'
}

export enum SceneAlignment {
    LEFT = 'Left',
    RIGHT = 'Right'
}

export enum SceneAnimationType {
    Zomm = 'Zoom',
    FADE = 'Fade'
}
export interface SmartCaseScene {
    title: string
    sceneName: string
    sceneVideo: VideoType
    mobileBackgroundWidth: number
    mobileBackgroundTransform: string
    sceneImage: ImageType
    sceneDescription: string
}
