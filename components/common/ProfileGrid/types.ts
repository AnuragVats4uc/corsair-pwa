import { IMeta } from '../types'

export type Background = {
    description?: string
    title?: string
    file?: {
        url?: string
        fileName?: string
    }
}

export type ProfileCardProps = {
    title?: string
    identifier: string
    meta: IMeta<'profileCardDetails'>
    heading?: string
    description?: string
    cardNumber?: string
    image?: Background
}

export type ProfileProps = {
    heading?: string
    subHeading?: string
    title?: string
    meta: IMeta<'profileGrid'>
    identifier: string
    profileCard?: ProfileCardProps[]
    backgroundImage?: Background
}
