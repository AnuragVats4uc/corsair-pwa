import {
    CTAType,
    ImageType
} from '@pylot-data/hooks/contentful/use-content-json'
import { IMeta } from '../types'

export type BelowTheLine = {
    title: string
    identifier: string
    meta: IMeta<'itBelowTheLine'>
    body: string
    backgroundColor: string
    image: ImageType
    background: ImageType
    ctaButton: CTAType
    bodyColor: string
    imageWidth?: string
    imageHeight?: string
}
