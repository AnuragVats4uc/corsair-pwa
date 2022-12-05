import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

export type DefaultContents = {
    images: {
        [key: string]: {
            id: string
            value: ImageType
        }
    }
}

export interface SocialDefaultContent {
    seoImage: ImageType
    siteName: string
}

const DEFAULT_SOCIAL_MEDIA_TITLE = 'Corsair Social Default Image'

export const defaultContents: DefaultContents = {
    images: {
        socialDefaultMedia: {
            id: DEFAULT_SOCIAL_MEDIA_TITLE,
            value: {
                title: DEFAULT_SOCIAL_MEDIA_TITLE,
                description: DEFAULT_SOCIAL_MEDIA_TITLE,
                file: {
                    url: '/images/corsair-social-default-image.jpg',
                    details: {
                        image: {
                            width: 1200,
                            height: 630
                        },
                        size: 838020
                    },
                    fileName: DEFAULT_SOCIAL_MEDIA_TITLE,
                    contentType: 'image/jpeg'
                }
            }
        }
    }
}

export const socialDefaultContent: SocialDefaultContent = {
    seoImage: defaultContents.images.socialDefaultMedia.value,
    siteName: 'CORSAIR'
}
